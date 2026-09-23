import React from "react";
import type { SelectHTMLAttributes } from "react";
import FieldWrapper from "../FieldWrapper/FieldWrapper";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface SelectOption {
  /** Valeur de l'option */
  value: string;
  /** Libellé affiché */
  label: string;
  /** Option désactivée */
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id"
> {
  /** Identifiant unique du champ */
  id: string;
  /** Libellé du champ */
  label: string;
  /** Liste des options */
  options: SelectOption[];
  /** Fonction en cas de changement */
  onChange?: () => void;
  /** Texte optionnel affiché dans le label */
  optional?: boolean;
  /** Texte d'aide */
  helpText?: string;
  /** Message d'erreur ou de succès */
  message?: string;
  /** Statut du champ */
  status?: "error" | "success" | "disabled" | "";
  /** Placeholder (option vide par défaut) */
  placeholder?: string;
  /** Classes additionnelles sur le conteneur */
  className?: string;
  /** Classes additionnelles sur le champ */
  fieldClassName?: string;
  /** Nom du champ */
  name?: string;
  /** Champs en lecute seul */
  readOnly?: boolean;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  optional = false,
  helpText,
  message,
  status = "",
  placeholder,
  className = "",
  fieldClassName = "",
  name = "",
  disabled = false,
  onChange,
  readOnly,
  ...rest
}) => {
  const selectId = id ? `input-select-${id}` : "input-select";
  const inputClasses = ["input--select", fieldClassName]
    .filter(Boolean)
    .join(" ");
  const fieldClasses = ["input__field", fieldClassName]
    .filter(Boolean)
    .join(" ");
  const helpId = helpText ? `${selectId}-help` : undefined;
  const messageId = message ? `${selectId}-message` : undefined;

  return (
    <FieldWrapper
      label={label}
      inputId={selectId}
      messageId={messageId}
      message={message}
      helpId={helpId}
      helpText={helpText}
      optional={optional}
      status={status}
      className={inputClasses}
      name={name}
      readOnly={readOnly}
    >
      <select
        id={selectId}
        className={fieldClasses}
        aria-describedby={messageId}
        disabled={disabled || status === "disabled"}
        required={!optional}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};

export default Select;
