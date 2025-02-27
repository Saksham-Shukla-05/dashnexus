import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { LoginForm } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./Layout/DashBoardLayout";
import BooksPage from "./pages/BooksPage";

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
    ],
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
