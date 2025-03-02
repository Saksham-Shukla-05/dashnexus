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
import { register } from "@/http/api";
import { cn } from "@/lib/utils";
import useTokenStore from "@/store";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import { useRef } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const NameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      setToken(response.data.accessToken);
      navigate("/dashboard/home");
    },
    onError: (res) => {
      toast.error(res.response.data.message[0] || res.response.data.message);
    },
  });

  const handleRegisterSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = NameRef.current?.value;

    if (!email || !password || !name) {
      toast.error("Please Enter credentials");
      return;
    }

    // server call
    mutation.mutate({ name, email, password });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <section className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account <br />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  ref={NameRef}
                  id="name"
                  type="text"
                  placeholder="Saksham Shukla"
                />
              </div>
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
                <Label htmlFor="password">Password</Label>
                <Input
                  ref={passwordRef}
                  id="password"
                  type="password"
                  required
                />
              </div>

              <Button
                onClick={(e) => handleRegisterSubmit(e)}
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

                <span className="-mt-1">Create an Account</span>
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to={"/auth/login"} className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default RegisterPage;
