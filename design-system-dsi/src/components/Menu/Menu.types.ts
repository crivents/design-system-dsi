import type { ReactNode } from "react";
import type { IconName } from "../Icon/Icon";

/* ==========================================================================
   TYPES DE BASE
   ========================================================================== */

export interface MenuLink {
  id: string;
  label: string;
  href: string;
  /** Icône optionnelle (affichée uniquement au niveau 0) */
  icon?: IconName;
  /** Sous-menu (optionnel) */
  children?: MenuLink[];
  /** Lien désactivé */
  disabled?: boolean;
  external?: boolean;
}

export interface MenuGroupProps {
  id: string;
  title: string;
  icon?: IconName;
  items: MenuLink[];
  defaultOpen?: boolean;
}

export interface MenuUser {
  name: string;
  id: string;
}

export interface MenuQuickAccessLink {
  id: string;
  label: string;
  href: string;
  icon?: IconName;
}

/* ==========================================================================
   SECTIONS ORDONNÉES
   ========================================================================== */

export type MenuSection =
  | {
      type: "items";
      id: string;
      items: MenuLink[];
    }
  | {
      type: "group";
      id: string;
      group: MenuGroupProps;
    }
  | {
      type: "quick-access";
      id: string;
      title?: string;
      items: MenuQuickAccessLink[];
    }
  | {
      type: "custom";
      id: string;
      content: ReactNode;
    };
