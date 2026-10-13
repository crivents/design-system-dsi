import type { ReactNode } from "react";

export type MediaRatio = "1/1" | "4/3" | "3/2" | "16/9" | "21/9" | "auto";

export type MediaSize = "sm" | "md" | "lg" | "full";

export type MediaFit = "cover" | "contain";

export type MediaType = "image" | "svg";

export interface MediaSource {
  srcSet: string;
  type?: string;
  media?: string;
}

/* ==========================================================================
   PROPS COMMUNES
   ========================================================================== */

export interface MediaBaseProps {
  /** Ratio d’aspect */
  ratio?: MediaRatio;
  /** Taille prédéfinie */
  size?: MediaSize;
  /** Largeur maximale (surcharge la taille) */
  maxWidth?: string;
  /** Hauteur maximale */
  maxHeight?: string;
  /** Comportement de l’image dans son conteneur */
  fit?: MediaFit;
  /** Coins arrondis */
  rounded?: boolean;
  /** Légende affichée sous le média */
  caption?: ReactNode;
  /** Classes additionnelles */
  className?: string;
}

/* ==========================================================================
   IMAGE
   ========================================================================== */

export interface MediaImageProps extends MediaBaseProps {
  type: "image";
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  sources?: MediaSource[];
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: () => void;
}

/* ==========================================================================
   SVG
   ========================================================================== */

export interface MediaSvgProps extends MediaBaseProps {
  type: "svg";
  src: string;
  alt: string;
  /** SVG inline (si fourni, remplace le chargement par src) */
  children?: ReactNode;
}

/* ==========================================================================
   UNION
   ========================================================================== */

export type MediaProps = MediaImageProps | MediaSvgProps;
