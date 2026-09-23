import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import InputText from "./InputText";
import * as LucideIcons from "lucide-react";

const meta: Meta<typeof InputText> = {
  title: "Components/Input/InputText",
  component: InputText,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Champs de formulaire",
      },
    },
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "date"],
      description: "Type de champ natif",
      table: {
        defaultValue: { summary: "text" },
      },
    },
    label: {
      control: "text",
      description: "Libellé du champ",
    },
    optional: {
      control: "boolean",
      description: "Afficher la mention (Optionnel)",
    },
    helpText: {
      control: "text",
      description: "Texte d'aide sous le champ",
    },
    status: {
      control: { type: "select" },
      options: ["", "error", "success", "info"],
      description: "État du champ",
    },
    message: {
      control: "text",
      description: "Message affiché sous le champ",
    },
    placeholder: {
      control: "text",
      description: "Placeholder du champ",
    },
    disabled: {
      control: "boolean",
      description: "Désactiver le champ",
    },
    readOnly: {
      control: "boolean",
      description: "Lecture seule",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputText>;

// Story par défaut
export const Default: Story = {
  args: {
    label: "Libellé du champs",
    optional: false,
    helpText: "",
    placeholder: "Place holder",
    status: "",
    message: "",
    type: "text",
  },
};

// Date
export const Date: Story = {
  args: {
    label: "Libellé du champs",
    optional: false,
    helpText: "",
    placeholder: "Place holder",
    status: "",
    message: "",
    type: "date",
    className: "input--date",
  },
};

// Champ rempli
export const AvecTexte: Story = {
  args: {
    ...Default.args,
    label: "Nom",
    defaultValue: "Jean Dupont",
  },
};

// Champ avec texte d'aide
export const AvecAide: Story = {
  args: {
    ...Default.args,
    label: "Email",
    type: "email",
    helpText: "Format attendu : nom@exemple.fr",
    placeholder: "nom@exemple.fr",
  },
};

// Champ optionnel
export const Optionnel: Story = {
  args: {
    ...Default.args,
    label: "Téléphone",
    optional: true,
    placeholder: "01 23 45 67 89",
  },
};

// Champ en erreur
export const Erreur: Story = {
  args: {
    ...Default.args,
    label: "Email",
    type: "email",
    defaultValue: "email_invalide",
    status: "error",
    message: "Adresse e-mail invalide.",
    placeholder: "nom@exemple.fr",
  },
};

// Champ en succès
export const Succès: Story = {
  args: {
    ...Default.args,
    label: "Email",
    type: "email",
    defaultValue: "jean.dupont@exemple.fr",
    status: "success",
    message: "",
    placeholder: "nom@exemple.fr",
  },
};

// Champ désactivé
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Champ en lecture seule
export const ReadOnly: Story = {
  args: {
    ...Default.args,
    defaultValue: "Valeur en lecture seule",
    readOnly: true,
  },
};

// Champ avec icône
export const AvecIcône: Story = {
  args: {
    ...Default.args,
    label: "Recherche",
    placeholder: "Rechercher…",
    iconName: "Search" as keyof typeof LucideIcons,
    iconAriaLabel: "",
  },
};

// Type email
export const TypeEmail: Story = {
  args: {
    ...Default.args,
    label: "Email",
    type: "email",
    placeholder: "nom@exemple.fr",
  },
};
