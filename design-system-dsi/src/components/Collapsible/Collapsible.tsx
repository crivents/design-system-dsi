import React from "react";
import type { ReactNode } from "react";

/* ==========================================================================
   TYPES
   ========================================================================== */

export type CollapsibleRole = "status" | "alert" | "region" | "none";
export type CollapsibleLive = "polite" | "assertive" | "off";

export interface CollapsibleProps {
  /** Identifiant unique (utile pour aria-controls) */
  id?: string;
  /** Contenu à afficher */
  children: ReactNode;
  /** État d'ouverture */
  isOpen: boolean;
  /** Rôle ARIA du conteneur */
  role?: CollapsibleRole;
  /** Mode d'annonce live */
  live?: CollapsibleLive;
  /** Classes additionnelles sur le conteneur */
  className?: string;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Collapsible: React.FC<CollapsibleProps> = ({
  id,
  children,
  isOpen,
  role = "status",
  live = "polite",
  className = "",
}) => {
  const classes = ["collaps", isOpen && "collaps--expand", className]
    .filter(Boolean)
    .join(" ");

  // Si le rôle est "none", on n'ajoute pas les attributs ARIA
  const ariaProps =
    role === "none"
      ? {}
      : {
          role,
          "aria-live": live,
          "aria-atomic": true,
        };

  return (
    <div id={id} className={classes} {...ariaProps}>
      {children}
    </div>
  );
};

export default Collapsible;
