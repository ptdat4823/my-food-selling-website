"use client";

import { cn } from "@/src/utils/func";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/public/images/logo.png";
import { SidebarLink } from "./sidebar-link";
import {
  AlignJustify,
  Heart,
  History,
  LayoutDashboard,
  LayoutList,
  ListOrderedIcon,
  LogIn,
  LogOut,
  Settings,
  ShoppingCart,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import default_user_image from "@/public/images/default_user.png";
import { Separate } from "./separate";

export default function Sidebar({}: {}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  // const isLogin = useAppSelector((state) => state.profile.isLogin);
  const thisUser = null;
  // const cart = useAppSelector((state) => state.cart.cartItems);
  const [showPopover, setShowPopover] = useState(false);
  // const [isLoggingOut, setIsLoggingOut] = useState(false);
  // const handleLogout = async () => {
  //   setIsLoggingOut(true);
  //   await AuthService.logOut()
  //     .then(() => {
  //       dispatch(setProfile(null));
  //       showSuccessToast("Logout successfully");
  //       router.push("/login");
  //     })
  //     .catch((err) => showErrorToast(err.message))
  //     .finally(() => {
  //       setIsLoggingOut(false);
  //     });
  // };

  return (
    <div
      className={cn(
        "w-[72px] h-screen bg-sidebar-bg text-white p-4 pb-8 transition-all duration-700 ease-in-out shrink-0",
        isSidebarOpen ? "w-[calc(72px+6rem)]" : "w-[72px]",
        "max-sm:w-[72px]"
      )}
    >
      <nav className="h-full flex flex-col justify-between overflow-hidden">
        <div className="space-y-8">
          <div className="flex flex-row items-center gap-2 whitespace-nowrap select-none">
            <Image src={Logo} alt="logo" width={40} height={40} />
            <span
              className={cn(
                "text-nowrap font-bold font-web-name max-sm:hidden"
              )}
            >
              Fresh Mart
            </span>
          </div>
          {/* {thisUser && thisUser.isAdmin === true ? (
            <div className={cn(style["nav__brand"], "select-none pl-1")}>
              <Image src={Logo} alt="logo" width={40} height={40} />
              <span
                className={cn(style["nav__logo"], "text-nowrap max-sm:hidden")}
              >
                Fresh Mart
              </span>
            </div>
          ) : (
            <a href="/" className={cn(style["nav__brand"], "cursor-pointer")}>
              <Image src={Logo} alt="logo" width={40} height={40} />
              <span
                className={cn(style["nav__logo"], "text-nowrap max-sm:hidden")}
              >
                Fresh Mart
              </span>
            </a>
          )} */}

          <div className="flex flex-col gap-2 mb-2">
            <SidebarLink
              href="/dashboard"
              content="Dashboard"
              icon={<LayoutDashboard />}
              isSidebarOpen={isSidebarOpen}
            />
            <SidebarLink
              href="/inventory/menu"
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
          <div className="flex flex-col gap-2">
            <SidebarLink
              href="/cart"
              content="Your cart"
              icon={<ShoppingCart />}
              isSidebarOpen={isSidebarOpen}
              notification={1}
            />

            <SidebarLink
              href="/favourite"
              content="Favourites"
              icon={<Heart />}
              isSidebarOpen={isSidebarOpen}
            />

            <SidebarLink
              href="/history"
              content="History"
              icon={<History />}
              isSidebarOpen={isSidebarOpen}
            />
          </div>

          {/* {thisUser && thisUser.isAdmin ? (
            <div className={style["nav__list"]}>
              <CustomLink
                href="/dashboard"
                content="Dashboard"
                icon={<LayoutDashboard />}
                selectedLink={selectedLink}
                isSidebarOpen={isSidebarOpen}
              />
              <CustomLink
                href="/inventory/menu"
                content="Inventory"
                icon={<LayoutList />}
                selectedLink={selectedLink}
                isSidebarOpen={isSidebarOpen}
              />

              <CustomLink
                href="/order-management"
                content="Orders"
                icon={<OrderIcon />}
                selectedLink={selectedLink}
                isSidebarOpen={isSidebarOpen}
                className={cn(
                  thisUser && thisUser.isAdmin === true ? "" : "hidden"
                )}
              />
            </div>
          ) : (
            <div className={style["nav__list"]}>
              <CustomLink
                href="/cart"
                content="Your cart"
                icon={<CartIcon />}
                selectedLink={selectedLink}
                isSidebarOpen={isSidebarOpen}
                notification={cart.length}
              />

              <CustomLink
                href="/favourite"
                content="Favourites"
                icon={<FavouriteIcon />}
                selectedLink={selectedLink}
                isSidebarOpen={isSidebarOpen}
              />

              <CustomLink
                href="/history"
                content="History"
                icon={<HistoryIcon />}
                selectedLink={selectedLink}
                isSidebarOpen={isSidebarOpen}
              />
            </div>
          )} */}
        </div>
        <div className="space-y-4">
          {isLogin && (
            <Popover
              isOpen={showPopover}
              onOpenChange={setShowPopover}
              placement="right-end"
            >
              <PopoverTrigger>
                <div className="flex flex-row gap-2 items-center hover:bg-white/10 rounded-lg py-3 pl-2 cursor-pointer shrink-0">
                  <Image
                    width={400}
                    height={400}
                    src={default_user_image}
                    alt="image"
                    className="w-[30px] h-[30px] flex-shrink-0 rounded-full object-cover overflow-hidden cursor-pointer select-none"
                  />
                  <span className="font-semibold">{"Ptdat"}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="font-sans text-primaryWord select-none">
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
                    <span className="font-semibold">{"Ptdat"}</span>
                  </div>

                  <Separate classname="my-2" />
                  <div
                    className="flex flex-row gap-2 items-center cursor-pointer hover:bg-gray-100 rounded-lg p-2"
                    onClick={() => {
                      router.push("/user-setting");
                      setShowPopover(false);
                    }}
                  >
                    <Settings />
                    <span>Setting</span>
                  </div>

                  <Separate classname="my-2" />
                  <div
                    className="flex flex-row gap-2 items-center text-red-500 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
                    onClick={() => {
                      //   handleLogout();
                      setShowPopover(false);
                    }}
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {!isLogin && (
            <div className="">
              <SidebarLink
                href="/login"
                content="Login"
                icon={<LogIn />}
                isSidebarOpen={isSidebarOpen}
              />
            </div>
          )}

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
            <AlignJustify
              className="cursor-pointer ml-2"
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
              }}
            />
          </Tooltip>
        </div>
      </nav>
    </div>
  );
}
