import React from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import Button from "../../Button/Button";

/* ==========================================================================
   TYPES
   ========================================================================== */

interface InputTextCustomProps {
  /** Identifiant unique du champ (pour l'association label/input) */
  id: string;
  /** Libellé du champ */
  label: string;
  /** Type du champs */
  type?:
    | "text"
    | "email"
    | "number"
    | "password"
    | "date"
    | "tel"
    | "url"
    | "textarea";
  /** Texte optionnel affiché dans le label */
  optional?: boolean;
  /** Texte d'aide (ex: format attendu) */
  helpText?: string;
  /** Message d'erreur ou de succès */
  message?: ReactNode;
  /** Status du champs (erreur, succès) */
  status?: "error" | "success" | "disabled" | "";
  /** Classes additionnelles sur le conteneur */
  className?: string;
  /** Classes additionnelles sur le champ */
  fieldClassName?: string;
  /** Nom du champs */
  name?: string;
  /** Place holder */
  placeHolder?: string;
  /** Icone du champs */
  iconName?: keyof typeof import("lucide-react");
  /** Description du bouton pour les lecteurs d'écrans */
  iconAriaLabel?: string;
  /** Evènement lors du clique sur l'icone */
  onIconClick?: () => void;
  /** Champs en lecute seul */
  readonly?: boolean;
  /** Les messages d'erreur ou de succès sont affichés ? */
  showMessages?: boolean;
}

type InputAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type"
>;

type TextareaAttributes = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "type"
>;

export type InputTextProps = InputTextCustomProps &
  (InputAttributes | TextareaAttributes);

/* ==========================================================================
   COMPOSANT
   ========================================================================== */
const InputText: React.FC<InputTextProps> = ({
  id,
  label,
  type = "text",
  optional = false,
  helpText,
  message,
  status,
  className = "",
  fieldClassName = "",
  name = "",
  disabled = false,
  placeholder = "",
  iconName,
  iconAriaLabel,
  onIconClick,
  readOnly,
  showMessages = true,
  ...rest
}) => {
  const inputId = id ? `input-${id}` : "input";
  const fieldClasses = ["input__field", fieldClassName]
    .filter(Boolean)
    .join(" ");
  const helpId = helpText ? `${inputId}-help` : undefined;
  const messageId = message ? `${inputId}-message` : undefined;
  return (
    <FieldWrapper
      label={label}
      inputId={inputId}
      messageId={messageId}
      message={message}
      helpId={helpId}
      helpText={helpText}
      optional={optional}
      status={status}
      className={className}
      name={name}
      readOnly={readOnly}
      showMessages={showMessages}
    >
      <div className="input__field-wrapper">
        {type === "textarea" ? (
          <textarea
            id={inputId}
            className={fieldClasses}
            aria-describedby={messageId}
            disabled={disabled}
            required={!optional}
            placeholder={placeholder}
            readOnly={readOnly}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={inputId}
            type={type}
            className={fieldClasses}
            aria-describedby={messageId}
            disabled={disabled}
            required={!optional}
            placeholder={placeholder}
            readOnly={readOnly}
            {...rest}
          />
        )}

        {iconName && (
          <Button
            label=""
            variant="tertiary"
            className="input__icon-button"
            onClick={onIconClick}
            aria-label={iconAriaLabel}
            iconLeft={iconName}
          ></Button>
        )}
      </div>
    </FieldWrapper>
  );
};

export default InputText;
