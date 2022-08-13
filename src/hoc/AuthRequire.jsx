import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthRequire = ({ children }) => {
  let Token = localStorage.getItem("token");
  const location = useLocation();

  if (!Token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default AuthRequire;
