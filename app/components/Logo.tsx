import {Link} from 'react-router';
import {BRAND} from '~/lib/brand';

type LogoProps = {
  inverted?: boolean;
  showHalaal?: boolean;
  className?: string;
};

export function Logo({
  inverted = false,
  showHalaal = false,
  className = '',
}: LogoProps) {
  return (
    <Link
      to="/"
      className={`group inline-flex flex-col gap-1 focus-visible:outline-offset-4 ${className}`.trim()}
      aria-label={`${BRAND.name} — Home`}
    >
      {showHalaal && BRAND.halaal && (
        <span className="eyebrow text-[0.65rem]">Halaal</span>
      )}
      <img
        src="/logo.png"
        alt={BRAND.name}
        width={441}
        height={279}
        className={`h-10 w-auto object-contain object-left transition-opacity duration-300 sm:h-11 ${
          inverted ? 'brightness-0 invert' : ''
        }`}
        decoding="async"
      />
    </Link>
  );
}
