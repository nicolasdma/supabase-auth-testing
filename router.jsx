import { createBrowserRouter } from "react-router-dom";
import App from "./src/App";
import Signup from "./src/components/Signup";
import Signin from "./src/components/Signin";
import Dashboard from "./src/components/Dashboard";
import PrivateRoute from "./src/components/PrivateRoute";
import RecoveryPassword from "./src/components/RecoveryPassword";
import UpdatePassword from "./src/components/UpdatePassword";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
  { path: "/recovery", element: <RecoveryPassword /> },
  { path: "/update", element: <UpdatePassword /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);
