import React, { useState } from "react";
import Icon from "../../Icon/Icon";
import MenuItem from "./MenuItem";
import type { MenuGroupProps as MenuGroupType, MenuLink } from "../Menu.types";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface MenuGroupProps extends MenuGroupType {
  /** Callback lors du clic sur un lien */
  onLinkClick?: (link: MenuLink) => void;
  /** URL active (surlignage) */
  activeHref?: string;
  /** Contrôle externe de l'ouverture */
  isOpen?: boolean;
  /** Callback lors du toggle */
  onToggle?: (isOpen: boolean) => void;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const MenuGroup: React.FC<MenuGroupProps> = ({
  id,
  title,
  icon,
  items,
  onLinkClick,
  activeHref,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    const newState = !isOpen;

    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newState);
    }

    if (onToggle) {
      onToggle(newState);
    }
  };

  const contentId = `${id}-content`;
  const titleId = `${id}-title`;

  const groupClasses = ["menu__group", isOpen && "menu__group--open"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={groupClasses}>
      {/* Titre cliquable (déclencheur du dépliant) */}
      <button
        type="button"
        className="menu__group-toggle"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        id={titleId}
      >
        <span className="menu__group-header">
          {icon && (
            <Icon
              name={icon}
              size="sm"
              className="menu__group-icon"
              aria-hidden="true"
            />
          )}
          <span className="menu__group-title">{title}</span>
        </span>

        <Icon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          size="sm"
          className="menu__group-chevron"
          aria-hidden="true"
        />
      </button>

      {/* Contenu du dépliant */}
      <div
        id={contentId}
        className="menu__group-content"
        role="region"
        aria-labelledby={titleId}
        hidden={!isOpen}
      >
        <ul className="menu__list">
          {items.map((item) => (
            <MenuItem
              key={item.id}
              link={item}
              onLinkClick={onLinkClick}
              activeHref={activeHref}
              level={1}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuGroup;
