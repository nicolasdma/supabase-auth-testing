import React from "react";
import { UserAuth } from "../context/ContextAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { session } = UserAuth();

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="text-white text-lg font-medium">Loading...</div>
      </div>
    );
  }

  return session ? children : <Navigate to="/signup" />;
};

export default PrivateRoute;
