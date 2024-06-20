import Sidebar from "@/src/components/ui/sidebar";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
