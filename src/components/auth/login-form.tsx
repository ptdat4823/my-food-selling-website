"use client";
import Logo from "@/public/images/logo.png";
import { cn } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { Google } from "../icons/brand";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separate } from "../ui/separate";
import { showErrorToast, showSuccessToast } from "../ui/toast";
import LoadingCircle from "../icons/custom-with-css/LoadingCircle/loading_circle";

export type LoginFormData = {
  email: string;
  password: string;
};

export const loginSchema: ZodType<LoginFormData> = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginForm = () => {
  const { data: session } = useSession();
  if (session) {
    if (
      session.user?.name === "admin" ||
      session.user?.email === "admin@gmail.com"
    )
      redirect("/dashboard");
    else redirect("/home");
  }
  const router = useRouter();
  const form = useForm<LoginFormData>();
  const { register } = form;
  const [fieldErrors, setFieldErrors] = useState<any>();
  const path = usePathname();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  useEffect(() => {
    if (path !== "/login") setIsLoggingIn(false);
  }, [path]);

  const handleSignInWithGoogle = async () => {
    await signIn("google", {
      redirect: false,
    });
  };

  const clientAction = async (data: FormData) => {
    //create request object
    const request = {
      email: data.get("email"),
      password: data.get("password"),
    };

    //validate request object
    const validation = loginSchema.safeParse(request);
    if (!validation.success) {
      setFieldErrors(validation.error.formErrors.fieldErrors);
      return;
    }

    const res = await signIn("credentials", {
      email: request.email,
      password: request.password,
      redirect: false,
    });

    if (res) {
      if (res.ok) {
        showSuccessToast("Login successfully");
        redirect("/home");
      } else {
        showErrorToast(res.error ? res.error : "Login failed");
      }
    }
  };

  return (
    <form action={clientAction}>
      <div className="flex flex-col items-center gap-10 pt-10">
        <div className="w-full flex flex-col items-center gap-4">
          <div className="font-extrabold text-xl select-none flex items-center gap-2">
            <Image src={Logo} alt="logo" width={40} height={40} />
            <span className={cn("text-nowrap text-primary text-2xl")}>
              Fresh Mart
            </span>
          </div>
          <div className="w-2/3 flex flex-row items-center justify-between gap-4">
            <Separate classname="h-[1px]" />
            <span className="text-nowrap text-secondary-word dark:text-dark-secondary-word font-semibold text-xl">
              Sign In
            </span>
            <Separate classname="h-[1px]" />
          </div>
        </div>
        <div className="flex flex-col w-full gap-6 mt-4">
          <Input
            id="email"
            label="Email"
            errorMessages={
              fieldErrors && fieldErrors.email ? fieldErrors.email[0] : ""
            }
            placeholder="demo@example.com"
            {...register("email")}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            errorMessages={
              fieldErrors && fieldErrors.password ? fieldErrors.password[0] : ""
            }
            {...register("password")}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <Button
            type="submit"
            className={cn(
              "w-full mt-6 text-sm gap-2 pr-4 font-extrabold text-white bg-primary hover:bg-primary/80",
              isLoggingIn && "opacity-50 pointer-events-none"
            )}
            onClick={() => setIsLoggingIn(true)}
          >
            {isLoggingIn ? <LoadingCircle color="white" /> : "Sign Me In"}
          </Button>

          <span className="my-2">or</span>

          <Button
            type="button"
            className="w-full bg-white hover:bg-gray-200 border text-primary-word gap-2 dark:text-dark-secondary-word dark:bg-white/10 dark:hover:bg-white/20"
            iconBefore={<Google />}
            onClick={handleSignInWithGoogle}
          >
            Sign in with google
          </Button>

          <span className="text-sm text-secondary-word dark:text-dark-secondary-word">
            Don&#39;t have an account
            <span
              onClick={() => router.push("/register")}
              className="text-primary cursor-pointer"
            >
              {" "}
              Sign up
            </span>
          </span>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
