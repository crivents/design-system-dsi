import React, { type ReactNode } from "react";
import Icon, { type IconName } from "../Icon/Icon";

export interface LinkProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: IconName;
  download?: boolean;
  ariaLabel?: string;
  href?: string;
  className?: string;
  exertnal?: boolean;
}

const Link: React.FC<LinkProps> = ({
  label,
  disabled = false,
  icon = null,
  download = false,
  ariaLabel,
  onClick,
  href,
  className,
  exertnal,
  ...props
}) => {
  const classes = ["link", disabled && "link--disabled", className]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      className={classes}
      href={`${disabled ? undefined : href || "#"}`}
      onClick={onClick}
      aria-label={ariaLabel || label}
      {...props}
      aria-disabled={disabled}
    >
      {icon && <Icon name={icon} size="sm" className="link__icon" />}
      {label}
      {download && <Icon name={"Download"} size="sm" className="link__icon" />}
      {exertnal && (
        <Icon name={"ArrowUpRight"} size="sm" className="link__icon" />
      )}
    </a>
  );
};

export default Link;
