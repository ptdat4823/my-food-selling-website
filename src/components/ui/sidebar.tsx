"use client";

import default_user_image from "@/public/images/default_user.png";
import Logo from "@/public/images/logo.png";
import { LogOutAction } from "@/src/actions/auth";
import { User } from "@/src/models/User";
import { cn } from "@/src/utils/func";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import {
  AlignJustify,
  Heart,
  History,
  Home,
  LayoutDashboard,
  LayoutList,
  ListOrderedIcon,
  LogIn,
  LogOut,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";
import { Separate } from "./separate";
import { SidebarLink } from "./sidebar-link";
import ThemeSwitch from "./theme-switch";

interface Props {
  cartQuantity: number;
  favouriteQuantity: number;
  user: User | null;
}
export default function Sidebar({
  cartQuantity,
  favouriteQuantity,
  user,
}: Props) {
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }

  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showPopover, setShowPopover] = useState(false);

  const handleLogOut = async (e: any) => {
    e.preventDefault();
    signOut().then(() => {
      LogOutAction();
    });

    setShowPopover(false);
  };

  return (
    <div
      className={cn(
        "relative z-0 w-[72px] h-screen bg-sidebar-bg text-white transition-all duration-700 ease-in-out shrink-0",
        "dark:bg-dark-sidebar-bg",
        isSidebarOpen ? "w-[calc(72px+6rem)]" : "w-[72px]",
        "max-sm:w-[72px]"
      )}
    >
      <nav className="h-full flex flex-col gap-2 justify-between p-4 pb-8 overflow-x-visible scrollbar">
        <div className="space-y-8">
          <div className="min-w-10 flex flex-row items-center gap-1 whitespace-nowrap overflow-hidden select-none">
            <Image src={Logo} alt="logo" width={40} height={40} />
            <span
              className={cn(
                "text-nowrap font-bold font-web-name max-sm:hidden"
              )}
            >
              Fresh Mart
            </span>
          </div>

          {user && user.isAdmin ? (
            <div className="flex flex-col gap-2 mb-2">
              <SidebarLink
                href="/dashboard"
                content="Dashboard"
                icon={<LayoutDashboard />}
                isSidebarOpen={isSidebarOpen}
              />
              <SidebarLink
                href="/inventory"
                content="Inventory"
                icon={<LayoutList />}
                isSidebarOpen={isSidebarOpen}
              />

              <SidebarLink
                href="/order-management"
                content="Orders"
                icon={<ListOrderedIcon />}
                isSidebarOpen={isSidebarOpen}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <SidebarLink
                href="/home"
                content="Home"
                icon={<Home />}
                isSidebarOpen={isSidebarOpen}
              />
              <SidebarLink
                href="/cart/detail"
                content="Your cart"
                icon={<ShoppingCart />}
                isSidebarOpen={isSidebarOpen}
                notification={cartQuantity}
              />

              <SidebarLink
                href="/favourite"
                content="Favourites"
                icon={<Heart />}
                isSidebarOpen={isSidebarOpen}
                notification={favouriteQuantity}
              />

              <SidebarLink
                href="/history"
                content="History"
                icon={<History />}
                isSidebarOpen={isSidebarOpen}
              />
            </div>
          )}
        </div>
        <div className="space-y-4">
          {session && (
            <Popover
              isOpen={showPopover}
              onOpenChange={setShowPopover}
              placement="right-end"
            >
              <PopoverTrigger>
                <div className="min-w-10 shrink-0 flex flex-row gap-2 items-center hover:bg-white/10 rounded-lg p-2 cursor-pointer overflow-hidden">
                  <Image
                    width={400}
                    height={400}
                    src={default_user_image}
                    alt="image"
                    className="w-[24px] h-[24px] flex-shrink-0 rounded-full object-cover overflow-hidden cursor-pointer select-none"
                  />
                  <span className="w-[100px] h-full font-semibold shrink-0 truncate">
                    {session && session.user ? session.user.name : "Ptdat"}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent
                className={cn(
                  "font-sans text-primary-word select-none",
                  "dark:text-dark-primary-word dark:bg-dark-secondary-bg"
                )}
              >
                <div className="w-[200px] py-2 rounded-md flex flex-col">
                  <div className="flex flex-row gap-2 items-center">
                    <Image
                      width={400}
                      height={400}
                      sizes="100vw"
                      src={default_user_image}
                      alt="image"
                      className="w-[50px] h-[50px] flex-shrink-0 rounded-full object-cover overflow-hidden"
                    />
                    <span className="font-semibold">
                      {session && session.user ? session.user.name : "Ptdat"}
                    </span>
                  </div>

                  <Separate classname="my-2" />
                  <div
                    className="flex flex-row gap-2 items-center cursor-pointer hover:bg-white/10 rounded-lg p-2"
                    onClick={() => {
                      router.push("/setting");
                      setShowPopover(false);
                    }}
                  >
                    <Settings />
                    <span>Setting</span>
                  </div>

                  <Separate classname="my-2" />
                  <div
                    className="flex flex-row gap-2 items-center text-red-500 cursor-pointer hover:bg-white/10 rounded-lg p-2"
                    onClick={handleLogOut}
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {!session && (
            <div className="">
              <SidebarLink
                href="/login"
                content="Login"
                icon={<LogIn />}
                isSidebarOpen={isSidebarOpen}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <ThemeSwitch />
            <Tooltip
              content={
                <span className="px-2">
                  {isSidebarOpen ? "Minimize the navbar" : "Expand the navbar"}
                </span>
              }
              closeDelay={0}
              placement="right"
              className={cn(
                "text-white font-sans px-1 border-0 rounded-[999px] bg-blue-500 "
              )}
            >
              <Button
                className="bg-transparent hover:bg-transparent hover:opacity-100"
                onClick={() => {
                  setIsSidebarOpen(!isSidebarOpen);
                }}
              >
                <AlignJustify />
              </Button>
            </Tooltip>
          </div>
        </div>
      </nav>
    </div>
  );
}
