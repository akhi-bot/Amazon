import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return <>{userInfo ? <Outlet /> : <Navigate to="/signin" />}</>;
};

export default PrivateRoute;
