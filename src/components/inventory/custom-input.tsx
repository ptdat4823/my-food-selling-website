import { FoodCategory, FoodStatus } from "@/src/models/Food";
import { cn } from "@/src/utils/func";
import { ClassValue } from "clsx";
import { X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { FieldError, Path, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";
import SearchAndChooseButton from "../ui/search-and-choose-button";
import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from "../ui/toast";
import { ChooseImageButton } from "./choose-image-button";
import { FoodFormData } from "./food-form";
import NewCategoryModal from "./new-category-modal";
import { CreateCategory } from "@/src/actions/category";

type InputProps = {
  label: Path<FoodFormData>;
  register: UseFormRegister<FoodFormData>;
  required: boolean;
  error?: FieldError;
  placeholder?: string;
};

const ErrorMessage = ({ error }: { error?: FieldError }) => {
  return error && error.message ? (
    <p className="text-xs text-red-500">{error.message}</p>
  ) : null;
};

const LabelInput = ({
  label,
  error,
  className,
}: {
  label: string;
  error?: FieldError;
  className?: ClassValue;
}) => {
  return (
    <div className={cn("w-[150px] shrink-0", className)}>
      <label htmlFor={label} className="w-[150px] text-sm font-medium">
        {label.length > 0
          ? label[0].toUpperCase() + label.slice(1, label.length)
          : ""}
      </label>
      <ErrorMessage error={error} />
    </div>
  );
};

const DefaultInput = ({
  label,
  register,
  required,
  error,
  placeholder,
}: InputProps) => {
  const id = useId();
  return (
    <div className="flex flex-row w-full items-center h-10">
      <LabelInput label={label} error={error} />
      <Input
        id={id}
        className="flex h-10 outline-1 rounded-md px-2"
        placeholder={placeholder}
        {...register(label, { required })}
      />
    </div>
  );
};

const DescriptionInput = ({ label, register, required, error }: InputProps) => {
  const id = useId();
  return (
    <>
      <textarea
        id={id}
        {...register(label, { required })}
        className="resize-none w-full bg-transparent border border-borderColor focus:border-primary outline-none rounded-md p-2 placeholder:text-sm text-sm"
        rows={3}
        placeholder="Description"
      />
      <ErrorMessage error={error} />
    </>
  );
};

const StatusInput = ({ label, register, required, error }: InputProps) => {
  const id1 = useId();
  const id2 = useId();

  return (
    <div className="flex flex-row w-full items-center h-10">
      <LabelInput label={label} error={error} />
      <input
        id={id1}
        {...register(label, {
          required,
        })}
        type="radio"
        value={"true"}
        name={label}
        className="mr-2"
      />
      <label htmlFor={id1}>{FoodStatus.ACTIVE}</label>
      <input
        id={id2}
        {...register(label, {
          required,
        })}
        type="radio"
        value={"false"}
        name={label}
        className="ml-4 mr-2"
      />
      <label htmlFor={id2}>{FoodStatus.DISABLE}</label>
    </div>
  );
};

const CategoryInput = ({
  value,
  onValueChanged,
  error,
  categories,
}: {
  value: string;
  categories: FoodCategory[];
  onValueChanged: (value: string | null) => any;
  error?: FieldError;
}) => {
  const handleAddNewCategory = async (
    catName: string,
    imageFile: File | null
  ) => {
    const newCategory: FoodCategory = {
      id: 0,
      name: catName,
      image: "",
    };

    const dataForm = new FormData();
    dataForm.append(
      "data",
      new Blob([JSON.stringify(newCategory)], { type: "application/json" })
    );
    if (imageFile) dataForm.append("files", imageFile);
    const res = await CreateCategory(dataForm);
    if (res.error) {
      showErrorToast(res.error);
    }
    if (res.message) {
      onValueChanged(catName);
      showSuccessToast(res.message);
    }
  };

  return (
    <div className="flex flex-row items-baseline">
      <LabelInput label="Category" error={error} />
      <div className="relative !m-0 flex min-h-[40px] flex-1 flex-row items-center rounded-md border border-input">
        <div className="h-full w-full flex-1">
          <SearchAndChooseButton
            value={value}
            placeholder="---Choose category---"
            searchPlaceholder="Search category..."
            onValueChanged={onValueChanged}
            choices={categories.map((v) => v.name)}
          />
        </div>
        <NewCategoryModal onAddClick={handleAddNewCategory} />
      </div>
    </div>
  );
};
const TagsInput = ({
  value,
  onValueChanged,
  error,
}: {
  value: string[];
  onValueChanged: (value: string[]) => any;
  error?: FieldError;
}) => {
  const [curInput, setCurInput] = useState<string>("");

  return (
    <div className="flex flex-row items-baseline">
      <LabelInput label="Tags" error={error} />
      <div className="!m-0 py-1 px-2 min-h-[40px] rounded-md border flex flex-1 flex-row flex-wrap items-center gap-2 border-borderColor focus-within:border-primary">
        {value.map((keyVal, keyIdx) => (
          <div
            key={keyIdx}
            className="flex flex-row items-center gap-[2px] rounded-md bg-blue-400 p-1 text-white"
          >
            <p>{keyVal}</p>
            <X
              size={16}
              color="white"
              className="p-[2px] hover:cursor-pointer"
              onClick={(e) => onValueChanged(value.filter((v) => v !== keyVal))}
            />
          </div>
        ))}
        <input
          placeholder="Type value and enter"
          value={curInput}
          onChange={(e) => setCurInput(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (curInput.length > 0) {
                onValueChanged([...value, curInput]);
                setCurInput("");
              } else showDefaultToast("Tag name is empty");
            }
          }}
          className="h-[35px] min-w-[150px] bg-transparent flex-1 rounded-none border-0 outline-none"
        />
      </div>
    </div>
  );
};

const ImagesInput = ({
  fileUrls,
  onImageChanged,
  error,
}: {
  fileUrls: (string | null)[];
  onImageChanged: (file: File | null, index: number) => void;
  error?: FieldError;
}) => {
  const [displayFileUrls, setDisplayFileUrls] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  useEffect(() => {
    let temp: (string | null)[] = [null, null, null, null, null];
    fileUrls.forEach((fileUrl, index) => {
      temp[index] = fileUrl;
    });
    setDisplayFileUrls(temp);
  }, [fileUrls]);
  return (
    <div className="flex flex-col gap-2">
      <LabelInput label="Images" error={error} className="w-full" />
      <div className="flex flex-row w-full items-center h-20 justify-between">
        {displayFileUrls.map((fileUrl, index) => (
          <ChooseImageButton
            key={index}
            fileUrl={fileUrl}
            onImageChanged={(imageFile) => {
              onImageChanged(imageFile, index);
            }}
            className="rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export {
  CategoryInput,
  DefaultInput,
  DescriptionInput,
  ImagesInput,
  StatusInput,
  TagsInput,
};
