import { cn } from "@/src/utils/func";

export const RowInfo = ({
  label,
  value,
  showTextArea = false,
}: {
  label: string;
  value: string;
  showTextArea?: boolean;
}) => {
  return (
    <>
      {showTextArea ? (
        <div className="text-wrap">
          <div
            className={cn(
              "h-fit w-full rounded-md resize-none border-0 py-1 px-2 text-primaryWord",
              value && value.length > 0 ? "bg-yellow-100" : "bg-gray-200 "
            )}
          >
            <b>{label}</b>
            <br />
            <div
              className={cn(
                value && value.length > 0 ? "" : "italic text-secondaryWord"
              )}
            >
              {value && value.length > 0
                ? value.split("\n").map((str, i) => <p key={i}>{str}</p>)
                : "Empty"}
            </div>
          </div>
        </div>
      ) : (
        <div className={cn("mb-2 text-md flex flex-row border-b")}>
          <label className={cn("w-[120px] font-semibold")}>{label}</label>
          <p className={cn("w-[300px] truncate")}>{value}</p>
        </div>
      )}
    </>
  );
};
