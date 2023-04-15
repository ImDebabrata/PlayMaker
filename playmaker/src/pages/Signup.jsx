import React, { useState } from "react";
import UserForm from "../components/UserForm";

const Signup = () => {
  const handleSignup = (payload) => {
    console.log(payload);
  };
  return <UserForm title={"Signup"} onSubmit={handleSignup} />;
};

export default Signup;
