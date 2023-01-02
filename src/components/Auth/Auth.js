import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { AuthFormContext } from "../../context/AuthFormContext";

export function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setShowLogin(false);
  };
  const valuesProvider = {
    showLoginForm,
    showRegisterForm
  };
  const { Provider } = AuthFormContext;
  return (
    <Provider value={valuesProvider}>
      {showLogin ? <LoginForm /> : <RegisterForm />};
    </Provider>
  );
}
