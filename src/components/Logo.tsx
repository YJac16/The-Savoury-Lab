import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
};

const sizes = {
  sm: { width: 120, height: 82 },
  md: { width: 160, height: 110 },
  lg: { width: 280, height: 192 },
};

export function Logo({ className = "", size = "md", href = "/" }: LogoProps) {
  const dim = sizes[size];
  const mark = (
    <span className={`logo-mark inline-flex flex-col items-center ${className}`}>
      <Image
        src="/logo.svg"
        alt="The Savoury Lab"
        width={dim.width}
        height={dim.height}
        priority={size === "lg"}
        className="h-auto w-full"
      />
    </span>
  );

  if (!href) return mark;
  return (
    <Link href={href} className="inline-block text-[var(--ink)]" aria-label="The Savoury Lab home">
      {mark}
    </Link>
  );
}

export function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`brand-wordmark text-center ${className}`}>
      <p className="brand-the">The</p>
      <p className="brand-savoury">Savoury</p>
      <p className="brand-lab">
        <span className="brand-lab-rule" aria-hidden />
        Lab
        <span className="brand-lab-rule" aria-hidden />
      </p>
    </div>
  );
}
