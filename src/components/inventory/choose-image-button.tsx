"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { nanoid } from "nanoid";
import { ClassValue } from "clsx";
import { showWarningToast } from "../ui/toast";
import { cn } from "@/src/utils/func";
import { X } from "lucide-react";
import { CldImage } from "next-cloudinary";
import LoadingCircle from "../icons/custom-with-css/LoadingCircle/loading_circle";

export const ChooseImageButton = ({
  fileUrl,
  onImageChanged,
  className,
}: {
  fileUrl: string | null;
  onImageChanged: (file: File | null) => Promise<void>;
  className?: ClassValue;
}) => {
  const id = nanoid();
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files[0].size < 1000000
    ) {
      setIsLoading(true);
      onImageChanged(e.target.files[0]).finally(() => setIsLoading(false));
    } else {
      showWarningToast("Image size should be less than 1MB");
    }
  }

  return (
    <div className="w-fit h-fit relative">
      <div
        className={cn(
          "w-[100px] h-[80px] border border-dashed relative overflow-hidden rounded-md select-none",
          className
        )}
      >
        {!fileUrl || fileUrl.length === 0 ? (
          <>
            {isLoading ? (
              <div className="absolute top-0 left-0 right-0 flex items-center justify-center w-full h-full cursor-default bg-gray-200 ease-linear duration-100">
                <LoadingCircle />
              </div>
            ) : (
              <label
                htmlFor={id}
                className="absolute top-0 left-0 flex items-center justify-center w-full h-full hover:cursor-pointer text-gray-600 dark:text-dark-secondary-word"
              >
                + Image
              </label>
            )}
            <input
              id={id}
              type="file"
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
          </>
        ) : (
          <CldImage
            width={0}
            height={0}
            sizes="100vw"
            src={fileUrl!}
            alt="image"
            className="w-full h-full"
          />
        )}
      </div>
      {fileUrl && fileUrl.length > 0 && (
        <div
          className="absolute -right-[0.5rem] -top-[0.5rem] rounded-full bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onImageChanged(null);
          }}
        >
          <X className="w-4 h-4 cursor-pointer text-black hover:text-red-500 transition-all" />
        </div>
      )}
    </div>
  );
};
