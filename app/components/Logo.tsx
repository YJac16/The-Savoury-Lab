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
  const src = inverted
    ? '/logo-no-background-inverted.png'
    : '/logo-no-background.png';

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
        src={src}
        alt={BRAND.name}
        width={600}
        height={510}
        className="h-12 w-auto object-contain object-left transition-opacity duration-300 sm:h-14"
        decoding="async"
      />
    </Link>
  );
}
