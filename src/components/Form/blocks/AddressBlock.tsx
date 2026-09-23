// WIP : ce composant est en cours de développement et n'est pas encore prêt pour une utilisation en production. Il peut contenir des bugs ou des fonctionnalités incomplètes.

import React from "react";
import FormFieldset from "../FormFieldset";
import InputText from "../../Input/InputText/InputText";

export interface AddressBlockProps {
  /** Préfixe des IDs */
  idPrefix?: string;
  /** Valeurs par défaut */
  defaultValue?: {
    street?: string;
    zipCode?: string;
    city?: string;
  };
  /** Indique si le bloc est requis */
  required?: boolean;
}

const AddressBlock: React.FC<AddressBlockProps> = ({
  idPrefix = "address",
  defaultValue = {},
  required = true,
}) => {
  return (
    <FormFieldset legend="Adresse" name={""}>
      <InputText
        id={`${idPrefix}-street`}
        name="street"
        label="Rue"
        placeholder="Numéro et nom de rue"
        defaultValue={defaultValue.street}
        optional={!required}
        autoComplete="street-address"
      />

      <InputText
        id={`${idPrefix}-zipcode`}
        name="zipcode"
        label="Code postal"
        placeholder="75001"
        defaultValue={defaultValue.zipCode}
        optional={!required}
        autoComplete="postal-code"
      />

      <InputText
        id={`${idPrefix}-city`}
        name="city"
        label="Ville"
        placeholder="Paris"
        defaultValue={defaultValue.city}
        optional={!required}
        autoComplete="address-level2"
      />
    </FormFieldset>
  );
};

export default AddressBlock;
