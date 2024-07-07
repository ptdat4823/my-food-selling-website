"use client";
import IntroCarousel from "@/src/components/carousel/intro-carousel";
import MySteryBackground from "@/src/components/ui/mystery-background";
import ThemeSwitch from "@/src/components/ui/theme-switch";
import { cn } from "@/src/utils/func";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import animation from "src/style/scroll-watcher.module.css";
import Logo from "@/public/images/logo.png";

const TopPage = {
  top: "2rem",
};

const MiddlePage = {
  top: "50%",
};

const BottomPage = {
  bottom: "2rem",
};

export default function IntroPage() {
  const [yPos, setYPos] = useState(8); //8px
  const [scrollPercent, setScrollPercent] = useState(0);
  const handleScroll = () => {
    // const newYPosition = window.innerHeight * ySwitchPercent;
    // setYPos(window.innerHeight);
  };
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (window !== undefined) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative font-sans">
      <MySteryBackground />
      <div
        className={cn(
          "fixed left-0 pb-2 pl-2 w-fit h-full flex flex-col justify-end",
          animation["scroll-watcher"]
        )}
      >
        <div className="rounded-full bg-gray-100/50 hover:bg-gray-100 dark:bg-white/10 dark:hover:bg-white/20 transition-all">
          <ThemeSwitch />
        </div>
      </div>
      <section className="p-2">
        <IntroCarousel />
      </section>
      <section className="relative w-full h-fit mt-16 flex flex-col items-center text-black dark:text-dark-primary-word">
        <h3 className="text-2xl font-semibold">
          ONLINE ORDERING IS NOW AVAILABLE!
        </h3>
        <p className="text-lg text-center w-[800px] mb-16">
          We&apos;ve streamlined the process to make it easier for you to enjoy
          your favorite dishes from the comfort of your home. Experience the
          convenience of online ordering today and let us bring the flavors of
          our restaurant directly to you!
        </p>
        <Link
          href="/"
          className="px-10 py-6 mb-16 border-2 border-black text-black hover:text-white rounded-sm hover:cursor-pointer hover:bg-primary font-bold transition-all"
        >
          ORDER ONLINE
        </Link>
        <div className="grid lg:grid-cols-3 max-lg:grid-cols-6 grid-rows-2 w-[70%]">
          <div className="max-lg:col-span-3 max-lg:row-start-1 max-lg:row-span-1">
            <p className="text-xl text-center tracking-widest font-bold">
              LOCATION
            </p>
            <p className="text-center font-medium my-2">SE109.O21 St.</p>
            <p className="text-center">UIT, Thu Duc, TPHCM</p>
          </div>
          <div className="max-lg:col-span-3 max-lg:col-start-4 max-lg:row-start-1 max-lg:row-span-1">
            <p className="text-xl text-center tracking-widest font-bold">
              HOURS
            </p>
            <p className="text-center font-medium my-2">
              Brunch: Thursday - Monday, 9am to 2:30pm{" "}
            </p>
            <p className="text-center">Dinner: Thursday - Sunday, 5pm to 9pm</p>
          </div>
          <div className="max-lg:col-span-6 max-lg:row-start-2 max-lg:row-span-1">
            <p className="text-xl text-center tracking-widest font-bold">
              CONTACT
            </p>
            <p className="text-center font-medium my-2">(626) 281-1035</p>
            <p className="text-center">hello@sen1orkitchenhcm.com</p>
          </div>
        </div>
      </section>
      {/* <section className="h-56 bg-gray-100 dark:bg-white/10 text-black dark:text-dark-primary-word py-8 px-12 flex justify-evenly">
        <div>
          <h2 className="text-xl font-bold">About me</h2>
          <li className="my-4">
            <a className="underline hover:cursor-pointer hover:font-bold font-medium text-base">
              Đạt, Phạm Tiến{" "}
            </a>
          </li>
          <p>UIT, Thu Duc, Thanh Pho HCM</p>
        </div>

        <div>
          <ul>
            <li>
              <a className="hover:cursor-pointer hover:font-bold hover:underline">
                FACEBOOK
              </a>
            </li>
            <li>
              <a className="hover:cursor-pointer hover:font-bold hover:underline">
                GITHUB
              </a>
            </li>
            <li>
              <a className="hover:cursor-pointer hover:font-bold hover:underline">
                LINKEDIN
              </a>
            </li>
          </ul>
          <h3 className="text-center">© 2024 FFOOD&apos;S KITCHEN</h3>
        </div>
      </section> */}
      <section className="bg-gray-100 dark:bg-white/10 text-black dark:text-dark-primary-word py-8 px-12 flex flex-col md:flex-row justify-start gap-32 items-start space-y-8 md:space-y-0 md:space-x-8">
        <div>
          <h2 className="text-xl font-bold mb-4">About Me</h2>
          <ul>
            <li className="mb-2">
              <span className="font-medium text-base">Đạt, Phạm Tiến</span>
            </li>
            <li className="mb-2">
              <span className="text-base">
                University of Information Technology (UIT)
              </span>
            </li>
            <li className="mb-2">
              <span className="text-base">
                Thu Duc, Ho Chi Minh City, Vietnam
              </span>
            </li>
            <li className="mb-2">
              <span className="text-base">
                Email: phamtiendat4823@gmail.com
              </span>
            </li>
            <li className="mb-2">
              <span className="text-base">Phone: +84 868 015 900</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Connect with Me</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://facebook.com"
                className="hover:cursor-pointer hover:underline text-base transition-all"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                className="hover:cursor-pointer hover:underline text-base transition-all"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                className="hover:cursor-pointer hover:underline text-base transition-all"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/projects"
                className="hover:cursor-pointer hover:font-bold hover:underline text-base"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="hover:cursor-pointer hover:font-bold hover:underline text-base"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:cursor-pointer hover:font-bold hover:underline text-base"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* <div className="mt-8 md:mt-0 text-center">
          <h3 className="flex flex-row items-center gap-2 whitespace-nowrap text-base font-medium">
            © Fresh Mart <Image src={Logo} alt="logo" width={40} height={40} />
          </h3>
        </div> */}
      </section>
    </div>
  );
}
