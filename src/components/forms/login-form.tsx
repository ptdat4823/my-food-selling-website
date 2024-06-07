"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import { cn } from "@nextui-org/react";
import { Separate } from "../ui/separate";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ClassValue } from "clsx";

export type LoginFormData = {
  email: string;
  password: string;
};

const loginSchema: ZodType<LoginFormData> = z.object({
  email: z.string().email(),
  password: z.string(),
});

export interface LoginFormProps {
  className?: ClassValue;
}

const LoginForm = ({ className }: LoginFormProps) => {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const handleFormSubmit = async (data: LoginFormData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            <span className="text-nowrap text-secondary-word font-semibold text-xl">
              Sign In
            </span>
            <Separate classname="h-[1px]" />
          </div>
        </div>
        <div className="flex flex-col w-full gap-6 mt-4">
          <Input
            id="email"
            label="Email"
            errorMessages={errors.email ? errors.email.message : ""}
            placeholder="demo@example.com"
            {...register("email")}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            errorMessages={errors.password ? errors.password.message : ""}
            {...register("password")}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <Button
            type="submit"
            disabled={isLoggingIn}
            className="w-full mt-6 text-sm font-extrabold text-white bg-primary hover:bg-primary/80"
          >
            {isLoggingIn ? "Logging in" : "Sign Me In"}
          </Button>

          <span className="text-sm text-secondary-word">
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
