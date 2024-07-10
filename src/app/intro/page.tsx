"use client";
import IntroCarousel from "@/src/components/carousel/intro-carousel";
import LoadingCircle from "@/src/components/icons/custom-with-css/LoadingCircle/loading_circle";
import About from "@/src/components/intro/about";
import AboutFood1 from "@/src/components/intro/about-food-1";
import AboutFood2 from "@/src/components/intro/about-food-2";
import AboutService from "@/src/components/intro/about-service";
import AboutServiceAfterSale from "@/src/components/intro/about-service-after-sale";
import WhatPeopleSay from "@/src/components/intro/what-people-say";
import { Button } from "@/src/components/ui/button";
import MySteryBackground from "@/src/components/ui/mystery-background";
import ThemeSwitch from "@/src/components/ui/theme-switch";
import { cn } from "@/src/utils/func";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import animation from "src/style/scroll-watcher.module.css";

export default function IntroPage() {
  const router = useRouter();
  const path = usePathname();
  const [isChangingPath, setIsChangingPath] = useState(false);
  useEffect(() => {
    if (path !== "/intro") setIsChangingPath(false);
  }, [path]);

  return (
    <div className="relative">
      <MySteryBackground />
      <div
        className={cn(
          "fixed right-0 pb-2 pr-2 w-fit h-full flex flex-col justify-end",
          animation["scroll-watcher"]
        )}
      >
        <div className="rounded-full bg-gray-100/50 hover:bg-gray-100 dark:bg-white/10 dark:hover:bg-white/20 transition-all">
          <ThemeSwitch />
        </div>
      </div>

      <AboutFood1 />
      <AboutFood2 />
      <AboutService />
      <AboutServiceAfterSale />

      <WhatPeopleSay />

      <IntroCarousel className="mt-24" />
      <section className="relative w-full h-fit my-16 flex flex-col items-center text-lg text-center text-secondary-word dark:text-dark-primary-word">
        <h3 className="text-4xl font-semibold mb-4 text-primary-word dark:text-dark-primary-word">
          Order Online Now!
        </h3>
        <p>
          Enjoy your favorite dishes at home with our easy and convenient online
          ordering.
        </p>
        <p>Let us bring the flavors of our restaurant to you!</p>

        <Button
          className="my-10 rounded-full pl-4 pr-8 py-4 gap-2 text-xl font-semibold shadow-highlight-orange dark:shadow-highlight-dark hover:-translate-y-1 ease-linear duration-200"
          onClick={() => {
            setIsChangingPath(true);
            router.push("/login");
          }}
          iconBefore={
            <LoadingCircle
              color="white"
              className={cn("opacity-0", isChangingPath && "opacity-100")}
            />
          }
        >
          Order Now
        </Button>
      </section>
      <About />
    </div>
  );
}
