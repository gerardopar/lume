import AuthWrapper from "@components/auth/AuthWrapper";

import { useCurrentUser } from "../stores/user";
import { useModal } from "../stores/modals";

export const useAuth = () => {
  const { user, isLoggedIn } = useCurrentUser();
  const { open } = useModal();

  const showAuth = () => {
    if (user && isLoggedIn) return;

    open(<AuthWrapper />);
  };

  return { showAuth };
};

export default useAuth;
