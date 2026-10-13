import React, { useState } from "react";
import type { ReactNode } from "react";
import { type IconName } from "../Icon/Icon";
import Switch from "../Input/Switch/Switch";
import Button from "../Button/Button";
import Link from "../Link/Link";

/* ==========================================================================
   TYPES
   ========================================================================== */

export type HeaderVariant = "with-menu" | "without-menu";

export interface QuickAccessLink {
  /** Identifiant unique */
  id: string;
  /** Libellé du lien */
  label: string;
  /** URL du lien */
  href: string;
  /** Icône optionnelle */
  icon?: IconName;
}

export interface UserInfo {
  /** Nom de l'utilisateur */
  name: string;
  /** Identifiant de l'utilisateur */
  id: string;
}

export interface HeaderProps {
  /** Nom du site web */
  siteName: string;
  /** Variante du header */
  variant?: HeaderVariant;
  /** URL du logo */
  logoUrl?: string;
  /** Texte alternatif du logo */
  logoAlt?: string;
  /** Composant logo personnalisé */
  logo?: ReactNode;
  /** Titre principal */
  title: string;
  /** Sous-titre */
  subtitle?: string;
  /** Liens d'accès rapide */
  quickAccess?: QuickAccessLink[];
  /** Informations utilisateur (mode sans menu) */
  user?: UserInfo;
  /** Menu personnalisé (mode avec menu) */
  menu?: ReactNode;
  /** Ouverture du menu (mode avec menu) */
  isMenuOpen?: boolean;
  /** Callback lors du clic sur le bouton menu */
  onMenuToggle?: () => void;
  /** Callback lors du changement de thème */
  onThemeChange?: (isDark: boolean) => void;
  /** Thème actuel */
  isDarkMode?: boolean;
  /** Callback lors de la déconnexion */
  onLogout?: () => void;
  /** Classes additionnelles */
  className?: string;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Header: React.FC<HeaderProps> = ({
  siteName,
  variant = "without-menu",
  logoUrl,
  logoAlt = "Logo",
  logo,
  title,
  subtitle,
  quickAccess = [],
  user,
  isMenuOpen = false,
  onMenuToggle,
  onThemeChange,
  isDarkMode = false,
  className = "",
}) => {
  const [internalDarkMode, setInternalDarkMode] = useState(isDarkMode);

  const handleThemeChange = (checked: boolean) => {
    setInternalDarkMode(checked);
    if (onThemeChange) {
      onThemeChange(checked);
    }
  };

  const headerClasses = [
    "header",
    `header--${variant}`,
    isMenuOpen && "header--menu-open",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClasses} role="banner">
      <div className="header__brand">
        {logo || (
          <a
            href="/"
            className="header__logo-link"
            aria-label={`Accueil - ${siteName}`}
            title={`Accueil - ${siteName}`}
          >
            <img src={logoUrl} alt={logoAlt} className="header__logo" />
          </a>
        )}
      </div>

      <div className="header__titles">
        <h1 className="header__title">{title}</h1>
        {subtitle && <p className="details header__subtitle">{subtitle}</p>}
      </div>

      {/* Zone utilisateur (mode sans menu) */}
      {variant === "without-menu" && user && (
        <div className="header__user">
          <div className="header__user-info">
            <span className="bold header__user-name">{user.name}</span>
            <span className="details header__user-id">{user.id}</span>
          </div>

          <div className="header__user-actions">
            <Switch
              id="dark-mode-header"
              label=""
              aria-label="Passer en mode nuit/jour"
              variant="toggle"
              icons={{ off: "Moon", on: "Sun" }}
              value={internalDarkMode ? "true" : "false"}
              onChange={(checked) => handleThemeChange(checked as boolean)}
              className="header__dark-mode"
            />
            <Button
              label=""
              iconLeft="LogOut"
              aria-label="Se déconnecter"
              variant="cnam"
              className="header__menu-button"
            />
          </div>
        </div>
      )}

      {/* Bouton menu (mode avec menu) */}
      {variant === "with-menu" && (
        <div className="header__user">
          <Button
            iconLeft={isMenuOpen ? "X" : "Menu"}
            variant="cnam"
            type="button"
            className="header__menu-button"
            onClick={onMenuToggle}
            aria-expanded={isMenuOpen}
            aria-controls="header-menu"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            label=""
          ></Button>
        </div>
      )}

      {/* ============================================================
          Accès rapide
          ============================================================ */}
      {quickAccess.length > 0 && (
        <nav className="header__quick-access" aria-label="Accès rapide">
          <ul className="header__quick-access-list">
            {quickAccess.map((link) => (
              <li key={link.id} className="header__quick-access-item">
                <Link
                  icon={link.icon}
                  href={link.href}
                  className="header__quick-access-link"
                  label={link.label}
                ></Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
