import type { ReactNode } from "react";
import type { IconName } from "../Icon/Icon";

/* ==========================================================================
   TYPES
   ========================================================================== */

export type ModalPosition = "center" | "left" | "right";
export type ModalSize = "sm" | "md" | "lg" | "full";

export interface ModalProps {
  /** Nom unique de la modale (utilisé pour les data-attributes et les ids) */
  name: string;
  /** Titre de la modale */
  title?: string;
  /** Icône optionnelle du titre */
  icon?: IconName;
  /** Position de la modale */
  position?: ModalPosition;
  /** Taille de la modale */
  size?: ModalSize;
  /** Contenu de la modale */
  children: ReactNode;
  /** Pied de modale (boutons, actions) */
  footer?: ReactNode;
  /** Fermeture au clic sur le fond (défaut : true) */
  closeOnOverlayClick?: boolean;
  /** Classes additionnelles sur la modale */
  className?: string;
  /** État ouvert par défaut */
  defaultOpen?: boolean;
}
