import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";
import * as LucideIcons from "lucide-react";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Bouton d'action avec plusieurs variantes.",
      },
    },
  },
  argTypes: {
    icon: {
      control: { type: "select" },
      options: Object.keys(LucideIcons),
      description: "Icône optionnelle (ReactNode) à afficher après le texte",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    label: "Libellé du lien",
    disabled: false,
    download: false,
  },
};
export const WithIcon: Story = {
  args: {
    label: "Libellé du lien",
    disabled: false,
    download: false,
    icon: "AArrowUpIcon",
  },
};
