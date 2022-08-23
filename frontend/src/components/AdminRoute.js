import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return (
    <>{userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/signin" />}</>
  );
};

export default AdminRoute;
