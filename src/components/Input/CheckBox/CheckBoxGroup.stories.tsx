import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CheckboxGroup, { type CheckboxOption } from "./CheckBoxGroup";

const meta: Meta<typeof CheckboxGroup> = {
  title: "Components/Input/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Groupe de cases à cocher accessible.",
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const defaultOptions: CheckboxOption[] = [
  { value: "student", label: "Étudiant" },
  { value: "apprentice", label: "Apprenti" },
  { value: "professional", label: "Professionnel" },
];

const withDescriptionOptions: CheckboxOption[] = [
  {
    value: "student",
    label: "Étudiant",
    subtext: "sous-texte",
  },
  {
    value: "apprentice",
    label: "Apprenti",
    subtext: "En alternance",
  },
  {
    value: "professional",
    label: "Professionnel",
    subtext: "En reconversion",
  },
];

export const Default: Story = {
  args: {
    id: "statut",
    name: "statut",
    label: "Statut",
    options: defaultOptions,
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    direction: "horizontal",
  },
};

export const AvecDescription: Story = {
  args: {
    ...Default.args,
    options: withDescriptionOptions,
  },
};

export const AvecSélection: Story = {
  args: {
    ...Default.args,
    defaultValue: ["student", "professional"],
  },
};

export const Désactivé: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
