import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { useLoginMutation } from "../redux/apiSlice";
import { loginSuccess } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const handleLogin = (payload) => {
    // console.log("payload:", payload);
    return login(payload)
      .unwrap()
      .then((res) => {
        alert(res.res);
        console.log(res);
        dispatch(loginSuccess({ token: res.token, user: res.user }));
        navigate("/events");
      })
      .catch((err) => alert(err.data.res));
  };
  return <UserForm title={"Login"} onSubmit={handleLogin} />;
};

export default Login;
