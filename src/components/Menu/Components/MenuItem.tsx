import React, { useState } from "react";
import Icon from "../../Icon/Icon";
import type { MenuLink } from "../Menu.types";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface MenuItemProps {
  link: MenuLink;
  level?: number;
  onLinkClick?: (link: MenuLink) => void;
  activeHref?: string;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const MenuItem: React.FC<MenuItemProps> = ({
  link,
  level = 0,
  onLinkClick,
  activeHref,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Boolean(link.children && link.children.length > 0);
  const isActive = activeHref === link.href;
  const isDisabled = Boolean(link.disabled);
  const showIcon = level === 0 && Boolean(link.icon);
  const isExternal = link.external;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    if (hasChildren) {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    }

    if (onLinkClick) {
      onLinkClick(link);
    }
  };

  const itemClasses = [
    "menu__item",
    `menu__item--level-${level}`,
    isActive && "menu__item--active",
    isDisabled && "menu__item--disabled",
    hasChildren && "menu__item--has-children",
    hasChildren && isOpen && "menu__item--open",
    showIcon && "menu__item--with-icon",
    isExternal && "menu__item--external",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={itemClasses}>
      <a
        href={link.href}
        className="menu__link"
        onClick={handleClick}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-disabled={isDisabled}
        aria-current={isActive ? "page" : undefined}
        tabIndex={isDisabled ? -1 : undefined}
        target={isExternal ? "_blank" : ""}
        rel={isExternal ? "noopener noreferrer" : ""}
      >
        {showIcon && (
          <Icon
            name={link.icon!}
            size="sm"
            className="menu__link-icon"
            aria-hidden="true"
          />
        )}

        <span className="menu__link-label">
          <p className="sr-only">
            {isExternal && "site externe / nouvel onglet "}
          </p>
          {link.label}
        </span>

        {hasChildren && (
          <Icon
            name={isOpen ? "ChevronUp" : "ChevronDown"}
            size="sm"
            className="menu__link-chevron"
            aria-hidden="true"
          />
        )}

        {isExternal && !hasChildren && (
          <Icon
            name="ArrowUpRight"
            size="sm"
            className="menu__link-chevron"
            aria-hidden="true"
          />
        )}
      </a>

      {hasChildren && isOpen && (
        <ul className="menu__sublist">
          {link.children!.map((child) => (
            <MenuItem
              key={child.id}
              link={child}
              level={level + 1}
              onLinkClick={onLinkClick}
              activeHref={activeHref}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
