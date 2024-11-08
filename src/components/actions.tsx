import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Mic, MessageSquare, FileText, Clock, Book, Users } from "lucide-react";

// Helper function to resolve icon component
const getIcon = (icon: "mic" | "messageSquare" | "fileText") => {
  const icons = {
    mic: Mic,
    messageSquare: MessageSquare,
    fileText: FileText,
  };

  const IconComponent = icons[icon];
  return IconComponent ? (
    <IconComponent className="h-10 w-10 text-primary bg-primary/10 p-2 rounded-lg" />
  ) : null;
};

interface IconButtonProps {
  icon: "mic" | "messageSquare" | "fileText";
  label: string;
  href: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  href,
  className = "",
}) => {
  return (
    <Link href={href} className={`block ${className}`}>
      <Card className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50 bg-muted/20 bg-primary/10">
        <div className="shrink-0 ">{getIcon(icon)}</div>
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-base">{label}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Book className="h-4 w-4" />
              <span className="text-xs">Audio </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Interactive </span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Document </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const ActionButtonGrid = () => {
  const actions: {
    icon: "mic" | "messageSquare" | "fileText";
    label: string;
    href: string;
  }[] = [
    {
      icon: "mic",
      label: "Voice Call with AI",
      href: "/dashboard/call",
    },
    {
      icon: "messageSquare",
      label: "Chat with AI",
      href: "/dashboard/chat",
    },
    {
      icon: "fileText",
      label: "Chat with PDF",
      href: "/dashboard/chat-with-pdf",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {actions.map((action) => (
        <IconButton
          key={action.href}
          icon={action.icon}
          label={action.label}
          href={action.href}
        />
      ))}
    </div>
  );
};

export { IconButton, ActionButtonGrid };
