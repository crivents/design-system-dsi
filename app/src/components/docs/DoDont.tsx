import React from "react";
import type { ReactNode } from "react";

/**
 * Types de statut pour le composant Do/Don't
 */
export type DoDontStatus = "do" | "dont";

/**
 * Props du composant DoDont
 */
export interface DoDontProps {
  /** Type : Do (bonne pratique) ou Don't (mauvaise pratique) */
  status: DoDontStatus;
  /** Description optionnelle */
  children?: ReactNode;
  /** Image à afficher */
  imageSrc?: string;
  /** Texte alternatif de l'image */
  imageAlt?: string;
}

/**
 * Composant Do/Don't pour la documentation
 */
const DoDont: React.FC<DoDontProps> = ({
  status,
  children,
  imageSrc,
  imageAlt,
}) => {
  const isDo = status === "do";

  return (
    <div className={`do-dont `}>
      <div className="do-dont__header">
        {isDo ? (
          <>
            <span
              className="do-dont__icon do-dont__title--do"
              aria-hidden="true"
            >
              ✓
            </span>
            <span className="do-dont__title do-dont__title--do">A FAIRE</span>
          </>
        ) : (
          <>
            <span
              className="do-dont__icon do-dont__title--dont"
              aria-hidden="true"
            >
              ✗
            </span>
            <span className="do-dont__title do-dont__title--dont">
              A NE PAS FAIRE
            </span>
          </>
        )}
      </div>

      {imageSrc && (
        <div className={`do-dont__image-wrapper do-dont--${status}`}>
          <img
            src={imageSrc}
            alt={
              imageAlt ||
              `${isDo ? "Exemple de bonne pratique" : "Exemple de mauvaise pratique"}`
            }
            className="do-dont__image"
          />
        </div>
      )}

      {children && <div className="do-dont__content">{children}</div>}
    </div>
  );
};

export default DoDont;
