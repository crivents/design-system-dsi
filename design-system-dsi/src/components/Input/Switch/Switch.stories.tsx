import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Switch from "./Switch";
import Icon from "../../Icon/Icon";

const meta: Meta<typeof Switch> = {
  title: "Components/Input/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Interrupteur avec trois variantes : icône, oui/non, choix multiple.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["toggle", "yesno", "multi"],
      description: "Type de switch",
      table: {
        defaultValue: { summary: "yesno" },
      },
    },
    status: {
      control: { type: "select" },
      options: ["", "error", "success", "disabled"],
      description: "Statut du switch",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const YesNo: Story = {
  args: {
    id: "yesno",
    label: "Question du switch",
    variant: "yesno",
    labels: { off: "Non", on: "Oui" },
  },
};

export const YesNoAvecMessage: Story = {
  args: {
    id: "yesno-message",
    label:
      "Besoin d'un aménagement spécifique pendant votre parcours de formation ?",
    variant: "yesno",
    labels: { off: "Non", on: "Oui" },
    message: {
      type: "info",
      title: "Information",
      children: (
        <>
          Cette réponse n'est pas conservée dans votre dossier d'inscription.
          Pour être accompagné, contactez la mission Handicnam.
        </>
      ),
    },
  },
};

export const Toggle: Story = {
  args: {
    id: "theme",
    label: "Mode sombre",
    variant: "toggle",
    icons: { off: "Sun", on: "Moon" },
  },
};

export const ToggleAvecMessage: Story = {
  args: {
    id: "theme-message",
    label: "Notifications",
    variant: "toggle",
    icons: { off: "Bell", on: "Bell" },
    message: {
      type: "info",
      title: "Notifications activées",
      children: "Vous recevrez des notifications par email.",
    },
  },
};

export const Multi: Story = {
  args: {
    id: "multi",
    label: "Choisissez une option",
    variant: "multi",
    options: [
      { value: "option1", label: "Option 1", icon: "Accessibility" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3", icon: "Calendar" },
    ],
  },
};
