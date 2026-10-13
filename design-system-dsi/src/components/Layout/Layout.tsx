import React, { useState, useCallback, useEffect } from "react";
import type { LayoutProps } from "./Layout.types";

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Layout: React.FC<LayoutProps> = ({
  withMenu = false,
  withBreadcrumb = false,
  contentWidth = "md",
  isMenuOpen: controlledIsMenuOpen,
  onMenuToggle,
  onMenuClose,
  header,
  menu,
  breadcrumb,
  footer,
  overlays,
  skipLink,
  children,
  className = "",
}) => {
  /* ------------------------------------------------------------------
     État du menu : interne par défaut, contrôlable de l'extérieur
     ------------------------------------------------------------------ */
  const [internalIsMenuOpen, setInternalIsMenuOpen] = useState(false);

  const isMenuOpen =
    controlledIsMenuOpen !== undefined
      ? controlledIsMenuOpen
      : internalIsMenuOpen;

  const handleMenuToggle = useCallback(() => {
    if (controlledIsMenuOpen === undefined) {
      setInternalIsMenuOpen((prev) => !prev);
    }
    onMenuToggle?.();
  }, [controlledIsMenuOpen, onMenuToggle]);

  const handleMenuClose = useCallback(() => {
    if (controlledIsMenuOpen === undefined) {
      setInternalIsMenuOpen(false);
    }
    onMenuClose?.();
  }, [controlledIsMenuOpen, onMenuClose]);

  /* ------------------------------------------------------------------
     Fermeture du menu avec Échap (mobile)
     ------------------------------------------------------------------ */
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleMenuClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, handleMenuClose]);

  /* ------------------------------------------------------------------
     Blocage du scroll body quand le menu est ouvert (mobile)
     ------------------------------------------------------------------ */
  useEffect(() => {
    if (typeof document === "undefined") return;

    const shouldLock = isMenuOpen && window.innerWidth <= 768;
    document.body.style.overflow = shouldLock ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* ------------------------------------------------------------------
     Composition des classes
     ------------------------------------------------------------------ */
  const layoutClasses = [
    "layout",
    withMenu ? "layout--with-menu" : "layout--without-menu",
    withBreadcrumb ? "layout--with-breadcrumb" : "layout--without-breadcrumb",
    `layout--content-${contentWidth}`,
    isMenuOpen && "layout--menu-open",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={layoutClasses}>
      {/* Lien d'évitement */}
      {skipLink && <div className="layout__skip-link">{skipLink}</div>}

      {/* Header (observé pour la hauteur) */}
      {header && <div className="layout__header">{header}</div>}

      {/* Zone principale : menu + body */}
      <div className="layout__main">
        {/* Menu latéral */}
        {withMenu && menu && <aside className="layout__menu">{menu}</aside>}

        {/* Body : breadcrumb + contenu */}
        <div className="layout__body">
          {withBreadcrumb && breadcrumb && (
            <div className="layout__breadcrumb">{breadcrumb}</div>
          )}

          <main className="layout__content">{children}</main>
        </div>
      </div>

      {/* Footer */}
      {footer && <footer className="layout__footer">{footer}</footer>}

      {/* Overlays (modales, drawers, etc.) */}
      <div className="layout__overlays">{overlays}</div>
    </div>
  );
};

export default Layout;
