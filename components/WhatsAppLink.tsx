import { GENERAL_ORDER_URL } from "@/lib/site";

type WhatsAppLinkProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

export function WhatsAppLink({
  href = GENERAL_ORDER_URL,
  children,
  className,
}: WhatsAppLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
