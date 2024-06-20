import LoginForm from "@/src/components/auth/login-form";
import { cn } from "@/src/utils/func";
import animation from "src/style/animation.module.css";

const LoginPage = () => {
  return (
    <div className="w-full h-full grid grid-cols-7 p-16">
      <div
        className={cn(
          "h-full col-start-5 col-span-3 bg-white p-8 rounded-xl shadow",
          animation["fade-in"]
        )}
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
