// WIP : ce composant est en cours de développement et n'est pas encore prêt pour une utilisation en production. Il peut contenir des bugs ou des fonctionnalités incomplètes.

import React from "react";
import FormFieldset from "../FormFieldset";
import InputText from "../../Input/InputText/InputText";

export interface DateBlockProps {
  /** Préfixe des IDs */
  idPrefix?: string;
  /** Libellé du bloc */
  legend?: string;
  /** Valeurs par défaut */
  defaultValue?: {
    date?: string;
    place?: string;
  };
  /** Indique si le bloc est requis */
  required?: boolean;
}

const DateBlock: React.FC<DateBlockProps> = ({
  idPrefix = "date",
  legend = "Date",
  defaultValue = {},
  required = true,
}) => {
  return (
    <FormFieldset legend={legend} name={""}>
      <InputText
        id={`${idPrefix}-date`}
        name="date"
        label="Date"
        type="date"
        defaultValue={defaultValue.date}
        optional={!required}
      />

      <InputText
        id={`${idPrefix}-place`}
        name="place"
        label="Lieu"
        placeholder="Lieu de l'évènement"
        defaultValue={defaultValue.place}
        optional={!required}
      />
    </FormFieldset>
  );
};

export default DateBlock;
