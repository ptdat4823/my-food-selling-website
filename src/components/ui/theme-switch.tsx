"use client";

import { cn } from "@/src/utils/func";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LoadingCircle20 from "../icons/custom-with-css/LoadingCircle/loading_circle_20px";
import NightIcon from "../icons/normal-custom/night-icon";
import SunIcon from "../icons/normal-custom/sun-icon";
import { Button } from "./button";
import { ClassValue } from "clsx";

interface Props {
  className?: ClassValue;
}
const ThemeSwitch = ({ className }: Props) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (theme) localStorage.setItem("__theme__", theme);
  }, [theme]);

  if (!isMounted)
    return (
      <div
        className={cn("w-10 h-10 flex items-center justify-center", className)}
      >
        <LoadingCircle20 />
      </div>
    );

  return (
    <Button
      className={cn(
        "w-10 h-10 bg-transparent hover:bg-transparent dark:hover:bg-transparent hover:opacity-100",
        className
      )}
      iconAfter={theme === "dark" ? <NightIcon /> : <SunIcon />}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
};

export default ThemeSwitch;
