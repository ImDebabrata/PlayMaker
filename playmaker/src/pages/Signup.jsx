import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { useRegisterMutation } from "../redux/apiSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const handleSignup = (payload) => {
    // console.log(payload);
    register(payload)
      .unwrap()
      .then((res) => {
        alert(res.res);
        navigate("/");
      })
      .catch((err) => alert(err.data.res));
  };
  return <UserForm title={"Signup"} onSubmit={handleSignup} />;
};

export default Signup;
