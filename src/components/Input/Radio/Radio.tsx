import React from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface RadioOption {
  /** Valeur de l'option */
  value: string;
  /** Libellé affiché */
  label: string;
  /** Sous texte du libellé */
  subtext?: string;
  /** Description optionnelle */
  description?: string;
  /** Option désactivée */
  disabled?: boolean;
  /** Message du radio */
  message?: ReactNode;
}

export interface RadioGroupProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "defaultValue"
> {
  /** Identifiant unique du groupe */
  id: string;
  /** Nom du groupe (pour l'association des radios) */
  name: string;
  /** Libellé du groupe */
  label: string;
  /** Liste des options */
  options: RadioOption[];
  /** Valeur sélectionnée */
  value?: string;
  /** Valeur par défaut */
  defaultValue?: string;
  /** Texte optionnel affiché dans le label */
  optional?: boolean;
  /** Texte d'aide */
  helpText?: string;
  /** Message d'erreur ou de succès */
  message?: string;
  /** Statut du groupe */
  status?: "error" | "success" | "disabled" | "";
  /** Direction d'affichage */
  direction?: "vertical" | "horizontal";
  /** Classes additionnelles sur le conteneur */
  className?: string;
  /** Évènement lors du changement */
  onChange?: (value: string) => void;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const RadioGroup: React.FC<RadioGroupProps> = ({
  id,
  name,
  label,
  options,
  value: controlledValue,
  defaultValue,
  optional = false,
  helpText,
  message,
  status = "",
  direction = "vertical",
  className = "",
  onChange,
  ...rest
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const groupId = id ? `radio-${id}` : "radio";
  const helpId = helpText ? `${groupId}-help` : undefined;
  const messageId = message ? `${groupId}-message` : undefined;

  const selectedValue =
    controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const containerClasses = [
    "radio-group",
    `radio-group--${direction}`,
    status ? `radio-group--${status}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={containerClasses}
      role="radiogroup"
      aria-labelledby={`${groupId}-label`}
    >
      <span className="radio-group__label" id={`${groupId}-label`}>
        {label}
        {optional && (
          <span className="radio-group__optional"> (Optionnel)</span>
        )}
      </span>

      {helpText && (
        <p className="radio-group__help" id={helpId}>
          {helpText}
        </p>
      )}

      <div className="radio-group__options">
        {options.map((option, index) => {
          const optionId = `${groupId}-${option.value}`;
          const optionMessageId = option.message
            ? `${optionId}-message`
            : undefined;
          const isChecked = selectedValue === option.value;

          return (
            <div
              key={option.value}
              className={`radio ${option.disabled ? "radio--disabled" : ""}`}
            >
              <input
                type="radio"
                id={optionId}
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={option.disabled || status === "disabled"}
                onChange={handleChange}
                className="radio__input"
                aria-describedby={optionMessageId || messageId}
                {...(index === 0 ? rest : {})}
              />
              <label className="radio__label" htmlFor={optionId}>
                <div className="radio__custom-input"></div>
                <span className="radio__text">
                  <span className="radio__option-label">{option.label}</span>
                  {option.subtext && (
                    <span className="details radio__subtext">
                      {option.subtext}
                    </span>
                  )}
                  {option.description && (
                    <span className="radio__description">
                      {option.description}
                    </span>
                  )}
                </span>
              </label>

              {/* Message spécifique à l'option (si présent) */}
              {option.message && (
                <p
                  className="radio__message"
                  id={optionMessageId}
                  role="status"
                  aria-live="polite"
                >
                  {option.message}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p
        className="input__message"
        id={`${groupId}-validation-message`}
        role="status"
        aria-live="polite"
      />
    </div>
  );
};

export default RadioGroup;
