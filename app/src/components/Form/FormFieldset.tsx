import React from "react";
import type { ReactNode } from "react";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface FormFieldsetProps {
  /** Titre du fieldset (affiché dans la légende) */
  legend: string;
  /** Contenu du fieldset (champs) */
  children: ReactNode;
  /** Classes additionnelles */
  className?: string;
  /** Nom du fieldset (pour les tests) */
  name: string;
  /** Description optionnelle sous le titre */
  description?: string;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const FormFieldset: React.FC<FormFieldsetProps> = ({
  legend,
  children,
  className = "",
  name,
  description,
}) => {
  return (
    <fieldset
      className={`form-fieldset ${className}`}
      aria-label={legend}
      id={name}
      role="group"
    >
      <h2 className="form-fieldset__title" id={`${name}-title`}>
        {legend}
      </h2>

      {description && (
        <p className="form-fieldset__description">{description}</p>
      )}

      <div className="form-fieldset__content">{children}</div>
    </fieldset>
  );
};

export default FormFieldset;
