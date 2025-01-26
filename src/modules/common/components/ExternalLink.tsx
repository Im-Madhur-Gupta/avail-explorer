import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
  href: string;
  size?: "xs" | "sm";
  children: React.ReactNode;
}

const ExternalLink = ({ href, size = "xs", children }: ExternalLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-xs text-primary hover:underline flex items-center gap-1",
        {
          "text-sm": size === "sm",
        }
      )}
    >
      {children}
      <ExternalLinkIcon className="h-3 w-3" />
    </a>
  );
};

export default ExternalLink;
