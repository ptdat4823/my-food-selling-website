"use client";
import default_user_image from "@/public/images/default_user.png";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import { Camera, ImageMinus } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import LoadingCircle from "../icons/custom-with-css/LoadingCircle/loading_circle";
import { showWarningToast } from "../ui/toast";

export const ChooseAvatarButton = ({
  className,
  fileUrl,
  onImageChanged,
  isLoading,
}: {
  className?: ClassValue;
  fileUrl: string | null;
  onImageChanged: (file: File | null) => void;
  isLoading: boolean;
}) => {
  const [imageValue, setImageValue] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files[0].size < 1000000
    ) {
      setImageValue(e.target.value);
      onImageChanged(e.target.files[0]);
    } else {
      showWarningToast("Image size should be less than 1MB");
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!fileUrl) {
      setImageValue("");
    }
  }, [fileUrl]);

  return (
    <div
      className={cn(
        "w-[120px] h-[120px] relative border-none select-none flex items-center justify-center rounded-full overflow-hidden",
        className
      )}
    >
      <>
        {isLoading ? (
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center w-full h-full cursor-default bg-gray-200/60 ease-linear duration-100">
            <LoadingCircle className="!w-6 !h-6" />
          </div>
        ) : (
          <label
            htmlFor="user-avatar-input"
            className="absolute top-0 left-0 right-0 flex flex-row items-center justify-center w-full h-full cursor-pointer bg-gray-200/60 text-white opacity-0 hover:opacity-100 ease-linear duration-100"
          >
            <div
              className="h-full w-1/2 flex items-center justify-center hover:bg-gray-200/20 ease-linear duration-100"
              onClick={(e) => {
                e.preventDefault();
                onImageChanged(null);
              }}
            >
              <ImageMinus />
            </div>
            <div className="h-full w-1/2 flex items-center justify-center hover:bg-gray-200/20 ease-linear duration-100">
              <Camera />
            </div>
          </label>
        )}
        <input
          ref={inputRef}
          id="user-avatar-input"
          type="file"
          value={imageValue || ""}
          onChange={handleChange}
          className="hidden"
          accept="image/*"
        />

        {!fileUrl || fileUrl.length === 0 ? (
          <>
            <Image
              src={default_user_image}
              width={900}
              height={900}
              alt="user avatar"
              className="w-full h-full flex-shrink-0 object-cover overflow-hidden cursor-pointer"
            />
          </>
        ) : (
          <CldImage
            width={0}
            height={0}
            sizes="100vw"
            src={fileUrl!}
            alt="image"
            className="w-full h-full flex-shrink-0 object-cover overflow-hidden cursor-pointer"
          />
        )}
      </>
    </div>
  );
};
