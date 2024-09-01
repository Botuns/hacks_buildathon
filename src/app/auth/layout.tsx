import { Inter } from "next/font/google";
import Image from "next/image";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import SiteHeader from "@/app-components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eduifa - Authentication",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex flex-1">
              <div className="container flex flex-col items-center justify-center md:flex-row md:items-stretch md:justify-between">
                <Card className="w-full max-w-full p-6 md:w-1/2">
                  <div className="mb-4 flex justify-end">
                    <ModeToggle />
                  </div>
                  {children}
                </Card>
                <div className="relative hidden h-full w-1/2 md:block">
                  <Image
                    src="/girl-studying-university-library.jpg"
                    alt="Girl studying in university library"
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
                </div>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
