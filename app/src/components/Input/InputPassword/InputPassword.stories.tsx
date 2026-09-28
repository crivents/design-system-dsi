import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import InputPassword from "./InputPassword";

const meta: Meta<typeof InputPassword> = {
  title: "Components/Input/InputPassword",
  component: InputPassword,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Champ mot de passe avec fonctionnalités spécifiques",
      },
    },
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof InputPassword>;

export const Default: Story = {
  args: {
    label: "Mot de passe",
    placeholder: "••••••••",
    optional: false,
    status: "",
  },
};

export const WithOutConstrainst: Story = {
  args: {
    label: "Mot de passe",
    placeholder: "••••••••",
    optional: false,
    status: "",
    showConstraints: false,
  },
};
