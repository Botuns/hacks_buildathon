"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Grid,
  Book,
  Search,
  Folder,
  BookOpen,
  Clipboard,
  Mic,
  FileText,
  Cloud,
  CloudLightning,
  Bell,
  Lightbulb,
  HelpCircle,
  LogOut,
  Rocket,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", icon: Grid, label: "Dashboard" },
    { href: "/dashboard/learn", icon: Book, label: "Study" },
    { href: "/dashboard/search", icon: Search, label: "Search" },
    { href: "#", icon: Folder, label: "Projects" },
    { href: "#", icon: BookOpen, label: "Lectures Paradise" },
    { href: "#", icon: Clipboard, label: "Exams" },
    { href: "/dashboard/ai-exam", icon: Rocket, label: "AI Exams" },
    { href: "/dashboard/call", icon: Mic, label: "Voice Tutor" },
    { href: "#", icon: BookOpen, label: "Explainers" },
    { href: "/dashboard/chat-with-pdf", icon: FileText, label: "PDF/Q&A" },
    { href: "#", icon: Cloud, label: "Photos" },
    { href: "#", icon: CloudLightning, label: "Groups" },
    { href: "#", icon: Bell, label: "Notifications" },
    { href: "#", icon: Lightbulb, label: "Profile" },
    { href: "#", icon: HelpCircle, label: "Help" },
    { href: "/dashboard/game", icon: Lightbulb, label: "Games" },
    { href: "#", icon: LogOut, label: "Logout" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-16 px-4 mb-[1%]">
        <Link
          href="#"
          className="flex items-center gap-2 font-semibold"
          prefetch={false}
        >
          <img src="/pLogo.png" className="h-8 w-8 " alt="Eduifa Logo" />
          <span className="text-lg">Eduifa</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2">
        <nav className="flex flex-col gap-1 mt-[1%]">
          {navItems.map((item, index) =>
            item.href === "#" ? (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 cursor-not-allowed opacity-50",
                  index === 0 && "bg-primary text-primary-foreground"
                )}
                disabled
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ) : (
              <Link key={index} href={item.href} prefetch={false}>
                <Button
                  variant={index === 0 ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    index === 0 && "bg-primary text-primary-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          )}
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-50 md:hidden"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <SidebarContent />
      </div>
    </>
  );
}
