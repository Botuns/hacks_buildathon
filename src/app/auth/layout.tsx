import SiteHeader from "@/app-components/site-header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eduifa - Authentication Page",
  description: "Enter your details to get started",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <SiteHeader />
          <div className="flex flex-1 items-center justify-center ">
            <img
              src="/girl-studying-university-library.jpg"
              alt="Girl studying in university library"
              className="hidden md:block w-[300px] !h-[550px] object-cover mr-4"
            />
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
