import { ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

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

export {
  cn,
  displayNumber,
  formatDate,
  handleFilterColumn,
  isValidPhoneNumberInput,
  removeCharNAN,
  addCommatoStringNumber,
};
