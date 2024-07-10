import { twMerge } from "tailwind-merge";
import style from "./loading_circle_style.module.css";

const LoadingCircle = ({
  className,
  color = "green",
}: {
  className?: string;
  color?: "green" | "blue" | "orange" | "white";
}) => {
  let colorHex = "#70c542";
  if (color === "blue") colorHex = "#4a90e2";
  else if (color === "orange") colorHex = "#f5a623";
  else if (color === "white") colorHex = "#ffffff";

  return (
    <div
      className={twMerge(style["profile-main-loader"], "!w-4 !h-4", className)}
    >
      <div className={style["loader"]}>
        <svg className={style["circular-loader"]} viewBox="25 25 50 50">
          <circle
            className={style["loader-path"]}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke={colorHex}
            strokeWidth="5"
          />
        </svg>
      </div>
    </div>
  );
};

export default LoadingCircle;
