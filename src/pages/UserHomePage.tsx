import useTokenStore from "@/store";

function UserHomePage() {
  const { token, setToken, user, setUser } = useTokenStore((state) => state);

  return <div>Welcom {user.name}</div>;
}

export default UserHomePage;
