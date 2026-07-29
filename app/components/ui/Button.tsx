import {Link} from 'react-router';
import type {ButtonHTMLAttributes, ReactNode} from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = {
  to?: string;
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  'aria-label'?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
};

export function Button({
  to,
  href,
  type = 'button',
  children,
  className = '',
  onClick,
  variant = 'primary',
  disabled = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        target={href.startsWith('http') ? '_blank' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
