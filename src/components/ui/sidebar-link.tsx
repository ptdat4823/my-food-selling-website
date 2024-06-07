import { cn } from "@/src/utils/func";
import { Tooltip } from "@nextui-org/react";
import { ClassValue } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

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
          isSidebarOpen={isSidebarOpen}
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
            isSidebarOpen={isSidebarOpen}
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
  isSidebarOpen,
}: {
  href: string;
  notification?: number;
  icon?: ReactNode;
  content: string;
  className?: ClassValue;
  isSidebarOpen: boolean;
}) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "w-full flex flex-row items-center gap-4 justify-start whitespace-nowrap p-2 text-white rounded-md transition-all cursor-pointer",
        path === href ? "bg-blue-600" : "hover:bg-white/10",
        className
      )}
    >
      <div className="relative">
        <div
          className={cn(
            "absolute -right-1.5 -top-1 w-4 h-4 rounded-full shrink-0 text-xs bg-red-600 text-white flex items-center justify-center",
            notification ? "" : "hidden"
          )}
        >
          {notification && notification > 0 && notification}
        </div>
        {icon}
      </div>
      <span
        className={cn(
          "w-fit font-sans font-semibold ease-linear duration-500 opacity-100",
          !isSidebarOpen && "hidden"
        )}
      >
        {content}
      </span>
    </Link>
  );
};
