import React from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import Icon, { type IconName } from "../../Icon/Icon";
import Message from "../../Message/Message";
import Collapsible from "../../Collapsible/Collapsible";

/* ==========================================================================
   TYPES
   ========================================================================== */

export type SwitchVariant = "toggle" | "yesno" | "multi";

export interface SwitchOption {
  /** Valeur de l'option */
  value: string;
  /** Libellé affiché */
  label: string;
  /** Icon affiché */
  icon?: IconName;
}

export interface SwitchMessageProps {
  /** Type de message */
  type?: "info" | "success" | "warning" | "error";
  /** Titre du message */
  title?: string;
  /** Contenu du message */
  children: ReactNode;
}

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> {
  /** Identifiant unique du switch */
  id: string;
  /** Libellé principal */
  label: string;
  /** Type de switch */
  variant?: SwitchVariant;
  /** Options pour le switch multi (uniquement si variant="multi") */
  options?: SwitchOption[];
  /** Valeur par défaut spécifique pour le multi (si absent, première option) */
  optionsDefault?: SwitchOption["value"];
  /** Valeur sélectionnée (contrôlé) */
  value?: string;
  /** Valeur par défaut (non contrôlé) */
  defaultValue?: string;
  /** Texte optionnel affiché dans le label */
  optional?: boolean;
  /** Texte d'aide */
  helpText?: string;
  /** Message d'état */
  message?: SwitchMessageProps;
  /** Statut du switch */
  status?: "error" | "success" | "disabled" | "";
  /** Icones pour le mode toggle (si variant="toggle") */
  icons?: {
    /** Icône quand OFF */
    off?: IconName;
    /** Icône quand ON */
    on?: IconName;
  };
  /** Labels pour le mode yesno (si variant="yesno") */
  labels?: {
    /** Label quand OFF */
    off: string;
    /** Label quand ON */
    on: string;
  };
  /** Classes additionnelles sur le conteneur */
  className?: string;
  /** Évènement lors du changement */
  onChange?: (value: string | boolean) => void;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Switch: React.FC<SwitchProps> = ({
  id,
  label,
  variant = "yesno",
  options = [],
  optionsDefault,
  value: controlledValue,
  defaultValue,
  optional = false,
  helpText,
  message,
  status = "",
  icons,
  labels = { off: "Non", on: "Oui" },
  className = "",
  onChange,
  ...rest
}) => {
  const switchId = id ? `switch-${id}` : "switch";
  const helpId = helpText ? `${switchId}-help` : undefined;
  const messageId = message ? `${switchId}-message` : undefined;

  // Déterminer la valeur par défaut pour le multi
  const getDefaultMultiValue = (): string => {
    if (optionsDefault) return optionsDefault;
    if (defaultValue) return defaultValue;
    if (options.length > 0) return options[0].value;
    return "";
  };

  // État interne pour les variantes toggle et yesno
  const [internalChecked, setInternalChecked] = React.useState(
    defaultValue === "true" || defaultValue === "on" || false,
  );

  // État interne pour la variante multi (avec valeur par défaut automatique)
  const [internalValue, setInternalValue] = React.useState(
    getDefaultMultiValue(),
  );

  const isChecked =
    controlledValue !== undefined
      ? controlledValue === "true" || controlledValue === "on"
      : internalChecked;

  const selectedValue =
    controlledValue !== undefined ? controlledValue : internalValue;

  const isMessageExpanded =
    variant === "multi" ? Boolean(selectedValue) : isChecked;

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    if (controlledValue === undefined) {
      setInternalChecked(checked);
    }

    if (onChange) {
      onChange(checked);
    }
  };

  const handleMultiChange = (optionValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(optionValue);
    }

    if (onChange) {
      onChange(optionValue);
    }
  };

  // Calculer la position du thumb pour le multi
  const getMultiThumbStyle = (): React.CSSProperties => {
    const selectedIndex = selectedValue
      ? options.findIndex((option) => option.value === selectedValue)
      : 0;

    const safeIndex = selectedIndex >= 0 ? selectedIndex : 0;
    const optionWidth = 100 / options.length;

    return {
      left: `${safeIndex * optionWidth}%`,
      width: `${optionWidth}%`,
    };
  };

  const containerClasses = [
    "input",
    "switch-group",
    `switch-group--${variant}`,
    status ? `switch-group--${status}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <label className="input__label switch-group__label" htmlFor={switchId}>
        {label}
        {optional && (
          <span className="input__optional switch-group__optional">
            {" "}
            (Optionnel)
          </span>
        )}
      </label>

      {helpText && (
        <p className="input__help switch-group__help" id={helpId}>
          {helpText}
        </p>
      )}

      <div className="conteneur-switch">
        {/* Variante toggle (icône) */}
        {variant === "toggle" && (
          <div className="switch switch--toggle">
            <input
              type="checkbox"
              id={switchId}
              className="switch__input"
              checked={isChecked}
              disabled={status === "disabled"}
              onChange={handleToggleChange}
              aria-describedby={messageId}
              {...rest}
            />
            <label className="switch__track" htmlFor={switchId}>
              <span className="switch__thumb">
                {icons && (
                  <Icon
                    name={isChecked ? icons.on || "Check" : icons.off || "X"}
                    size="sm"
                    className="switch__icon"
                  />
                )}
              </span>
            </label>
          </div>
        )}

        {/* Variante yes/no */}
        {variant === "yesno" && (
          <label
            className="switch switch--yesno"
            aria-label={`Basculer entre ${labels.off} et ${labels.on}`}
          >
            <input
              type="checkbox"
              id={switchId}
              className="switch__input"
              checked={isChecked}
              disabled={status === "disabled"}
              onChange={handleToggleChange}
              aria-describedby={messageId}
              {...rest}
            />
            <div className="switch__track">
              <div className="switch__thumb"></div>
              <div className="switch__labels">
                <span
                  className={`switch__label switch__label--off ${!isChecked ? "is-active" : ""}`}
                >
                  {labels.off}
                </span>
                <span
                  className={`switch__label switch__label--on ${isChecked ? "is-active" : ""}`}
                >
                  {labels.on}
                </span>
              </div>
            </div>
          </label>
        )}

        {/* Variante multi (même design que yes/no mais avec plus d'options) */}
        {variant === "multi" && (
          <div
            className="switch switch--multi"
            role="radiogroup"
            style={{
              gridTemplateColumns: `repeat(${options.length}, 1fr)`,
            }}
          >
            {/* Thumb glissant positionné dynamiquement */}
            <div
              className="switch__thumb"
              style={getMultiThumbStyle()}
              aria-hidden="true"
            />

            {options.map((option) => {
              const optionId = `${switchId}-${option.value}`;
              const isSelected = selectedValue === option.value;

              return (
                <div
                  key={option.value}
                  className={`switch__option ${isSelected ? "is-selected" : ""}`}
                >
                  <input
                    type="radio"
                    id={optionId}
                    name={switchId}
                    value={option.value}
                    checked={isSelected}
                    disabled={status === "disabled"}
                    onChange={() => handleMultiChange(option.value)}
                    className="switch__input"
                    aria-describedby={messageId}
                  />
                  <label className="switch__option-label" htmlFor={optionId}>
                    <Icon name={option.icon} />
                    <span className="switch__label-text">{option.label}</span>
                  </label>
                </div>
              );
            })}
          </div>
        )}

        {/* Message animé */}
        {message && (
          <Collapsible
            id={messageId}
            isOpen={isMessageExpanded}
            role="status"
            aria-live="polite"
            className="switch__message-wrapper"
          >
            <Message
              type={message.type || "info"}
              title={message.title || ""}
              hideIcon={false}
              className="message--switch"
            >
              {message.children}
            </Message>
          </Collapsible>
        )}
      </div>
    </div>
  );
};

export default Switch;
