import { useEffect } from "react";
import { trpc } from "@utils/trpc";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { userStore } from "../stores/user";
import { useToast } from "../stores/toasts";
import { useModal } from "../stores/modals";

import ErrorToast from "../components/toast/ErrorToast";

const TOAST_DURATION = 5000;

export const useFirebase = () => {
  const auth = getAuth();
  const { open } = useToast();
  const { close: closeModal } = useModal();

  const user = userStore.useTracked("user");
  const { setUser, setHydrated, clearUser } = userStore.actions;

  const { mutateAsync: upsertUser } = trpc.user.createUser.useMutation();

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
        auth,
        email,
        password
      );

      if (credentials?.user) {
        const user = credentials?.user;

        await upsertUser(
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
          duration: TOAST_DURATION,
        });
        return;
      }

      if ((error as { code: string }).code === "auth/invalid-email") {
        console.error("Invalid email");
        open(<ErrorToast message="Invalid email" />, {
          duration: TOAST_DURATION,
        });
        return;
      }

      if ((error as { message: string }).message) {
        console.error((error as { message: string }).message);
        open(<ErrorToast message={(error as { message: string }).message} />, {
          duration: TOAST_DURATION,
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
        auth,
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

        // Upsert user in database
        await upsertUser(
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

        closeModal();
      }
    } catch (error: unknown) {
      if ((error as { code: string }).code === "auth/invalid-email") {
        console.error("Invalid email");
        open(<ErrorToast message="Invalid email" />, {
          duration: TOAST_DURATION,
        });
        return;
      }

      if ((error as { message: string }).message) {
        console.error((error as { message: string }).message);
        open(<ErrorToast message={(error as { message: string }).message} />, {
          duration: TOAST_DURATION,
        });
        return;
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      setUser({
        uid: user?.uid,
        email: user?.email ?? "",
        displayName: user?.displayName ?? "",
        photoURL: user?.photoURL ?? "",
        providerId: user?.providerId,
      });

      await upsertUser(
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
    } catch (error) {
      if ((error as { message: string }).message) {
        console.error((error as { message: string }).message);
        open(<ErrorToast message={(error as { message: string }).message} />, {
          duration: TOAST_DURATION,
        });
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
    handleSignInWithGoogle,
    handleSignOut,
  };
};
