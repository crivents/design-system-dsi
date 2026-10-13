import React from "react";
import type { FormHTMLAttributes, ReactNode } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface FormProps extends Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> {
  /** Contenu du formulaire (fieldsets, boutons, etc.) */
  children: ReactNode;
  /** Évènement lors de la soumission */
  onSubmit?: (values: Record<string, string | string[] | boolean>) => void;
  /** Classes additionnelles */
  className?: string;
  /** Titre principal du formulaire (optionnel) */
  title?: string;
  /** Description du formulaire (optionnel) */
  description?: string;
  /** Activer la validation (true par défaut) */
  enableValidation?: boolean;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  className = "",
  title,
  description,
  enableValidation = false,
  ...rest
}) => {
  const { formRef, validateAll, getValues, reset } = useFormValidation();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (enableValidation) {
      const isValid = validateAll();
      if (!isValid) return;
    }

    if (onSubmit) {
      const values = getValues();
      onSubmit(values);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form
      className={`form ${className}`}
      onSubmit={handleSubmit}
      onReset={handleReset}
      ref={formRef}
      data-formvalidator={enableValidation ? true : undefined}
      {...rest}
    >
      <div className="form__header">
        {title && <h2 className="form__title">{title}</h2>}
        {description && <p className="form__description">{description}</p>}
      </div>

      {children}
    </form>
  );
};

export default Form;
