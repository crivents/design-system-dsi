import React from "react";
import Link from "../Link/Link";
import type { SkipLinksProps } from "./SkipLinks.types";

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const SkipLinks: React.FC<SkipLinksProps> = ({
  links,
  ariaLabel = "Accès rapides",
  className = "",
}) => {
  if (links.length === 0) return null;

  const skipLinksClasses = ["skip-links", className].filter(Boolean).join(" ");

  return (
    <div className={skipLinksClasses}>
      <nav
        className="skip-link__wrapper"
        aria-label={ariaLabel}
        role="navigation"
      >
        <ul className="skip-links__list">
          {links.map((link) => (
            <li key={link.id} className="skip-links__item">
              <Link
                href={`#${link.targetId}`}
                className="skip-link"
                label={link.label}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SkipLinks;
