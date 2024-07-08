"use client";
import { Mail, Phone } from "lucide-react";

const About = () => {
  return (
    <section className="bg-primary dark:bg-white/10 text-white dark:text-dark-primary-word py-8 px-12 flex flex-col md:flex-row justify-start gap-32 items-start space-y-8 md:space-y-0 md:space-x-8">
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
            <div className="flex flex-row items-center text-base whitespace-nowrap gap-2">
              <Mail className="w-4 h-4" /> Email me: phamtiendat4823@gmail.com
            </div>
          </li>
          <li className="mb-2">
            <div className="flex flex-row items-center text-base whitespace-nowrap gap-2">
              <Phone className="w-4 h-4" /> Call me: +84 868 015 900
            </div>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">More Info</h2>
        <ul className="space-y-2">
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=100053824399338"
              className="hover:cursor-pointer hover:underline text-base transition-all"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ptdat4823"
              className="hover:cursor-pointer hover:underline text-base transition-all"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/dat-pham-526299252/"
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
              href="https://github.com/ptdat4823?tab=repositories"
              className="hover:cursor-pointer hover:font-bold hover:underline text-base"
            >
              Projects
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
