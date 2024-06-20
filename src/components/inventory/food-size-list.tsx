import {
  addCommatoStringNumber,
  cn,
  displayNumber,
  removeCharNAN,
} from "@/src/utils/func";

interface Props {
  sizeName: string;
  price: number;
  weight: number;
  note: string;
  onSizeNameChanged: (val: string) => void;
  onWeightChanged: (val: string) => void;
  onPriceChanged: (val: string) => void;
  onNoteChanged: (val: string) => void;
  onRemoveClick: () => void;
  errors?: any;
  isFormSubmitted: boolean;
}
export const FoodSizeList = ({
  sizeName,
  price,
  weight,
  note,
  onSizeNameChanged,
  onWeightChanged,
  onPriceChanged,
  onNoteChanged,
  onRemoveClick,
  errors,
  isFormSubmitted,
}: Props) => {
  return (
    <div className="relative px-2 text-[0.85rem] py-4 pb-6 rounded-md bg-white shadow-lg">
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-4 justify-between">
          <div className="relative flex flex-row items-baseline">
            <p
              className={cn(
                "w-[80px] font-semibold",
                errors && errors["sizeName"] && isFormSubmitted
                  ? "text-red-500"
                  : ""
              )}
            >
              Size name
            </p>
            <input
              type="text"
              value={sizeName}
              onChange={(e) => onSizeNameChanged(e.target.value)}
              placeholder="Size name"
              className="border-b border-slate-400 outline-none p-1 pb-0 text-end max-w-44 bg-inherit flex-1 focus:border-primary"
            />
            <span className="absolute top-full w-full text-red-500 text-end text-xs">
              {errors && errors["sizeName"] && isFormSubmitted
                ? errors["sizeName"].message
                : null}
            </span>
          </div>
          <div className="relative flex flex-row items-end">
            <p
              className={cn(
                "w-[80px] font-semibold",
                errors && errors["price"] && isFormSubmitted
                  ? "text-red-500"
                  : ""
              )}
            >
              Price
            </p>
            <input
              type="text"
              placeholder="0"
              defaultValue={price > 0 ? displayNumber(price) : ""}
              onChange={(e) => {
                const strNum = removeCharNAN(e.target.value);

                //detect stranger character
                if (strNum.length === 0) {
                  e.target.value = "";
                  return;
                }

                //if the number is valid, send to the parent
                if (strNum.charAt(strNum.length - 1) !== ".") {
                  onPriceChanged(strNum);
                }

                //detect second "."
                if (strNum.charAt(strNum.length - 1) === ".") {
                  if (strNum.split(".").length > 2) {
                    e.target.value = strNum.slice(0, -1);
                    return;
                  }
                }

                //format the input
                if (strNum.charAt(strNum.length - 1) === ".") {
                  if (strNum.split(".").length <= 2) e.target.value = strNum;
                } else {
                  e.target.value = addCommatoStringNumber(strNum);
                }
              }}
              className="border-b border-slate-400 outline-none p-1 pb-0 pr-2 text-end max-w-44 bg-inherit flex-1 focus:border-primary"
            />
            <span className="absolute right-0 pb-[1px] pointer-events-none">
              $
            </span>
            <span className="absolute top-full w-full text-red-500 text-end text-xs">
              {errors && errors["price"] && isFormSubmitted
                ? errors["price"].message
                : null}
            </span>
          </div>

          <div className="relative flex flex-row items-end">
            <p
              className={cn(
                "w-[80px] font-semibold",
                errors && errors["weight"] && isFormSubmitted
                  ? "text-red-500"
                  : ""
              )}
            >
              Weight
            </p>
            <input
              value={weight > 0 ? displayNumber(weight) : ""}
              type="text"
              placeholder="0"
              onChange={(e) => onWeightChanged(removeCharNAN(e.target.value))}
              className="border-b border-slate-400 outline-none p-1 pb-0 pr-2 text-end max-w-44 bg-inherit flex-1 focus:border-primary"
            />
            <span className="absolute right-0 pb-[1px] pointer-events-none">
              g
            </span>
            <span className="absolute top-full w-full text-red-500 text-end text-xs">
              {errors && errors["weight"] && isFormSubmitted
                ? errors["weight"].message
                : null}
            </span>
          </div>
        </div>
        <textarea
          placeholder="Note"
          value={note}
          onChange={(e) => onNoteChanged(e.target.value)}
          className="border-slate-400 rounded-md p-1 resize-none flex-1 min-h-full border bg-inherit scrollbar small-scrollbar outline-none focus:border-primary"
        />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1rem"
        height="1rem"
        viewBox="0 0 24 24"
        className="absolute right-[0.125rem] top-[0.125rem] rounded-full translate-x-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemoveClick();
        }}
      >
        <path
          fill="black"
          d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
        />
      </svg>
    </div>
  );
};
