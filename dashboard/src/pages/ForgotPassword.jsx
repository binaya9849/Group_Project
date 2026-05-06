import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { forgotPassword } from "../store/slices/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({email}));
    setEmail("");
  };

const { User,isAuthenticated,loading } = useSelector((state) => state.auth);
  if (isAuthenticated && User.role === "admin") {
    return <Navigate to="/" />;
  }

  return <></>;
};

export default ForgotPassword