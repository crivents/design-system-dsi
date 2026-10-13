import React from "react";
import type { BreadcrumbProps } from "./Breadcrumb.types";
import Icon from "../Icon/Icon";
import Link from "../Link/Link";
import Button from "../Button/Button";
import Collapsible from "../Collapsible/Collapsible";
import useCollapsible from "../Collapsible/useCollapsible";
import { truncateWords } from "../../assets/utils/truncate";

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  id = "breadcrumb",
  items,
  separator,
  compact = false,
  ariaLabel = "Vous êtes ici :",
  className = "",
}) => {
  const { isOpen, toggle } = useCollapsible(false);

  if (items.length === 0) return null;

  const collapsibleId = `${id}-collapsible`;
  const buttonId = `${id}-toggle`;

  const breadcrumbClasses = [
    "breadcrumb",
    compact && "breadcrumb--compact",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Séparateur par défaut
  const defaultSeparator = (
    <span className="breadcrumb__separator-custom">/</span>
  );

  // Mode compact : afficher uniquement le parent + l'élément courant
  const displayedItems = compact ? items.slice(-2) : items;

  return (
    <nav id={id} className={breadcrumbClasses} aria-label={ariaLabel}>
      <Button
        id={buttonId}
        label={isOpen ? "Masquer le fil d'Ariane" : "Voir le fil d'Ariane"}
        variant="tertiary"
        className="breadcrumb__button"
        aria-expanded={isOpen}
        aria-controls={collapsibleId}
        onClick={toggle}
      />

      <Collapsible
        id={collapsibleId}
        isOpen={isOpen}
        role="none"
        className="breadcrumb__collapsible"
      >
        <ol className="breadcrumb__list">
          {displayedItems.map((item, index) => {
            const isLast = index === displayedItems.length - 1;
            const isClickable = Boolean(item.href) && !isLast;

            const itemClasses = [
              "breadcrumb__item",
              isLast && "breadcrumb__item--current",
              isClickable && "breadcrumb__item--clickable",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <li key={item.id} className={itemClasses}>
                {index > 0 && (
                  <span className="breadcrumb__separator" aria-hidden="true">
                    {separator || defaultSeparator}
                  </span>
                )}

                {isLast ? (
                  <span className="breadcrumb__current" aria-current="page">
                    {item.icon && (
                      <Icon
                        name={item.icon}
                        size="sm"
                        className="breadcrumb__icon"
                        aria-hidden="true"
                      />
                    )}
                    <span className="breadcrumb__label">
                      {truncateWords(item.label, 4)}
                    </span>
                  </span>
                ) : (
                  <Link
                    href={item.href!}
                    className="breadcrumb__link"
                    icon={item.icon}
                    label={item.label}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </Collapsible>
    </nav>
  );
};

export default Breadcrumb;
