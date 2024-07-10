"use client";
import Logo from "@/public/images/logo.png";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/utils/func";
import { Nunito } from "next/font/google";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import animation from "src/style/type-writer.module.css";
import LoadingCircle from "../components/icons/custom-with-css/LoadingCircle/loading_circle";

const nunito = Nunito({
  weight: ["400", "700", "1000"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const animationContent = [
  "Super Fresh Food",
  "Very Delicious Food",
  "And More Healthy Food",
];

export default function IntroPage() {
  const router = useRouter();
  const [contentIndex, setContentIndex] = useState(0);
  const path = usePathname();
  const [isGoingToLogin, setIsGoingToLogin] = useState(false);
  const [isGoingToIntro, setIsGoingToIntro] = useState(false);
  useEffect(() => {
    if (path !== "/") {
      setIsGoingToLogin(false);
      setIsGoingToIntro(false);
    }
  }, [path]);

  useEffect(() => {
    setTimeout(() => {
      setContentIndex((prev) => (prev + 1) % animationContent.length);
    }, 4000);
    const interval = setInterval(() => {
      setTimeout(() => {
        setContentIndex((prev) => (prev + 1) % animationContent.length);
      }, 4000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative bg-intro bg-cover bg-no-repeat min-h-screen flex flex-col gap-16 p-4">
        <div className="flex flex-row items-center gap-1 whitespace-nowrap">
          <Image src={Logo} alt="logo" width={60} height={60} />
          <span
            className={cn(
              "text-nowrap text-primary-word font-extrabold text-2xl",
              nunito.className
            )}
          >
            Fresh Mart
          </span>
        </div>
        <div className="space-y-12">
          <h1 className={cn("text-4xl text-orange-400 font-bold font-nunito")}>
            Welcome to Fresh Mart!
          </h1>

          <div className="w-fit flex flex-col items-start space-y-8">
            <h2
              className={cn(
                "text-5xl text-primary-word font-bold",
                animation["typewriter"]
              )}
            >
              {animationContent[contentIndex]}
            </h2>

            <h2 className="text-5xl text-primary-word font-bold">
              Special for You
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <p className="w-[400px] text-xl text-secondary-word">
            Order your favorites food from anywhere and get delivery at your
            door
          </p>
          <div className="flex flex-row gap-4 whitespace-nowrap">
            <Button
              className="rounded-full pl-4 pr-8 py-4 gap-2 text-xl font-semibold shadow-highlight-orange bg-orange-400 dark:hover:bg-orange-500 hover:-translate-y-1 ease-linear duration-200"
              onClick={() => {
                setIsGoingToLogin(true);
                router.push("/login");
              }}
              iconBefore={
                <LoadingCircle
                  color="white"
                  className={cn("opacity-0", isGoingToLogin && "opacity-100")}
                />
              }
            >
              Order Now
            </Button>
            <Button
              className="border border-orange-400 bg-transparent text-orange-400 dark:text-orange-400 dark:hover:bg-orange-400 dark:hover:text-white hover:text-white hover:shadow-highlight-orange rounded-full pl-4 pr-8 py-4 gap-2 text-xl font-semibold ease-linear duration-200"
              onClick={() => {
                setIsGoingToIntro(true);
                router.push("/intro");
              }}
              iconBefore={
                <LoadingCircle
                  color="white"
                  className={cn("opacity-0", isGoingToIntro && "opacity-100")}
                />
              }
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
