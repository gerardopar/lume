import { useEffect } from "react";
import { trpc } from "@utils/trpc";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { userStore } from "../stores/user";
import { useToast } from "../stores/toasts";
import { useModal } from "../stores/modals";

import ErrorToast from "../components/toast/ErrorToast";

export const useFirebase = () => {
  const auth = getAuth();
  const { open } = useToast();
  const { close: closeModal } = useModal();

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

        await createUserMutation(
          {
            email: user?.email ?? "",
            name: "",
            firebaseUid: user?.uid,
            picture: user?.photoURL ?? "",
          },
          {
            onSuccess: () => closeModal(),
          }
        );
      }
    } catch (error: unknown) {
      if ((error as { code: string }).code === "auth/email-already-in-use") {
        console.error("Email already in use");
        open(<ErrorToast message="Email already in use" />, {
          duration: 5000,
        });
        return;
      }

      if ((error as { code: string }).code === "auth/invalid-email") {
        console.error("Invalid email");
        open(<ErrorToast message="Invalid email" />, {
          duration: 5000,
        });
        return;
      }

      if ((error as { message: string }).message) {
        console.error((error as { message: string }).message);
        open(<ErrorToast message={(error as { message: string }).message} />, {
          duration: 5000,
        });
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

        closeModal();
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
