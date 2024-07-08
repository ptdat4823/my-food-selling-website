import { cn } from "@/src/utils/func";
import React from "react";
import IntroCarousel from "../carousel/intro-carousel";
import { IntroComment } from "./intro-comment";
import CommentCarousel from "../carousel/comments-carousel";

const comments: IntroComment[] = [
  {
    image: "/images/intro-user-1.jpg",
    title: "It's an amazing experience",
    username: "John Doe",
    content: "It's so fast delivery, I'm so satisfied with the service",
    rating: 5,
  },
  {
    image: "/images/intro-user-2.jpg",
    title: "Such a great service",
    username: "Jane Doe",
    content: "I love the food, it's so delicious and the service is so fast",
    rating: 5,
  },
  {
    image: "/images/intro-user-3.jpg",
    title: "I will order for more",
    username: "John Doe",
    content:
      "The service is so good, I don't have to wait for too long, the food is so delicious",
    rating: 5,
  },
];

const WhatPeopleSay = () => {
  return (
    <section className="w-full h-screen">
      <div className="relative w-full h-full bg-fixed bg-light bg-cover bg-no-repeat p-24">
        <div className="w-full h-full rounded-3xl flex flex-col items-center bg-white gap-8 pt-12">
          <h1 className="font-extrabold text-4xl text-primary mb-4">
            Testimonial
          </h1>
          <h2 className="font-bold text-5xl mb-12 text-primary-word">
            What People Say
          </h2>
          <CommentCarousel comments={comments} />
        </div>
      </div>
    </section>
  );
};

export default WhatPeopleSay;
