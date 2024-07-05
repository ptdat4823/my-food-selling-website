import { ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import {
  DeleteImage,
  DeleteImages,
  UploadImage,
} from "../actions/image-upload";
import { Food } from "../models/Food";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const displayNumber = (
  number: number,
  unit: "%" | string = "",
  spaceBetweenNumAndUnit: boolean = false,
  maximumFractionDigits: number = 2
) => {
  if (isNaN(number)) return "$0.00";
  if (unit === "%") {
    if (number < 1000)
      return (
        number.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
        (spaceBetweenNumAndUnit ? " " : "") +
        unit
      );

    return (
      number.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) +
      (spaceBetweenNumAndUnit ? " " : "") +
      unit
    );
  }

  if (unit === "$")
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: maximumFractionDigits,
    });

  return (
    number.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    }) +
    (spaceBetweenNumAndUnit ? " " : "") +
    unit
  );
};

type DateType = "date" | "datetime" | "time";
const formatDate = (date: Date, type: DateType = "date") => {
  const convertDate = new Date(date);
  if (!convertDate) return "";
  if (type === "date") return format(convertDate, "MM/dd/yyyy");
  if (type === "datetime") return format(convertDate, "MM/dd/yyyy hh:mm a");
  return format(convertDate, "hh:mm a");
};

function handleFilterColumn<T>(
  filterInput: string,
  col: string,
  listToFilter: Array<T>
): Array<T> {
  if (filterInput === "") return listToFilter;
  const filter = filterInput.toLowerCase();
  const filterList = listToFilter.filter((row) => {
    const value = row[col as keyof typeof row];
    if (value === null || value === undefined) return false;
    if (typeof value === "string") {
      if (!value.toLowerCase().includes(filter)) return false;
    }
    if (typeof value === "number") {
      if (!value.toString().includes(filter)) return false;
    }
    return true;
  });
  return filterList;
}

function isValidPhoneNumberInput(phoneNumber: string): boolean {
  const regex = /^[0-9]{0,10}$/;
  return regex.test(phoneNumber);
}

function removeCharNAN(str: string): string {
  const regex = /[^0-9.]/g;
  return str.replace(regex, "");
}

function addCommatoStringNumber(strNum: string): string {
  // Split the value into integer and fractional parts
  let parts = strNum.split(".");
  let integerPart = parts[0];
  let fractionalPart = parts.length > 1 ? parts[1] : "";

  // Add commas to the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the integer and fractional parts
  if (fractionalPart) return `${integerPart}.${fractionalPart}`;
  else return integerPart;
}

const getAllMonthLabels = (fromMonth: number = 1, toMonth: number = 12) => {
  const monthLabels: string[] = [];
  Array.from({ length: toMonth - fromMonth + 1 }, (_, i) => {
    monthLabels.push(format(new Date(0, i + fromMonth - 1), "MMM"));
  });
  return monthLabels;
};

const getMonthLabel = (month: number) => {
  return format(new Date(0, month - 1), "MMMM");
};

const getColorList = () => {
  //return some main colors that easy to see
  return [
    "#fcd34d",
    "#fca5a5",
    "#fdba74",
    "#bef264",
    "#86efac",
    "#67e8f9",
    "#5eead4",
    "#c4b5fd",
    "#a5b4fc",
    "#fda4af",
    "#f0abfc",
  ];
};

const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateKey = (prefix: string = "", length: number = 10) => {
  let key = prefix;
  for (let i = 0; i < length; i++) {
    key += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return key;
};

const isValidString = (data: string | null | undefined) => {
  if (data === null || data === undefined || data.length === 0) return false;
  return true;
};

//http://res.cloudinary.com/dggtc5ucv/image/upload/v1720082993/jlqkd6dqyx4mrbsqhe31.jpg
const getPublicIdFromCloudinaryUrl = (url: string) => {
  const parts = url.split("/");
  const publicId = parts[parts.length - 1].split(".")[0];
  return publicId;
};

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await UploadImage(formData);
};

const deleteImage = async (imageUrl: string) => {
  const publicId = getPublicIdFromCloudinaryUrl(imageUrl);
  return await DeleteImage(publicId);
};

const deleteImages = async (imageUrls: string[]) => {
  const publicIds = imageUrls.map((url) => getPublicIdFromCloudinaryUrl(url));
  return await DeleteImages(publicIds);
};

const getActiveFood = (foods: Food[]) => {
  return foods.filter((food) => !food.isDeleted && food.name !== null);
};

export {
  cn,
  displayNumber,
  formatDate,
  handleFilterColumn,
  isValidPhoneNumberInput,
  removeCharNAN,
  addCommatoStringNumber,
  getColorList,
  getMonthLabel,
  getAllMonthLabels,
  generateKey,
  isValidString,
  uploadImage,
  deleteImage,
  deleteImages,
  getPublicIdFromCloudinaryUrl,
  getActiveFood,
};
