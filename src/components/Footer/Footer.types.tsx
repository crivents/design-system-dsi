import type { ReactNode } from "react";
import type { IconName } from "../Icon/Icon";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface FooterAddress {
  /** Nom de l'oraganisation */
  name: string;
  /** Lignes d'adresse (une par ligne) */
  lines: string[];
  /** Téléphone (optionnel) */
  phone?: string;
  /** Email (optionnel) */
  email?: string;
}

export interface FooterPartner {
  /** Identifiant unique */
  id: string;
  /** URL du logo */
  logoUrl: string;
  /** Texte alternatif */
  logoAlt: string;
  /** URL de destination */
  href?: string;
  /** Libellé accessible si le lien est externe */
  ariaLabel?: string;
}

export interface FooterSocialLink {
  /** Identifiant unique */
  id: string;
  /** Nom du réseau (pour aria-label) */
  name: string;
  /** URL */
  href: string;
  /** Icône Lucide */
  icon: IconName;
}

export interface FooterInfo {
  /** Identifiant unique */
  id: string;
  /** Titre de l'info */
  title?: string;
  /** Libellé de l'info */
  label: string;
  /** URL du lien */
  href?: string;
}
