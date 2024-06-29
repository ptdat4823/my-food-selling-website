import ThemeSwitch from "@/src/components/ui/theme-switch";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-screen h-screen bg-light dark:bg-dark bg-cover bg-center transition-all ease-linear duration-200">
      <ThemeSwitch className="absolute top-1 left-1" />
      {children}
    </div>
  );
}
