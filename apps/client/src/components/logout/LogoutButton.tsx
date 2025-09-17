import React from "react";

import { useFirebase } from "../../hooks/useFirebase";
import { useCurrentUser } from "../../stores/user";

export const LogoutButton: React.FC = () => {
  const { handleSignOut } = useFirebase();
  const { isLoggedIn } = useCurrentUser();

  const handleLogout = async () => {
    try {
      await handleSignOut();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="flex items-center justify-center w-full">
      <button
        onClick={handleLogout}
        className="btn btn-outline w-full rounded-[10px] border-none bg-lume-primary-dark/50"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
