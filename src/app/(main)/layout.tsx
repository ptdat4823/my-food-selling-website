import { GetInfo } from "@/src/actions/user";
import MySteryBackground from "@/src/components/ui/mystery-background";
import Sidebar from "@/src/components/ui/sidebar";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userRes] = await Promise.all([GetInfo()]);

  return (
    <div className="w-screen flex flex-row h-screen overflow-hidden">
      <Sidebar user={userRes.data} />
      <div className="relative flex-1 h-full">
        <MySteryBackground />
        <div className="relative w-full h-full">{children}</div>
      </div>
    </div>
  );
}
