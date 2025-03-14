import useTokenStore from "@/store";
import { Navigate } from "react-router-dom";

function UserHomePage() {
  const { token, setToken, user, setUser } = useTokenStore((state) => state);

  if (!token || !user || user.role != "0") {
    return <Navigate to={"/auth/login"} replace />;
  }
  return <div>Welcom {user.name}</div>;
}

export default UserHomePage;
