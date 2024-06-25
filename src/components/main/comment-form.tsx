"use client";

import { UploadComment } from "@/src/actions/food";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { ZodType, z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TextArea } from "../ui/textarea";
import { showErrorToast, showSuccessToast } from "../ui/toast";

export type CommentFormData = {
  title: string;
  content: string;
};

export const commentSchema: ZodType<CommentFormData> = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title is too long" }),
  content: z
    .string()
    .min(1, { message: "Content is required" })
    .max(1000, { message: "Content is too long" }),
});

interface Props {
  foodId: number;
  handleAfterComment?: () => void;
}
export const CommentForm = ({ foodId, handleAfterComment }: Props) => {
  const form = useForm<CommentFormData>();
  const { register, reset, watch } = form;
  const [fieldErrors, setFieldErrors] = useState<any>();
  const [rating, setRating] = useState<number>(5);

  const handleRatingChange = (rating: number) => {
    setRating(rating);
  };

  const resetForm = () => {
    reset({ title: "", content: "" });
    setRating(5);
    setFieldErrors({});
  };

  const clientAction = async (data: FormData) => {
    //create request object
    const request = {
      title: data.get("title"),
      content: data.get("content"),
      rating: rating,
    };

    //validate request object
    const validation = commentSchema.safeParse(request);
    if (!validation.success) {
      setFieldErrors(validation.error.formErrors.fieldErrors);
      return;
    }

    const res = await UploadComment(foodId, request);
    if (res.error) {
      showErrorToast(res.error);
    }
    if (res.message) {
      handleAfterComment && handleAfterComment();
      showSuccessToast(res.message);
      resetForm();
    }
  };

  return (
    <form action={clientAction} className="flex flex-col gap-6 mb-8">
      <Input
        placeholder="Title"
        className="mt-1 py-2 px-2 w-full rounded-lg border focus:border-blue-500 outline-0"
        value={watch("title")}
        errorMessages={
          fieldErrors && fieldErrors.title ? fieldErrors.title[0] : ""
        }
        {...register("title")}
      />
      <TextArea
        placeholder="Your comment"
        className="mt-1 py-2 px-2 w-full rounded-lg resize-none border focus:border-blue-500 outline-0"
        value={watch("content")}
        errorMessages={
          fieldErrors && fieldErrors.content ? fieldErrors.content[0] : ""
        }
        {...register("content")}
      />
      <div className="mb-6 flex justify-between items-center">
        <Rating
          SVGclassName={"inline-block"}
          onClick={handleRatingChange}
          initialValue={rating}
        />
        <Button
          type="submit"
          className="w-52 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
