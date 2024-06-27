"use client";

import { Comment } from "@/src/models/Comment";
import { cn } from "@/src/utils/func";
import React, { useEffect, useMemo, useState } from "react";
import { StarsIcon } from "../icons/normal-custom/stars-icon";
import { CommentForm } from "./comment-form";
import { FoodComment } from "./food-comment";
import { GetFoodComment } from "@/src/actions/food";
import { User } from "@/src/models/User";

export const CommentSection = ({
  foodId,
  hasPurchased,
  user,
}: {
  foodId: number;
  hasPurchased: boolean;
  user: User;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const hasCommented = useMemo(
    () => comments.some((comment) => comment.user.id === user.id),
    [comments]
  );

  const handleGetFoodComment = async (foodId: number) => {
    const data: Comment[] = await GetFoodComment(foodId);
    setComments(
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  };

  const handleAfterComment = () => {
    handleGetFoodComment(foodId);
  };
  const handleAfterDelete = () => {
    handleGetFoodComment(foodId);
  };

  useEffect(() => {
    handleGetFoodComment(foodId);
  }, []);

  return (
    <div className="w-3/5 mx-auto h-full bg-white text-black rounded-lg px-2">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">Comments</h2>
      {hasPurchased && !hasCommented ? (
        <CommentForm foodId={foodId} handleAfterComment={handleAfterComment} />
      ) : null}
      <div>
        <div className="flex flex-col gap-2">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <FoodComment
                key={index}
                comment={comment}
                isFromUser={comment.user.id === user.id}
                handleAfterDelete={handleAfterDelete}
              />
            ))
          ) : (
            <div className="w-full h-20 flex items-center justify-center">
              <p className="text-gray-700 text-center ">
                No comments yet.
                {hasPurchased
                  ? " Be the first to comment!"
                  : " Buy the food and give us feedback about the food <3"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
