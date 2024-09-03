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
} from "lucide-react";

export default function SideBar() {
  return (
    <div className="flex  bg-background  ">
      <div className="flex flex-col items-start gap-4 border-r bg-muted/40 p-4   ">
        <Link
          href="#"
          className="flex items-center gap-2 font-semibold"
          prefetch={false}
        >
          <img src="/pLogo.png" className="h-10 w-10 lg:h-16 lg:w-16" />
          <span className="text-lg">Eduifa</span>
        </Link>
        <nav className="flex flex-col items-start gap-2 text-sm font-medium w-full ">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground bg-primary text-white w-full"
            prefetch={false}
          >
            <Grid className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/learn"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <Book className="h-4 w-4" />
            Study
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <Folder className="h-4 w-4" />
            Projects
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <BookOpen className="h-4 w-4" />
            Lectures Paradise
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <Clipboard className="h-4 w-4" />
            Exams
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <Rocket className="h-4 w-4" />
            AI Exams
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <Mic className="h-4 w-4" />
            Voice Tutor
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <BookOpen className="h-4 w-4" />
            Explainers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <FileText className="h-4 w-4" />
            PDF/Q&A
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <Cloud className="h-4 w-4" />
            Photos
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <CloudLightning className="h-4 w-4" />
            Groups
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <Bell className="h-4 w-4" />
            Notifications
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <Lightbulb className="h-4 w-4" />
            Profile
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <HelpCircle className="h-4 w-4" />
            Help
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <Lightbulb className="h-4 w-4" />
            Tips
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground w-full"
            prefetch={false}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </nav>
      </div>
    </div>
  );
}
