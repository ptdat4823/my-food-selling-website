"use client";
import Logo from "@/public/images/logo.png";
import { RegisterAction } from "@/src/actions/auth";
import { cn } from "@nextui-org/react";
import { ClassValue } from "clsx";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separate } from "../ui/separate";
import { showErrorToast, showSuccessToast } from "../ui/toast";
import { useSession } from "next-auth/react";
import { ZodType, z } from "zod";
import LoadingCircle from "../icons/custom-with-css/LoadingCircle/loading_circle";

export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerSchema: ZodType<RegisterFormData> = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    email: z.string().email(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password do not match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const { data: session } = useSession();
  if (session) {
    redirect("/home");
  }
  const router = useRouter();
  const form = useForm<RegisterFormData>();
  const { register } = form;
  const [fieldErrors, setFieldErrors] = useState<any>();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const path = usePathname();
  useEffect(() => {
    if (path !== "/register") setIsSigningUp(false);
  }, [path]);

  const clientAction = async (data: FormData) => {
    //create request object
    const request = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    //validate request object
    const validation = registerSchema.safeParse(request);
    if (!validation.success) {
      setFieldErrors(validation.error.formErrors.fieldErrors);
      return;
    }

    //call register action
    const res = await RegisterAction(data);
    if (res?.error) {
      showErrorToast(res.error);
    }
    if (res?.message) {
      showSuccessToast(res.message);
      redirect("/login");
    }
  };

  return (
    <form action={clientAction}>
      <div className="flex flex-col items-center gap-4 p-8">
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
              Sign up your account
            </span>
            <Separate classname="h-[1px]" />
          </div>
        </div>
        <div className="flex flex-col w-full gap-6 mt-4">
          <Input
            id="username"
            label="Username"
            placeholder="username"
            errorMessages={
              fieldErrors && fieldErrors.username ? fieldErrors.username[0] : ""
            }
            {...register("username")}
          />
          <Input
            id="email"
            label="Email"
            placeholder="demo@example.com"
            errorMessages={
              fieldErrors && fieldErrors.email ? fieldErrors.email[0] : ""
            }
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
          <Input
            id="confirm-password"
            label="Confirm Password"
            type="password"
            errorMessages={
              fieldErrors && fieldErrors.confirmPassword
                ? fieldErrors.confirmPassword[0]
                : ""
            }
            {...register("confirmPassword")}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <Button
            type="submit"
            className={cn(
              "w-full mt-10 pr-4 text-sm font-extrabold text-white bg-primary hover:bg-primary/80",
              isSigningUp && "opacity-50 pointer-events-none"
            )}
            onClick={() => setIsSigningUp(true)}
          >
            {isSigningUp ? <LoadingCircle color="white" /> : "Sign Up"}
          </Button>

          <span className="text-sm text-secondary-word dark:text-dark-secondary-word">
            Already have an account
            <span
              onClick={() => router.push("/login")}
              className="text-primary cursor-pointer"
            >
              {" "}
              Sign in
            </span>
          </span>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
