"use client";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children: ReactNode;
  className?: ClassValue;
  delay?: number;
}
const FadeInSection = ({ children, className, delay }: Props) => {
  const [countIntersection, setCountIntersection] = useState(0);
  const ref = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          setTimeout(
            () => {
              setCountIntersection((prev) => prev + 1);
            },
            delay ? delay : 0
          );
      });
    });
    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

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
