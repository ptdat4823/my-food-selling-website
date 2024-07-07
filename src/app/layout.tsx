import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toast } from "../components/ui/toast";
import Provider from "../components/auth/session-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ReduxProvider from "../redux/provider";
import { cn } from "../utils/func";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fresh Mart",
  description: "Fresh Mart - Your one stop shop for fresh groceries",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <Provider session={session}>
      <html
        lang="en"
        className={cn(
          "w-screen h-screen overflow-x-hidden default-scrollbar dark:white-scrollbar",
          inter.className
        )}
      >
        <body className={cn("w-screen")}>
          <ThemeProvider defaultTheme="system" attribute="class">
            {/* client side from here */}
            <NextUIProvider>
              <ReduxProvider>{children}</ReduxProvider>
            </NextUIProvider>
            <Toast />
          </ThemeProvider>
        </body>
      </html>
    </Provider>
  );
}
