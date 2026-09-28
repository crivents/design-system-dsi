import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as LucideIcons from "lucide-react";
import Button from "./Button";

/**
 * Métadonnées du composant.
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Bouton d'action avec plusieurs variantes.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "cnam", "secondary", "danger", "tertiary"],
      description: "Style du bouton",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Désactiver le bouton",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "Libellé du bouton",
      table: {
        type: { summary: "string" },
      },
    },
    ariaLabel: {
      control: "text",
      description: "Libellé du bouton",
    },
    iconRight: {
      control: { type: "select" },
      options: Object.keys(LucideIcons),
      description: "Icône optionnelle (ReactNode) à afficher après le texte",
    },
    iconLeft: {
      control: { type: "select" },
      options: Object.keys(LucideIcons),
      description: "Icône optionnelle (ReactNode) à afficher avant le texte",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Story principale (obligatoire pour la documentation)
export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Valider",
    disabled: false,
  },
};

export const Cnam: Story = {
  args: {
    variant: "cnam",
    label: "Se connecter",
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Annuler",
    disabled: false,
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    label: "Supprimer",
    disabled: false,
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    label: "En savoir plus",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    label: "Désactivé",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    label: "Rechercher",
    iconRight: "Search",
    disabled: false,
  },
};

export const IconOnly: Story = {
  args: {
    variant: "primary",
    label: "",
    iconLeft: "Search",
    disabled: false,
  },
};
