"use client";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children: ReactNode;
  className?: ClassValue;
  isScrollingUp?: boolean;
}
const FadeInSection = ({ children, className, isScrollingUp }: Props) => {
  const [countIntersection, setCountIntersection] = useState(0);
  const ref = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setCountIntersection((prev) => prev + 1);
      });
    });
    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  //   useEffect(() => {
  //     console.log("child scroll", isScrollingUp);
  //   }, [isScrollingUp]);

  return (
    <section
      className={cn(
        "fade-in-section-to-top",
        countIntersection > 0 && "fade-in",
        className
      )}
      ref={ref}
    >
      {children}
    </section>
  );
};

export default FadeInSection;
