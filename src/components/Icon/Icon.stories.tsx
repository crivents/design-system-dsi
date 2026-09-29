import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./Icon";
import * as LucideIcons from "lucide-react";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Bouton d'action avec plusieurs variantes.",
      },
    },
  },
  argTypes: {
    name: {
      control: { type: "select" },
      options: Object.keys(LucideIcons),
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Search",
    size: "md",
  },
};
