import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { LoginForm } from "./pages/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);

export default router;
