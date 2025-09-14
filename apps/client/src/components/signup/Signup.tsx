import React, { useState } from "react";

import { useFirebase } from "../../hooks/useFirebase";
import { useModal } from "../../stores/modals";

export const Signup: React.FC = () => {
  const { close } = useModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleCreateUserWithEmailAndPassword: createUserWithEmailAndPassword,
  } = useFirebase();

  const handleCreateUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    if (email.length < 3 || password.length < 3) return;

    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(email, password);
      close();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateUserWithEmailAndPassword(email, password);
      }}
    >
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-lume-primary-dark text-white p-2 rounded"
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};
