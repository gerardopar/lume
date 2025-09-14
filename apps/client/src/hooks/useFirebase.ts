import { useEffect } from "react";
import { trpc } from "@utils/trpc";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { userStore } from "../stores/user";

export const useFirebase = () => {
  const auth = getAuth();

  const user = userStore.useTracked("user");
  const { setUser, setHydrated, clearUser } = userStore.actions;

  const { mutateAsync: createUserMutation } =
    trpc.user.createUser.useMutation();

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = auth.onAuthStateChanged(async (fbUser) => {
      if (!isMounted) return;

      if (fbUser) {
        try {
          await fbUser.reload();
          const currentUser = auth.currentUser;

          setUser({
            uid: currentUser?.uid || "",
            email: currentUser?.email || "",
            displayName: currentUser?.displayName || "",
            photoURL: currentUser?.photoURL || "",
            providerId: currentUser?.providerId || "",
          });
        } catch (error) {
          console.error("Error reloading user:", error);
        }
      } else {
        setUser(null);
      }

      setHydrated(true);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [setUser, setHydrated]);

  const handleCreateUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      if (credentials?.user) {
        const user = credentials?.user;

        await createUserMutation({
          email: user?.email ?? "",
          name: "",
          firebaseUid: user?.uid,
          picture: user?.photoURL ?? "",
        });
      }
    } catch (error: unknown) {
      if ((error as { code: string }).code === "auth/email-already-in-use") {
        console.error("Email already in use");
        return;
      }

      if ((error as { code: string }).code === "auth/invalid-email") {
        console.error("Invalid email");
        return;
      }

      if ((error as { message: string }).message) {
        console.error((error as { message: string }).message);
        return;
      }
    }
  };

  const handleSignInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      if (credentials?.user) {
        const user = credentials?.user;

        setUser({
          uid: user?.uid,
          email: user?.email ?? "",
          displayName: user?.displayName ?? "",
          photoURL: user?.photoURL ?? "",
          providerId: user?.providerId,
        });
      }
    } catch (error: unknown) {
      if ((error as { code: string }).code === "auth/invalid-email") {
        console.error("Invalid email");
        return;
      }

      if ((error as { message: string }).message) {
        console.error((error as { message: string }).message);
        return;
      }
    }
  };

  const handleSignOut = () => {
    try {
      auth.signOut();
      clearUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return {
    handleCreateUserWithEmailAndPassword,
    handleSignInWithEmailAndPassword,
    handleSignOut,
  };
};
