import { createBrowserRouter } from "react-router-dom";
import App from "./src/App";
import Signup from "./src/components/Signup";
import Signin from "./src/components/Signin";
import Dashboard from "./src/components/Dashboard";
import PrivateRoute from "./src/components/PrivateRoute";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);
