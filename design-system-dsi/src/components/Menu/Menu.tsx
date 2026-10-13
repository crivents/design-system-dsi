import React from "react";
import MenuGroup from "./Components/MenuGroup";
import MenuItem from "./Components/MenuItem";
import MenuSection from "./Components/MenuSection";
import type {
  MenuSection as MenuSectionType,
  MenuLink,
  MenuUser,
} from "./Menu.types";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface MenuProps {
  /** Identifiant unique */
  id?: string;
  /** Sections ordonnées composant le menu */
  sections: MenuSectionType[];
  /** Informations utilisateur (section épinglée en bas) */
  user?: MenuUser;
  /** Thème actuel */
  isDarkMode?: boolean;
  /** Callback lors du changement de thème */
  onThemeChange?: (isDark: boolean) => void;
  /** Callback lors de la déconnexion */
  onLogout?: () => void;
  /** Callback lors du clic sur un lien */
  onLinkClick?: (link: MenuLink) => void;
  /** URL active (surlignage) */
  activeHref?: string;
  /** Classes additionnelles */
  className?: string;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Menu: React.FC<MenuProps> = ({
  id = "main-menu",
  sections,
  user,
  isDarkMode = false,
  onThemeChange,
  onLogout,
  onLinkClick,
  activeHref,
  className = "",
}) => {
  const menuClasses = ["menu", className].filter(Boolean).join(" ");

  const renderSection = (section: MenuSectionType) => {
    switch (section.type) {
      case "items":
        return (
          <ul key={section.id} className="menu__list menu__list--root">
            {section.items.map((item) => (
              <MenuItem
                key={item.id}
                link={item}
                level={0}
                onLinkClick={onLinkClick}
                activeHref={activeHref}
              />
            ))}
          </ul>
        );

      case "group":
        return (
          <MenuGroup
            key={section.id}
            {...section.group}
            onLinkClick={onLinkClick}
            activeHref={activeHref}
          />
        );

      case "quick-access":
        return (
          <MenuSection
            key={section.id}
            type="quick-access"
            title={section.title}
            quickAccess={section.items}
            onLinkClick={onLinkClick as any}
          />
        );

      case "custom":
        return (
          <MenuSection key={section.id} type="custom">
            {section.content}
          </MenuSection>
        );

      default:
        return null;
    }
  };

  return (
    <nav
      id={id}
      className={menuClasses}
      aria-label="Menu principal"
      role="navigation"
    >
      <MenuSection
        type="user"
        user={user}
        isDarkMode={isDarkMode}
        onThemeChange={onThemeChange}
      />
      {/* Zone scrollable : toutes les sections ordonnées */}
      <div className="menu__scroll">{sections.map(renderSection)}</div>
    </nav>
  );
};

export default Menu;
