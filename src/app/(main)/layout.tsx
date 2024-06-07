import Sidebar from "@/src/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-row">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
