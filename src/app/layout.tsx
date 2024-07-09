import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "next-themes";
import { Nunito } from "next/font/google";
import Provider from "../components/auth/session-provider";
import { Toast } from "../components/ui/toast";
import ReduxProvider from "../redux/provider";
import { cn } from "../utils/func";
import "./globals.css";
import { authOptions } from "../models/authOption";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

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
          nunito.className
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
