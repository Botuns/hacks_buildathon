"use client";
import { Inter } from "next/font/google";
import DashBoardHeader from "@/app-components/header";
import SideBar from "@/app-components/side-bar";
import { Loader2 } from "lucide-react";
import { useUser } from "../hooks/useUser";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loadingUser } = useUser();

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }
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
