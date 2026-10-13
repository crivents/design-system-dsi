import type { ReactNode } from "react";

/* ==========================================================================
   TYPES
   ========================================================================== */

export type LayoutContentWidth = "xs" | "sm" | "md" | "lg";

export interface LayoutProps {
  /** Affiche le menu latéral */
  withMenu?: boolean;
  /** Affiche le fil d'Ariane */
  withBreadcrumb?: boolean;
  /** Largeur du contenu principal */
  contentWidth?: LayoutContentWidth;
  /** État d'ouverture du menu (contrôle externe optionnel) */
  isMenuOpen?: boolean;
  /** Callback lors du toggle du menu */
  onMenuToggle?: () => void;
  /** Callback lors de la fermeture du menu */
  onMenuClose?: () => void;
  /** Slot : Header */
  header?: ReactNode;
  /** Slot : Menu latéral */
  menu?: ReactNode;
  /** Slot : Breadcrumb */
  breadcrumb?: ReactNode;
  /** Slot : Footer */
  footer?: ReactNode;
  /** Slot : Overlays (modales, drawers, notifications) */
  overlays?: ReactNode;
  /** Slot : Lien d'évitement (SkipLink) */
  skipLink?: ReactNode;
  /** Contenu principal */
  children: ReactNode;
  /** Classes additionnelles sur le layout */
  className?: string;
}
