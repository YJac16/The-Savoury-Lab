import { GENERAL_ORDER_URL } from "@/lib/site";

type WhatsAppLinkProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function WhatsAppLink({
  href = GENERAL_ORDER_URL,
  children,
  className,
  id,
}: WhatsAppLinkProps) {
  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
