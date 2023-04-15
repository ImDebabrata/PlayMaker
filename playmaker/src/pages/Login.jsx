import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { useLoginMutation } from "../redux/apiSlice";
import { loginSuccess } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const handleLogin = (payload) => {
    // console.log("payload:", payload);
    return login(payload)
      .unwrap()
      .then((res) => {
        alert(res.res);
        dispatch(loginSuccess(res.token));
      })
      .catch((err) => alert(err.data.res));
  };
  return <UserForm title={"Login"} onSubmit={handleLogin} />;
};

export default Login;
