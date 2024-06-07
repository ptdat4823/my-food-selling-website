import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toast } from "../components/ui/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fresh Mart",
  description: "Fresh Mart - Your one stop shop for fresh groceries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <Toast />
      </body>
    </html>
  );
}
