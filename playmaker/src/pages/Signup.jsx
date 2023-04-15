import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { useRegisterMutation } from "../redux/apiSlice";

const Signup = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const handleSignup = (payload) => {
    // console.log(payload);
    register(payload)
      .unwrap()
      .then((res) => {
        alert(res.res);
      })
      .catch((err) => alert(err.data.res));
  };
  return <UserForm title={"Signup"} onSubmit={handleSignup} />;
};

export default Signup;
