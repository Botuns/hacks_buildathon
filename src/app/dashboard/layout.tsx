import { Inter } from "next/font/google";
import DashBoardHeader from "@/app-components/header";
import SideBar from "@/app-components/side-bar";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <SideBar />
      <div className="flex flex-col flex-1">
        <DashBoardHeader />
        <main className="flex-1 p-6 overflow-auto bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
