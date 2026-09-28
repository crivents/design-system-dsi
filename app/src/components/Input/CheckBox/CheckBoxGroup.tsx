import React, { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import Icon from "../../Icon/Icon";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface CheckboxOption {
  /** Valeur de la case */
  value: string;
  /** Libellé affiché */
  label: string;
  /** Sous texte du libellé */
  subtext?: string;

  /** Option désactivée */
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** Identifiant unique du groupe */
  id: string;
  /** Nom du groupe (pour l'association des cases) */
  name: string;
  /** Libellé du groupe */
  label: string;
  /** Liste des options */
  options: CheckboxOption[];
  /** Valeurs sélectionnées (mode contrôlé) */
  value?: string[];
  /** Valeurs par défaut (mode non contrôlé) */
  defaultValue?: string[];
  /** Texte optionnel affiché dans le label */
  optional?: boolean;
  /** Texte d'aide */
  helpText?: string;
  /** Message d'erreur ou de succès */
  message?: string;
  /** Direction d'affichage */
  direction?: "vertical" | "horizontal";
  /** Classes additionnelles sur le conteneur */
  className?: string;
  /** Évènement lors du changement */
  onChange?: (selectedValues: string[]) => void;
  /** Groupe désactivé */
  disabled?: boolean;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  id,
  name,
  label,
  options,
  value: controlledValue,
  defaultValue = [],
  optional = false,
  helpText,
  message,
  direction = "vertical",
  className = "",
  onChange,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const groupId = id ? `checkbox-${id}` : "checkbox";
  const helpId = helpText ? `${groupId}-help` : undefined;
  const messageId = message ? `${groupId}-message` : undefined;

  const selectedValues =
    controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (optionValue: string, checked: boolean) => {
    let newValues: string[];

    if (checked) {
      newValues = [...selectedValues, optionValue];
    } else {
      newValues = selectedValues.filter((v) => v !== optionValue);
    }

    if (controlledValue === undefined) {
      setInternalValue(newValues);
    }

    if (onChange) {
      onChange(newValues);
    }
  };

  const containerClasses = [
    "checkbox-group",
    `checkbox-group--${direction}`,
    className,
    disabled && "checkbox-group--disabled",
  ]
    .filter(Boolean)
    .join(" ");

  const getCheckboxClass = (option: CheckboxOption) => {
    return ["checkbox", option.disabled && "checkbox--disabled"]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div
      className={containerClasses}
      role="group"
      aria-labelledby={`${groupId}-label`}
    >
      <span className="checkbox-group__label" id={`${groupId}-label`}>
        {label}
        {optional && (
          <span className="checkbox-group__optional"> (Optionnel)</span>
        )}
      </span>

      {helpText && (
        <p className="checkbox-group__help" id={helpId}>
          {helpText}
        </p>
      )}

      <div className="checkbox-group__options">
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;

          const isChecked = selectedValues.includes(option.value);

          return (
            <div key={option.value} className={getCheckboxClass(option)}>
              <input
                type="checkbox"
                id={optionId}
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={option.disabled || disabled}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                className="checkbox__input"
                aria-describedby={messageId}
              />

              <label className="checkbox__label" htmlFor={optionId}>
                <span className="checkbox__text">
                  <span className="checkbox__option-label">{option.label}</span>
                  {option.subtext && (
                    <span className="details checkbox__subtext">
                      {option.subtext}
                    </span>
                  )}
                </span>
              </label>
            </div>
          );
        })}
      </div>

      {message && (
        <p
          className={`checkbox-group__message checkbox-group__message--${status}`}
          id={messageId}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CheckboxGroup;
