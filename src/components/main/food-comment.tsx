"use client";

import { DeleteComment } from "@/src/actions/food";
import { Comment } from "@/src/models/Comment";
import { cn } from "@/src/utils/func";
import { X } from "lucide-react";
import { useState } from "react";
import LoadingCircle from "../icons/custom-with-css/LoadingCircle/loading_circle";
import { StarsIcon } from "../icons/normal-custom/stars-icon";
import { Button } from "../ui/button";
import { showErrorToast, showSuccessToast } from "../ui/toast";

export const FoodComment = ({
  comment,
  isFromUser,
  handleAfterDelete,
}: {
  comment: Comment;
  isFromUser?: boolean;
  handleAfterDelete?: () => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteComment = async () => {
    setIsDeleting(true);
    const res = await DeleteComment(comment.id);
    if (res.error) {
      showErrorToast(res.error);
    }
    if (res.message) {
      handleAfterDelete && handleAfterDelete();
      showSuccessToast(res.message);
    }
    setIsDeleting(false);
  };
  return (
    <div
      className={cn(
        "relative w-full flex flex-row p-3 border-2 rounded-lg border-gray-200 group",
        isFromUser ? "border-primary" : ""
      )}
    >
      <img
        src={comment.user.profileImage || "/images/default_user.jpg"}
        alt={comment.user.name}
        className="w-10 h-10 rounded-full mr-4 mt-1"
      />
      <div className="flex-1">
        <div className="flex flex-col justify-start h-full">
          <div className="w-full flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <h4
                className={cn(
                  "text-sm font-semibold ",
                  isFromUser ? "text-primary-word" : "text-secondary-word"
                )}
              >
                {comment.user.name}
              </h4>
              <StarsIcon rating={comment.rating} />
            </div>
            <p className="text-xs text-gray-600">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
          <h5 className="text-md font-semibold text-gray-800 mt-1">
            {comment.title}
          </h5>
          <p className="text-gray-700 text-sm">{comment.content}</p>
        </div>
      </div>

      {isFromUser && (
        <Button
          className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 opacity-0 pointer-events-none -translate-y-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 ease-linear duration-200"
          iconAfter={
            isDeleting ? (
              <LoadingCircle />
            ) : (
              <X className="w-4 h-4 text-red-400" />
            )
          }
          onClick={handleDeleteComment}
        />
      )}
    </div>
  );
};
