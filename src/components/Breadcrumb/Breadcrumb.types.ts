import type { IconName } from "../Icon/Icon";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface BreadcrumbItem {
  /** Identifiant unique */
  id: string;
  /** Libellé affiché */
  label: string;
  /** URL du lien (absent = élément courant, non cliquable) */
  href?: string;
  /** Icône optionnelle (affichée avant le libellé) */
  icon?: IconName;
}

export interface BreadcrumbProps {
  /** Identifiant unique */
  id?: string;
  /** Liste des éléments du fil d'Ariane (du premier au dernier) */
  items: BreadcrumbItem[];
  /** Séparateur personnalisé (par défaut : chevron) */
  separator?: React.ReactNode;
  /** Afficher le fil d'Ariane en mode compact (dernier élément seulement + retour) */
  compact?: boolean;
  /** Libellé accessible pour la navigation */
  ariaLabel?: string;
  /** Classes additionnelles */
  className?: string;
}
