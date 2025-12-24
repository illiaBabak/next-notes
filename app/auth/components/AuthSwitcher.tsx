"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

type AuthContextType = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
  setIsLogin: () => {
    throw new Error("Auth context is not initialized yet");
  },
});

export const AuthSwitcher = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthContext.Provider value={{ setIsLogin }}>
      {isLogin ? <LoginForm /> : <SignUpForm />}
    </AuthContext.Provider>
  );
};
