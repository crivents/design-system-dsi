import React from "react";
import type { ReactNode } from "react";
import Icon, { type IconName } from "../../Icon/Icon";
import Switch from "../../Input/Switch/Switch";
import type { MenuUser } from "../Menu.types";
import Button from "../../Button/Button";

/* ==========================================================================
   TYPES
   ========================================================================== */

export type MenuSectionType = "quick-access" | "user" | "logout" | "custom";

export interface MenuQuickAccessLink {
  id: string;
  label: string;
  href: string;
  icon?: IconName;
}

export interface MenuSectionProps {
  /** Type de section */
  type: MenuSectionType;
  /** Identifiant unique */
  id?: string;
  /** Titre de la section (optionnel) */
  title?: string;
  /** Contenu personnalisé (pour type="custom") */
  children?: ReactNode;
  /** Liens d'accès rapide (pour type="quick-access") */
  quickAccess?: MenuQuickAccessLink[];
  /** Informations utilisateur (pour type="user") */
  user?: MenuUser;
  /** Thème actuel (pour type="user") */
  isDarkMode?: boolean;
  /** Callback changement de thème (pour type="user") */
  onThemeChange?: (isDark: boolean) => void;
  /** Callback déconnexion (pour type="logout") */
  onLogout?: () => void;
  /** Callback clic lien (pour type="quick-access") */
  onLinkClick?: (link: MenuQuickAccessLink) => void;
  /** Classes additionnelles */
  className?: string;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const MenuSection: React.FC<MenuSectionProps> = ({
  type,
  id,
  title,
  children,
  quickAccess = [],
  user,
  isDarkMode = false,
  onThemeChange,
  onLogout,
  onLinkClick,
  className = "",
}) => {
  const sectionId = id || `menu-section-${type}`;
  const [internalDarkMode, setInternalDarkMode] = React.useState(isDarkMode);

  const handleThemeChange = (checked: boolean) => {
    setInternalDarkMode(checked);
    if (onThemeChange) {
      onThemeChange(checked);
    }
  };

  const sectionClasses = ["menu__section", `menu__section--${type}`, className]
    .filter(Boolean)
    .join(" ");

  /* ============================================================
     ACCÈS RAPIDE
     ============================================================ */
  if (type === "quick-access") {
    if (quickAccess.length === 0) return null;

    return (
      <section
        className={sectionClasses}
        aria-labelledby={title ? `${sectionId}-title` : undefined}
      >
        {title && (
          <h3 className="menu__section-title" id={`${sectionId}-title`}>
            {title}
          </h3>
        )}
        <ul className="menu__list">
          {quickAccess.map((link) => (
            <li key={link.id} className="menu__item">
              <a
                href={link.href}
                className="menu__link menu__link--quick-access"
                onClick={() => onLinkClick?.(link)}
              >
                {link.icon && (
                  <Icon
                    name={link.icon}
                    size="sm"
                    className="menu__link-icon"
                    aria-hidden="true"
                  />
                )}
                <span className="menu__link-label">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  /* ============================================================
     UTILISATEUR
     ============================================================ */
  if (type === "user") {
    if (!user) return null;

    return (
      <section className={sectionClasses}>
        <div className="menu__user">
          <div className="menu__user-info">
            <span className="menu__user-name">{user.name}</span>
            <span className="details menu__user-id">{user.id}</span>
          </div>

          <div className="menu__user-actions">
            <Switch
              id={`dark-mode-${sectionId}`}
              label=""
              variant="toggle"
              icons={{ off: "Sun", on: "Moon" }}
              value={internalDarkMode ? "true" : "false"}
              onChange={(checked) => handleThemeChange(checked as boolean)}
            />
          </div>
        </div>
      </section>
    );
  }

  /* ============================================================
     DÉCONNEXION
     ============================================================ */
  if (type === "logout") {
    if (!onLogout) return null;

    return (
      <section className={sectionClasses}>
        <Button
          type="button"
          className="menu__logout-button"
          onClick={onLogout}
          aria-label="Se déconnecter"
          variant="danger"
          iconLeft="Power"
          label="Se déconnecter"
        ></Button>
      </section>
    );
  }

  /* ============================================================
     SECTION PERSONNALISÉE
     ============================================================ */
  if (type === "custom") {
    return (
      <div className={sectionClasses}>
        {title && <h3 className="menu__section-title">{title}</h3>}
        {children}
      </div>
    );
  }

  return null;
};

export default MenuSection;
