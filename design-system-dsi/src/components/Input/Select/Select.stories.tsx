import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Input/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Liste déroulante accessible avec label, aide et message.",
      },
    },
  },
  argTypes: {
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
      options: ["", "error", "success", "disabled"],
      description: "Statut du champ",
    },
    message: {
      control: "text",
      description: "Message affiché sous le champ",
    },
    placeholder: {
      control: "text",
      description: "Option vide par défaut",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { value: "fr", label: "France" },
  { value: "be", label: "Belgique" },
  { value: "ch", label: "Suisse" },
  { value: "ca", label: "Canada" },
  { value: "other", label: "Autre", disabled: true },
];

export const Default: Story = {
  args: {
    id: "pays",
    label: "Pays",
    options: defaultOptions,
    placeholder: "Sélectionnez un pays",
  },
};

export const AvecAide: Story = {
  args: {
    ...Default.args,
    helpText: "Sélectionnez votre pays de résidence",
  },
};

export const Optionnel: Story = {
  args: {
    ...Default.args,
    label: "Région",
    optional: true,
    placeholder: "Optionnel",
  },
};

export const Erreur: Story = {
  args: {
    ...Default.args,
    status: "error",
    message: "Veuillez sélectionner un pays.",
  },
};

export const Succès: Story = {
  args: {
    ...Default.args,
    status: "success",
  },
};

export const Désactivé: Story = {
  args: {
    ...Default.args,
    status: "disabled",
    disabled: true,
  },
};
