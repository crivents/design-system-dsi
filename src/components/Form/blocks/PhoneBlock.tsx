// WIP : ce composant est en cours de développement et n'est pas encore prêt pour une utilisation en production. Il peut contenir des bugs ou des fonctionnalités incomplètes.

import React from "react";
import FormFieldset from "../FormFieldset";
import InputText from "../../Input/InputText/InputText";

export interface PhoneBlockProps {
  /** Préfixe des IDs */
  idPrefix?: string;
  /** Valeur par défaut */
  defaultValue?: string;
  /** Indique si le bloc est requis */
  required?: boolean;
}

const PhoneBlock: React.FC<PhoneBlockProps> = ({
  idPrefix = "phone",
  defaultValue = "",
  required = true,
}) => {
  return (
    <FormFieldset legend="Téléphone" name={""}>
      <InputText
        id={`${idPrefix}-number`}
        name="phone"
        label="Numéro de téléphone"
        type="tel"
        placeholder="01 23 45 67 89"
        defaultValue={defaultValue}
        optional={!required}
        autoComplete="tel"
      />
    </FormFieldset>
  );
};

export default PhoneBlock;
