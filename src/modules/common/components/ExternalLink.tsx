import { ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-primary hover:underline flex items-center gap-1"
    >
      {children}
      <ExternalLinkIcon className="h-3 w-3" />
    </a>
  );
};

export default ExternalLink;
