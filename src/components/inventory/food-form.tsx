"use client";

import {
  FoodFormDataToFood,
  FoodToReceive,
  FoodToSend,
} from "@/src/convertor/foodConvertor";
import { Food, FoodCategory, FoodStatus } from "@/src/models/Food";
import { useAppDispatch } from "@/src/redux/hooks";
import { addFood, updateFood } from "@/src/redux/slices/food";
import FoodService from "@/src/services/foodService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import * as z from "zod";
import { showErrorToast, showSuccessToast } from "../ui/toast";
import {
  CategoryInput,
  DefaultInput,
  DescriptionInput,
  ImagesInput,
  StatusInput,
  TagsInput,
} from "./custom-input";
import { FoodSizeList } from "./food-size-list";
import { Button } from "../ui/button";
import { CreateFoodAction, UpdateFoodAction } from "@/src/actions/inventory";

export type FoodFormData = {
  name: string;
  status: string;
  category: string;
  images: (string | null)[];
  sizes: {
    id?: number;
    sizeName: string;
    price: number;
    weight: number;
    note: string;
  }[];
  description: string;
  tags: string[];
};

const foodSchema: z.ZodType<FoodFormData> = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is missing!" })
    .max(100, { message: "Name must be at most 100 characters!" }),
  status: z.string(),
  category: z.string(),
  images: z
    .array(z.string())
    .min(1, { message: "Please add one image about this food" })
    .max(5),
  sizes: z
    .array(
      z.object({
        id: z.number().optional(),
        sizeName: z
          .string({ required_error: "Missing size name" })
          .min(1, { message: "Missing size name" })
          .max(100, { message: "Size name must be less than 100" }),
        price: z
          .number({
            required_error: "Missing price!",
            invalid_type_error: "Missing price!",
          })
          .min(1, { message: "Price must be at least 1" })
          .max(Number.MAX_VALUE, {
            message: `Price must be less than ${Number.MAX_VALUE}`,
          }),
        weight: z
          .number({
            required_error: "Missing weight!",
            invalid_type_error: "Missing weight!",
          })
          .min(1, { message: "Weight must be at least 1" })
          .max(Number.MAX_VALUE, {
            message: `Weight must be less than ${Number.MAX_VALUE}`,
          }),
        note: z.string(),
      })
    )
    .min(1, { message: "Please add at least one size" }),
  description: z.string(),
  tags: z.array(z.string()),
});

export const FoodForm = ({
  closeForm,
  categories,
  food,
}: {
  food?: Food;
  closeForm: () => any;
  categories: FoodCategory[];
}) => {
  const dispatch = useAppDispatch();

  const [chosenImageFiles, setChosenImageFiles] = useState<File[]>([]);
  const [isUploadingFood, setIsUploadingFood] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const form = useForm<z.infer<typeof foodSchema>>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      status: "true",
      images: [],
      sizes: [
        {
          id: 0,
          sizeName: "",
          price: 0,
          weight: 0,
          note: "",
        },
      ],
      description: "",
      category: undefined,
      tags: [],
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
    watch,
  } = form;

  const setInitialValues = () => {
    if (food) {
      console.log("food: ", food);
      setValue("name", food.name);
      setValue("status", food.status === FoodStatus.ACTIVE ? "true" : "false");
      setValue("category", food.category.name);
      setValue("images", food.images);
      setValue(
        "sizes",
        food.foodSizes.map((size) => {
          return {
            id: size.id,
            sizeName: size.name,
            price: size.price,
            weight: size.weight,
            note: size.note,
          };
        })
      );
      setValue("description", food.description);
      setValue("tags", food.tags);
    }
  };

  useEffect(() => {
    if (food) setInitialValues();
  }, []);

  // if newFileUrl == null, it means the user removed image
  const handleImageChosen = (newFileUrl: File | null, index: number) => {
    const newChosenImageFiles = [...chosenImageFiles];
    if (newFileUrl === null) newChosenImageFiles.splice(index, 1);
    else newChosenImageFiles.push(newFileUrl);
    setChosenImageFiles(newChosenImageFiles);

    const newImages = [...watch("images")];
    if (newFileUrl) newImages.push(URL.createObjectURL(newFileUrl));
    else newImages.splice(index, 1);
    setValue("images", newImages);
  };

  const onSubmit = async (values: FoodFormData) => {
    const selectedCategory = categories.find(
      (cat: any) => cat.name === values.category
    );
    const newFood = FoodFormDataToFood(values, selectedCategory!);
    const foodToSend = FoodToSend(newFood);
    const dataForm: any = new FormData();
    dataForm.set(
      "data",
      new Blob([JSON.stringify(foodToSend)], { type: "application/json" })
    );
    chosenImageFiles
      .filter((file) => file != null)
      .forEach((imageFile) => dataForm.append("files", imageFile));
    setIsUploadingFood(true);

    if (food) {
      const res = await UpdateFoodAction(food.id, dataForm);
      if (res.error) {
        showErrorToast(res.error);
      }
      if (res.message) {
        closeForm();
        showSuccessToast(res.message);
      }
      setIsUploadingFood(false);
      // await FoodService.updateFood(food.id, dataForm)
      //   .then((result) => {
      //     const updatedFood = FoodToReceive(result.data);
      //     dispatch(updateFood(updatedFood));
      //     showSuccessToast("Food updated successfully");
      //   })
      //   .catch((e) => console.error(e))
      //   .finally(() => {
      //     setIsUploadingFood(false);
      //     closeForm();
      //   });
    } else {
      const res = await CreateFoodAction(dataForm);
      if (res.error) {
        showErrorToast(res.error);
      }
      if (res.message) {
        closeForm();
        showSuccessToast(res.message);
      }
      setIsUploadingFood(false);
      // await FoodService.createNewFood(dataForm)
      //   .then((result) => {
      //     const newFood = FoodToReceive(result.data);
      //     dispatch(addFood(newFood));
      //     showSuccessToast("New food added successfully");
      //   })
      //   .catch((e) => console.error(e))
      //   .finally(() => {
      //     setIsUploadingFood(false);
      //     closeForm();
      //   });
    }
  };

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-[50] flex items-center justify-center bg-black bg-opacity-30">
      <div
        className={
          "flex max-h-[95%] w-[95%] max-w-[600px] flex-col overflow-y-auto rounded-md bg-white p-4 default-scrollbar"
        }
      >
        <div className="mb-4 flex flex-row items-center justify-between">
          <h3 className="text-base font-semibold">
            {food ? "Update food" : "Add new food"}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.25rem"
            height="1.25rem"
            viewBox="0 0 24 24"
            className="hover:cursor-pointer"
            onClick={closeForm}
          >
            <path
              fill="black"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
            />
          </svg>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex h-full w-full flex-col gap-4">
            <DefaultInput
              label="name"
              register={register}
              required
              placeholder="Food name"
              error={errors.name}
            />
            <StatusInput
              label="status"
              register={register}
              required
              error={errors.status}
            />
            <CategoryInput
              value={watch("category")}
              categories={categories}
              onValueChanged={(val) => {
                if (val) setValue("category", val);
                else resetField("category");
              }}
              {...register("category", { required: true })}
              error={errors.category}
            />
            <TagsInput
              value={watch("tags")}
              onValueChanged={(vals) => {
                if (vals) setValue("tags", vals);
                else resetField("tags");
              }}
              error={errors.tags ? errors.tags[0] : undefined}
            />
            <ImagesInput
              fileUrls={watch("images")}
              onImageChanged={handleImageChosen}
              {...register("images", { required: true })}
              error={errors.images as FieldError}
            />
            <DescriptionInput
              label="description"
              register={register}
              required
              error={errors.description}
            />
            <div className="flex flex-col rounded overflow-hidden">
              <div className="bg-gray-200 hover:bg-gray-100 p-3 text-sm w-full">
                <div className="flex flex-row items-center gap-10">
                  <p>Food variants</p>
                  {errors && errors.sizes ? (
                    <p className="text-xs text-red-500">
                      {errors.sizes.message}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="border p-4">
                <div className="flex flex-col gap-4">
                  {watch("sizes").map((value, index) => {
                    const fieldValue = watch("sizes");
                    return (
                      <FoodSizeList
                        key={index}
                        sizeName={value.sizeName}
                        price={value.price}
                        weight={value.weight}
                        note={value.note}
                        errors={errors.sizes ? errors.sizes[index] : undefined}
                        onSizeNameChanged={(val: string) => {
                          fieldValue[index].sizeName = val;
                          setValue("sizes", [...fieldValue], {
                            shouldValidate: true,
                          });
                        }}
                        onPriceChanged={(val: string) => {
                          fieldValue[index].price = parseFloat(val);
                          setValue("sizes", [...fieldValue], {
                            shouldValidate: true,
                          });
                        }}
                        onWeightChanged={(val: string) => {
                          fieldValue[index].weight = parseFloat(val);
                          setValue("sizes", [...fieldValue], {
                            shouldValidate: true,
                          });
                        }}
                        onNoteChanged={(val: string) => {
                          fieldValue[index].note = val;
                          setValue("sizes", [...fieldValue], {
                            shouldValidate: true,
                          });
                        }}
                        onRemoveClick={() => {
                          setValue("sizes", fieldValue.toSpliced(index, 1), {
                            shouldValidate: false,
                          });
                        }}
                        isFormSubmitted={isFormSubmitted}
                      />
                    );
                  })}
                </div>
                <Button
                  type="button"
                  className="w-auto mt-4 h-[35px] border bg-green-500 hover:bg-green-600 text-white px-2 text-sm rounded-md"
                  onClick={(e) => {
                    e.preventDefault();

                    const newSize = {
                      sizeName: "",
                      price: 0,
                      weight: 0,
                      note: "",
                    };

                    setValue("sizes", [...watch("sizes"), newSize]);
                  }}
                >
                  Add size
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-4">
            <div className="flex-1" />
            <Button
              type="submit"
              className="w-[100px] px-4 text-white"
              disabled={isUploadingFood}
              onClick={() => {
                console.log("submitting", form.getValues());
                console.log("submitting error", errors);
                setIsFormSubmitted(true);
              }}
            >
              {food ? "Update" : "Add"}
            </Button>
            <Button
              type="button"
              className="w-[100px] bg-gray-400 px-4 hover:bg-gray-500 disabled:bg-gray-400/60"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                closeForm();
              }}
              disabled={isUploadingFood}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
