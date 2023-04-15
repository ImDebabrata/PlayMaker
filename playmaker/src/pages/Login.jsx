import React, { useState } from "react";
import UserForm from "../components/UserForm";

const Login = () => {
  const handleLogin = (payload) => {
    console.log("payload:", payload);
  };
  return <UserForm title={"Login"} onSubmit={handleLogin} />;
};

export default Login;
