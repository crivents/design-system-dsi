import React, { useCallback, useEffect, useMemo, useState } from "react";
import InputText, { type InputTextProps } from "../InputText/InputText";
import Icon from "../../Icon/Icon";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface InputPasswordProps extends Omit<
  InputTextProps,
  "type" | "iconName"
> {
  /** Valeur du champ de confirmation (pour vérifier la concordance) */
  confirmationValue?: string;
  /** Afficher la liste des contraintes */
  showConstraints?: boolean;
  /** Contraintes personnalisées (remplace les contraintes par défaut) */
  constraints?: ConstraintProps[];
}

export interface ConstraintProps {
  id: string;
  description: string;
  test: (v: string) => boolean;
}

const DEFAULT_CONSTRAINTS: ConstraintProps[] = [
  {
    id: "length",
    description: "Comprendre au moins 12 caractères",
    test: (v) => v.length >= 12,
  },
  {
    id: "uppercase",
    description: "Inclure au moins une lettre majuscule",

    test: (v) => /[A-Z]/.test(v),
  },
  {
    id: "lowercase",
    description: "Inclure au moins une lettre minuscule",

    test: (v) => /[a-z]/.test(v),
  },
  {
    id: "digit",
    description: "Comporter au moins un chiffre",

    test: (v) => /\d/.test(v),
  },
  {
    id: "digitAndSpecial",
    description: "Comporter au moins un caractère spécial",

    test: (v) => /\d/.test(v) && /[^A-Za-z0-9]/.test(v),
  },
];

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const InputPassword: React.FC<InputPasswordProps> = ({
  confirmationValue,
  showConstraints = true,
  constraints = DEFAULT_CONSTRAINTS,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");

  const iconName = isVisible ? "EyeOff" : "Eye";

  const handleToggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [],
  );

  const constraintsWithStatus = useMemo(() => {
    return constraints.map((constraint) => ({
      ...constraint,
      isValid: constraint.test(value),
    }));
  }, [constraints, value]);

  // Vérification de la concordance des mots de passe
  const isMatching = useMemo(() => {
    if (confirmationValue === undefined) return true;
    return value === confirmationValue;
  }, [value, confirmationValue]);

  return (
    <div className="input-password">
      <InputText
        {...rest}
        type={isVisible ? "text" : "password"}
        value={value}
        onChange={handleChange}
        iconName={iconName}
        onIconClick={handleToggleVisibility}
        iconAriaLabel={
          isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"
        }
        autoComplete="new-password"
        showMessages={false} // On gère les messages d'erreur et de succès dans le composant InputPassword
      />

      {showConstraints && (
        <div className="input-password__help">
          <p className="details input-password__details">
            Le nouveau mot de passe doit valider les conditions suivantes :
          </p>
          <ul className="input-password__constraints">
            {constraintsWithStatus.map((constraint) => (
              <li
                key={constraint.id}
                className={`input-password__constraint ${constraint.isValid ? "is-valid" : "is-invalid"}`}
              >
                <Icon
                  name={constraint.isValid ? "Check" : "X"}
                  size="sm"
                  className="input-password__constraint-icon"
                />
                <span>{constraint.description}</span>
              </li>
            ))}
            {confirmationValue !== undefined && (
              <li
                className={`input-password__constraint ${
                  isMatching ? "is-valid" : "is-invalid"
                }`}
              >
                <Icon
                  name={isMatching ? "Check" : "X"}
                  size="sm"
                  className="input-password__constraint-icon"
                />
                <span>Les mots de passe saisis doivent concorder</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputPassword;
