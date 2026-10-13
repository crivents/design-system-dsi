// WIP : ce composant est en cours de développement et n'est pas encore prêt pour une utilisation en production. Il peut contenir des bugs ou des fonctionnalités incomplètes.

import React from "react";
import FormFieldset from "../FormFieldset";
import InputText from "../../Input/InputText/InputText";

export interface NameBlockProps {
  /** Préfixe des IDs */
  idPrefix?: string;
  /** Valeurs par défaut */
  defaultValue?: {
    firstName?: string;
    lastName?: string;
  };
  /** Indique si le bloc est requis */
  required?: boolean;
}

const NameBlock: React.FC<NameBlockProps> = ({
  idPrefix = "name",
  defaultValue = {},
  required = true,
}) => {
  return (
    <FormFieldset legend="Nom et prénom" name={""}>
      <InputText
        id={`${idPrefix}-lastname`}
        name="lastname"
        label="Nom"
        placeholder="Votre nom"
        defaultValue={defaultValue.lastName}
        optional={!required}
        autoComplete="family-name"
      />

      <InputText
        id={`${idPrefix}-firstname`}
        name="firstname"
        label="Prénom"
        placeholder="Votre prénom"
        defaultValue={defaultValue.firstName}
        optional={!required}
        autoComplete="given-name"
      />
    </FormFieldset>
  );
};

export default NameBlock;
