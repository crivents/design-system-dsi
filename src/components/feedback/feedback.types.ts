import type { ReactNode } from "react";
import type { ModalProps } from "../Modal/Modal.types";

/* ==========================================================================
   TYPES
   ========================================================================== */
export type FeedbackStep = "rating" | "detail" | "thanks";

export interface FeedbackOption {
  id: string;
  label: string;
}

export interface FeedbackProps {
  /** Note maximale (par défaut : 5) */
  maxRating?: number;
  /** Seuil en dessous duquel l'étape 2 est proposée (par défaut : 2) */
  detailThreshold?: number;
  /** Libellé de l'étape 1 */
  ratingLabel?: string;
  /** Libellé de l'étape 2 */
  detailLabel?: string;
  /** Choix rapides de l'étape 2 */
  detailOptions?: FeedbackOption[];
  /** Callback lors de l'envoi */
  onSubmit?: (data: FeedbackData) => void;
  /** Classes additionnelles */
  className?: string;
  /** Proposition de raison de retour */
  reasonsProp?: FeedbackOption[];
  /** État ouvert par défaut */
  defaultOpen?: ModalProps["defaultOpen"];
}

export interface FeedbackData {
  rating: number;
  reasons?: string[];
  comment?: string;
}
