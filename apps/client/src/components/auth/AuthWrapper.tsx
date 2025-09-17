import React, { useState } from "react";

import Login from "../login/Login";
import Signup from "../signup/Signup";

export const AuthWrapper: React.FC = () => {
  const [activeAuthForm, setActiveAuthForm] = useState<"login" | "signup">(
    "login"
  );

  return (
    <div>
      {activeAuthForm === "login" ? (
        <Login setActiveAuthForm={setActiveAuthForm} />
      ) : (
        <Signup setActiveAuthForm={setActiveAuthForm} />
      )}
    </div>
  );
};

export default AuthWrapper;
