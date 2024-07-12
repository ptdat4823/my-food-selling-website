import { cn } from "@/src/utils/func";
import { Tooltip } from "@nextui-org/react";
import { ClassValue } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingCircle from "../icons/custom-with-css/LoadingCircle/loading_circle";

export const SidebarLink = ({
  className,
  href = "#",
  icon,
  content,
  isSidebarOpen,
  notification,
}: {
  className?: ClassValue;
  href?: string;
  content: string;
  icon?: ReactNode;
  isSidebarOpen: boolean;
  notification?: number;
}) => {
  return (
    <div>
      {isSidebarOpen ? (
        <CustomLink
          href={href}
          notification={notification}
          icon={icon}
          content={content}
          className={className}
        />
      ) : (
        <Tooltip
          content={<span className="px-2">{content}</span>}
          closeDelay={0}
          placement="right"
          className={cn(
            "text-white font-sans px-1 border-0 rounded-[999px]",
            content === "Log out" ? "bg-red-400" : "bg-blue-500"
          )}
        >
          <CustomLink
            href={href}
            notification={notification}
            icon={icon}
            content={content}
            className={className}
          />
        </Tooltip>
      )}
    </div>
  );
};

const CustomLink = ({
  href,
  notification,
  icon,
  content,
  className,
}: {
  href: string;
  notification?: number;
  icon?: ReactNode;
  content: string;
  className?: ClassValue;
}) => {
  const path = usePathname();
  const [isChangeingPath, setIsChangeingPath] = useState(false);
  useEffect(() => {
    setIsChangeingPath(false);
  }, [path]);
  return (
    <Link
      href={href}
      className={cn(
        "min-w-10 flex flex-row items-center gap-2 justify-start p-2 text-white whitespace-nowrap overflow-hidden rounded-md transition-all cursor-pointer",
        path.startsWith(href) ? "bg-blue-600" : "hover:bg-white/10",
        className
      )}
      onClick={() => {
        if (href !== path) setIsChangeingPath(true);
      }}
    >
      <div
        className={cn(
          "relative shrink-0 w-6 flex items-center justify-center",
          isChangeingPath && "hidden"
        )}
      >
        <span
          className={cn(
            "absolute -right-1.5 -top-1 w-4 h-4 rounded-full shrink-0 text-xs bg-red-600 text-white flex items-center justify-center",
            notification ? "" : "hidden"
          )}
        >
          {notification && notification > 0 && notification}
        </span>
        <span>{icon}</span>
      </div>

      {isChangeingPath && (
        <div className="w-6 flex items-center justify-center">
          <LoadingCircle color="white" />
        </div>
      )}
      <span className={cn("w-fit font-sans font-semibold text-nowrap")}>
        {content}
      </span>
    </Link>
  );
};
