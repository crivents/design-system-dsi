import React from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import Icon, { type IconName } from "../../Icon/Icon";
import Collapsible from "../../Collapsible/Collapsible";

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
  /** Option désactivée */
  disabled?: boolean;
  /** Message du radio */
  message?: ReactNode;
  /** Icône du radio */
  icon?: IconName;
}

export interface RadioGroupProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "defaultValue"
> {
  id: string;
  name: string;
  label: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  optional?: boolean;
  helpText?: string;
  message?: string;
  status?: "error" | "success" | "disabled" | "";
  direction?: "vertical" | "horizontal";
  className?: string;
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

  const hasMessage = options.some((option) => option.message != null);

  const getRadioClass = (option: RadioOption) => {
    const isChecked = selectedValue === option.value;

    return [
      "radio",
      hasMessage && "radio--with-message",
      isChecked && "radio--checked",
      option.disabled && "radio--disabled",
    ]
      .filter(Boolean)
      .join(" ");
  };

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
            <div key={option.value} className={getRadioClass(option)}>
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
                {option.icon ? (
                  <Icon
                    name={option.icon}
                    className="radio__icon"
                    aria-hidden="true"
                  />
                ) : (
                  <div className="radio__custom-input" aria-hidden="true" />
                )}

                <span className="radio__text">
                  <span className="radio__option-label">{option.label}</span>
                  {option.subtext && (
                    <span className="details radio__subtext">
                      {option.subtext}
                    </span>
                  )}
                </span>

                {option.icon && (
                  <Icon
                    name="ChevronRight"
                    className="radio__icon-opening"
                    aria-hidden="true"
                  />
                )}
              </label>

              <Collapsible
                id={optionMessageId}
                isOpen={isChecked}
                role="status"
                live="polite"
                className="radio__message"
              >
                {option.message && (
                  <div className="radio__message-children">
                    {option.message}
                  </div>
                )}
              </Collapsible>
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
