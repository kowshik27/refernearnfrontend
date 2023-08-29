import React from "react";
import { Navigate, useParams } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restProps }) {
  // const routes = useRoutes();
  const { id } = useParams();
  localStorage.setItem("referalFrom", id ? id : "");

  if (localStorage.getItem("user")) {
    return <Component {...restProps} />;
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
