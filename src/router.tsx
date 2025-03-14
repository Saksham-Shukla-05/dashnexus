import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./Layout/DashBoardLayout";
import BooksPage from "./pages/BooksPage";
import AuthLayout from "./Layout/AuthLayout";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import BookDetail from "./pages/BookDetail";
import Subscribers from "./pages/Subscribers";
import UserHomePage from "./pages/UserHomePage";
import UserHomeLayout from "./Layout/UserHomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard/home" />,
  },
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
      {
        path: "books/create",
        element: <CreateBook />,
      },
      {
        path: "Subscribers",
        element: <Subscribers />,
      },
      {
        path: "books/edit/:bookId",
        element: <EditBook />,
      },
      {
        path: "books/:bookId",
        element: <BookDetail />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "signup",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "userDashboard",
    element: <UserHomeLayout />,
    children: [
      {
        path: "home",
        element: <UserHomePage />,
      },
    ],
  },
]);

export default router;
