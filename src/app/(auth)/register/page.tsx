import RegisterForm from "@/src/components/auth/register-form";
import { cn } from "@/src/utils/func";
import animation from "src/style/animation.module.css";

const RegisterPage = () => {
  return (
    <div className="w-full h-full grid grid-cols-12 p-16">
      <div
        className={cn(
          "h-full col-start-3 col-span-8 bg-white p-8 rounded-xl shadow",
          "dark:bg-dark-bg transition-all ease-linear duration-200",
          animation["fade-in"]
        )}
      >
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
