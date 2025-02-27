import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { LoginForm } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <RegisterPage />,
  },
]);

export default router;
