"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import LoadingCircle from "../icons/custom-with-css/LoadingCircle/loading_circle";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { showErrorToast } from "../ui/toast";
import { CirclePlus } from "lucide-react";
import { ChooseImageButton } from "./choose-image-button";
import { deleteImages, uploadImage } from "@/src/utils/func";

export type NewCategoryFormData = {
  name: string;
};

const schema: ZodType<NewCategoryFormData> = z.object({
  name: z.string().min(1),
});

const NewCategoryModal = ({
  onAddClick,
}: {
  onAddClick: (value: string, image: File | null) => Promise<any>;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [oldFileUrls, setOldFileUrls] = useState<string[]>([]);

  const form = useForm<NewCategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: undefined },
  });
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = form;

  const handleFormSubmit = async (data: NewCategoryFormData) => {
    setIsLoading(true);
    await onAddClick(data.name, image)
      .then(() => {
        resetValues();
        deleteOldImages(oldFileUrls);
        onOpenChange();
      })
      .catch((e) => {
        showErrorToast(e.message);
      })
      .finally(() => setIsLoading(false));
  };

  const resetValues = () => {
    resetField("name");
    setImage(null);
    setFileUrl(null);
  };

  // if newFileUrl == null, it means the user removed image
  const handleImageChosen = async (newFileUrl: File | null) => {
    if (newFileUrl) {
      //upload image to cloudinary
      const res = await uploadImage(newFileUrl);
      if (res.error) {
        showErrorToast(res.error);
        return;
      }
      if (res.message) {
        //update images in form
        setFileUrl(res.data.url);
      }
    } else {
      //save old image url to delete later if user submit form
      if (fileUrl) setOldFileUrls([...oldFileUrls, fileUrl]);

      //update images in form
      setFileUrl(null);
    }
  };

  const deleteOldImages = async (oldImageUrls: string[]) => {
    //delete image in cloudinary
    if (oldImageUrls.length > 0) {
      const res = await deleteImages(oldImageUrls);
      if (res.errors) {
        res.errors.forEach((error) => showErrorToast(error));
      }
    }
  };
  return (
    <form>
      <div>
        <CirclePlus
          className="w-4 h-4 mx-2 text-black dark:text-white hover:cursor-pointer"
          onClick={onOpen}
        />
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="text-black dark:text-dark-primary-word dark:bg-dark-secondary-bg rounded-md font-sans"
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  New category
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-row gap-4">
                    <ChooseImageButton
                      fileUrl={fileUrl}
                      onImageChanged={handleImageChosen}
                    />
                    <div className="w-full mb-[2px] flex flex-col justify-end gap-3 text-sm">
                      <Input
                        id="category_name"
                        label="Category name"
                        placeholder="Category name"
                        errorMessages={
                          errors.name ? errors.name.message?.toString() : ""
                        }
                        {...register("name")}
                        className="flex-1 rounded-sm border p-1"
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="button"
                    onClick={() => {
                      handleSubmit(handleFormSubmit)();
                    }}
                    className="!h-[35px] w-[100px] bg-green-400 text-white hover:bg-green-500 dark:hover:bg-green-500 rounded gap-2"
                    disabled={isLoading}
                    iconAfter={
                      isLoading ? <LoadingCircle color="white" /> : null
                    }
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    className={
                      "!h-[35px] w-[100px] border-none rounded px-2text-white bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
                    }
                    disabled={isLoading}
                    onClick={() => {
                      resetValues();
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </form>
  );
};

// const ChooseImageButton = ({
//   fileUrl,
//   setFileUrl,
//   onFileChosen,
// }: {
//   fileUrl: string | null;
//   setFileUrl: (url: string | null) => void;
//   onFileChosen: (file: File | null) => void;
// }) => {
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFileUrl(URL.createObjectURL(e.target.files[0]));
//       onFileChosen(e.target.files[0]);
//     }
//   };

//   return (
//     <div className="w-[100px] h-[80px] relative border rounded-sm shrink-0">
//       {!fileUrl || fileUrl.length === 0 ? (
//         <>
//           <label
//             htmlFor={"new_category_image"}
//             className="absolute top-0 left-0 flex items-center justify-center w-full h-full hover:cursor-pointer text-opacity-90"
//           >
//             + Image
//           </label>
//           <input
//             id={"new_category_image"}
//             type="file"
//             onChange={handleFileChange}
//             className="hidden"
//             accept="image/*"
//           />
//         </>
//       ) : (
//         <>
//           <Image
//             width={100}
//             height={100}
//             sizes="100px"
//             src={fileUrl!}
//             alt="image"
//             className="w-full h-full"
//           />
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="1rem"
//             height="1rem"
//             className="absolute top-[-8px] right-[-8px] hover:cursor-pointer"
//             onClick={(e) => {
//               e.stopPropagation();
//               onFileChosen(null);
//               setFileUrl(null);
//             }}
//             viewBox="0 0 24 24"
//           >
//             <path
//               fill="black"
//               d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
//             />
//           </svg>
//         </>
//       )}
//     </div>
//   );
// };

export default NewCategoryModal;
