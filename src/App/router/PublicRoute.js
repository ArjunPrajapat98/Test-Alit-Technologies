import React from "react";
import { Navigate } from "react-router-dom";
import { getStorage } from "../helper/storage";

export const PublicRoute = ({ children }) => {
  const loggedIn = getStorage('logged-in')
  if (loggedIn !== null) {
    return <Navigate to={"/dashboard"} />;
  }
  return children;
};
