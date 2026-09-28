import React from "react";
import type { SVGProps } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type IconName = keyof typeof import("lucide-react");
export type IconSize = "sm" | "md" | "lg";

export interface IconProps extends Omit<
  SVGProps<SVGSVGElement>,
  "name" | "size"
> {
  /** Nom de l'icône Lucide */
  name: IconName;
  /** Taille de l'icône */
  size?: IconSize;
  /** Classe CSS additionnelle */
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  className = "",
  ...rest
}) => {
  const IconComponent = LucideIcons[name] as LucideIcon | undefined;
  if (!IconComponent) {
    return null;
  }

  return (
    <span className={`icon icon--${size} ${className}`} aria-hidden="true">
      <IconComponent aria-hidden="true" focusable="false" {...rest} />
    </span>
  );
};

export default Icon;
