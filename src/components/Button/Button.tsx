import React, { type ReactNode } from "react";
import Icon, { type IconName } from "../Icon/Icon";

/* ==========================================================================
   TYPES
   ========================================================================== */
export type ButtonVariant =
  "primary" | "cnam" | "secondary" | "tertiary" | "danger";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  iconRight?: IconName;
  iconLeft?: IconName;
  className?: string;
  ariaLabel?: string;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  label,
  disabled = false,
  iconRight = null,
  iconLeft = null,
  className = "",
  ariaLabel,
  onClick,
  ...props
}) => {
  const classes = [
    "btn",
    `btn--${variant}`,
    (iconRight || iconLeft) && !label ? "btn--icon-only" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel || label}
      onClick={onClick}

      {...props}
    >
      {iconLeft && <Icon name={iconLeft} size="md" className="btn__icon" />}
      {label}
      {iconRight && (
        <Icon name={iconRight} size="md" className="btn__icon"></Icon>
      )}
    </button>
  );
};

export default Button;
