import React from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface FieldWrapperProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id"
> {
  /** Libellé du champ */
  label: string;
  /** ID du champs associé */
  inputId: string;
  /** ID du message du champs associé*/
  messageId: string | undefined;
  /** ID de l'aide du champs associé */
  helpId?: string | undefined;
  /** Champs enfant */
  children: ReactNode;
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
  /** Champs en lecute seul */
  readOnly?: boolean;
  /** Les messages d'erreur ou de succès sont affichés ? */
  showMessages?: boolean;
}

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  inputId,
  messageId,
  helpId,
  children,
  optional = false,
  helpText,
  message,
  status,
  className = "",
  name = "",
  disabled = false,
  readOnly,
  showMessages = true,
}) => {
  const containerClasses = [
    "input",
    status ? `input--${status}` : "",
    readOnly && "input--readonly",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <label className="input__label" htmlFor={inputId}>
        {label}
        {optional && <span className="input__optional"> (Optionnel)</span>}
      </label>
      {helpText && (
        <p className="input__help" id={helpId}>
          {helpText}
        </p>
      )}
      {children}
      {showMessages && (
        <p
          className="input__message"
          id={messageId}
          aria-live="assertive"
          role="alert"
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default FieldWrapper;
