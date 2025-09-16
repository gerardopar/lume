import React, { useState } from "react";
import { z } from "zod";

import { useFirebase } from "../../hooks/useFirebase";
import { useModal } from "../../stores/modals";

import EyeIcon from "../svgs/EyeIcon";
import EyeClosedIcon from "../svgs/EyeClosedIcon";
import { CloseButton } from "../shared/CloseButton";
import GoogleAuthButton from "../shared/GoogleAuthButton";

import { emailRegex, passwordRegex } from "../../const/regex";

const schema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .regex(emailRegex, "Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(passwordRegex, "Invalid password"),
});

export const Login: React.FC<{
  setActiveAuthForm: React.Dispatch<React.SetStateAction<"login" | "signup">>;
}> = ({ setActiveAuthForm }) => {
  const { close } = useModal();

  const { handleSignInWithEmailAndPassword } = useFirebase();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const result = schema.safeParse({ email, password });

    if (!result.success) {
      const formatted = result.error.flatten().fieldErrors;
      setErrors({
        email: formatted.email?.[0],
        password: formatted.password?.[0],
      });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSignin = async (email: string, password: string) => {
    if (!validate()) return;

    try {
      setIsLoading(true);
      await handleSignInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="pb-4">
        <CloseButton
          onClick={() => close()}
          className="absolute top-4 right-4"
        />
        <h2 className="text-2xl font-inter font-bold">Sign in to Lume.</h2>
        <div className="text-sm font-poppins mt-1">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-lume-green cursor-pointer hover:underline"
            onClick={() => setActiveAuthForm("signup")}
          >
            Sign up
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignin(email, password);
          }}
          className="mt-4"
        >
          <div className="mb-4 w-full">
            <p className="mb-2 font-poppins font-[400] text-sm pl-1">Email</p>
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border-lume-secondary-dark/90 border-[1px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-lume-primary-dark font-poppins font-[200] pl-2 ${
                errors.email ? "border-red-400" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-400 pl-1 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6 w-full relative">
            <div className="w-full flex items-center justify-between">
              <p className="mb-2 font-poppins font-[400] text-sm pl-1">
                Password
              </p>
            </div>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full p-2 border-lume-secondary-dark/90 border-[1px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-lume-primary-dark font-poppins font-[200] pl-2 ${
                  errors.password ? "border-red-400" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeClosedIcon className="w-4 h-4" />
                ) : (
                  <EyeIcon className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 pl-1 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-lume-green/90 text-white p-2 rounded-[10px] w-full cursor-pointer hover:bg-lume-green/60 transition-colors duration-200 ease-in-out"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
      <div className="divider font-poppins font-[200]">OR</div>
      <GoogleAuthButton text="Sign in with Google" />
    </>
  );
};

export default Login;
