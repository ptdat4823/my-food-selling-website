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
import { Button } from "../ui/buttons";
import { useRouter } from "next/navigation";
import { ClassValue } from "clsx";

export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const registerSchema: ZodType<RegisterFormData> = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    email: z.string().email(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password do not match",
    path: ["confirmPassword"],
  });

export interface RegisterFormProps {
  className?: ClassValue;
}

const RegisterForm = ({ className }: RegisterFormProps) => {
  const router = useRouter();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const handleFormSubmit = async (data: RegisterFormData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            <span className="text-nowrap text-secondaryWord font-semibold text-xl">
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
            errorMessages={errors.username ? errors.username.message : ""}
            {...register("username")}
          />
          <Input
            id="email"
            label="Email"
            placeholder="demo@example.com"
            errorMessages={errors.email ? errors.email.message : ""}
            {...register("email")}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            errorMessages={errors.password ? errors.password.message : ""}
            {...register("password")}
          />
          <Input
            id="confirm-password"
            label="Confirm Password"
            type="password"
            errorMessages={
              errors.confirmPassword ? errors.confirmPassword.message : ""
            }
            {...register("confirmPassword")}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <Button
            type="submit"
            className="w-full mt-10 text-sm font-extrabold text-white bg-primary hover:bg-primary/80"
            disabled={isSigningUp}
          >
            {isSigningUp ? "" : "Sign Up"}
          </Button>

          <span className="text-sm text-secondaryWord">
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
