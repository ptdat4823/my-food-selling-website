import Image from "next/image";
import React from "react";
import { IntroComment } from "./intro-comment";
import { StarsIcon } from "../icons/normal-custom/stars-icon";
import { ClassValue } from "clsx";
import { cn } from "@/src/utils/func";

interface Props {
  comment: IntroComment;
  className?: ClassValue;
}
const IntroCommentCard = ({ comment, className }: Props) => {
  return (
    <div
      className={cn(
        "h-fit bg-transparent flex flex-col items-center gap-2",
        className
      )}
    >
      <div className="relative w-20 h-20 overflow-hidden rounded-full flex items-center justify-center">
        <Image
          src={comment.image}
          alt={"avatar of " + comment.username}
          width={500}
          height={300}
          className="object-top absolute top-0"
        />
      </div>
      <h1 className="font-bold text-primary-word">{comment.title}</h1>
      <div className="flex flex-row">
        <StarsIcon rating={comment.rating} />
      </div>
      <p className="text-secondary-word">{comment.content}</p>
    </div>
  );
};

export default IntroCommentCard;
