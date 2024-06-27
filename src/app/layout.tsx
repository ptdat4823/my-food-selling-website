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
    <html lang="en">
      <body
        className={cn(inter.className, "overflow-x-hidden default-scrollbar")}
      >
        <Provider session={session}>
          <ReduxProvider>
            <ThemeProvider defaultTheme="system" attribute="class">
              {children}
            </ThemeProvider>
          </ReduxProvider>
        </Provider>

        <Toast />
      </body>
    </html>
  );
}
