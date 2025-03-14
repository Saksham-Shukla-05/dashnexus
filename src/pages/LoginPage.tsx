import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/http/api";
import { cn } from "@/lib/utils";
import useTokenStore from "@/store";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);
  const setUser = useTokenStore((state) => state.setUser);
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setToken(response.data.accessToken);
      setUser(response.data.user);
      toast.success("Login Successfull");

      console.log();

      setTimeout(() => {
        if (response.data.user.role === "0") {
          navigate("/user");
        } else {
          navigate("/dashboard/home");
        }
      }, 2000);
    },
  });

  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.error("Please Enter credentials");
      return;
    }
    mutation.mutate({ email, password });
  };

  useEffect(() => {
    if (mutation.isError) {
      toast.error(mutation.error?.response?.data?.message || "Login failed");
    }
  }, [mutation.isError, mutation.error]);
  return (
    <>
      <section className={"flex h-screen justify-center items-center"}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className=" text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account <br />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    ref={emailRef}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    ref={passwordRef}
                    id="password"
                    type="password"
                    required
                  />
                </div>
                <Button
                  onClick={handleLoginSubmit}
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <LoaderCircle
                      className={cn(mutation.isPending ? "animate-spin" : "")}
                    />
                  ) : (
                    ""
                  )}

                  <span className="-mt-1">Sign in</span>
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/auth/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
};
export default LoginForm;
