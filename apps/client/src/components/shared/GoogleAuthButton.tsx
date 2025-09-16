import React from "react";

import GoogleIcon from "../../assets/images/google-logo.png";

import { useFirebase } from "../../hooks/useFirebase";

export const GoogleAuthButton: React.FC<{ text: string }> = ({ text }) => {
  const { handleSignInWithGoogle } = useFirebase();

  const handleGoogleAuth = async () => {
    try {
      await handleSignInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className="btn btn-outline flex items-center justify-center w-full relative hover:bg-lume-primary-dark/50 border-lume-secondary-dark/90 border-[1px] rounded-[10px]"
    >
      <div className="flex items-center justify-center h-auto w-[25px] absolute left-2 top-1/2 -translate-y-1/2">
        <img src={GoogleIcon} alt="Google" />
      </div>
      <span className="ml-2">{text}</span>
    </button>
  );
};

export default GoogleAuthButton;
