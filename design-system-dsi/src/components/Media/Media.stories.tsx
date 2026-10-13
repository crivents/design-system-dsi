import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Media from "./Media";

const meta: Meta<typeof Media> = {
  title: "Components/Media",
  component: Media,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Composant générique pour afficher une image ou un SVG. Le type vidéo sera ajouté dans une itération future.",
      },
    },
  },
  argTypes: {
    ratio: {
      control: { type: "select" },
      options: ["1/1", "4/3", "3/2", "16/9", "21/9", "auto"],
    },
    rounded: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Media>;

export const Image: Story = {
  args: {
    type: "image",
    src: "https://via.placeholder.com/800x450",
    alt: "Illustration d’une personne devant un ordinateur",
    ratio: "16/9",
    rounded: true,
    caption: "Source : Cnam",
  },
};

export const ImageSansLégende: Story = {
  args: {
    type: "image",
    src: "https://via.placeholder.com/800x450",
    alt: "Illustration sans légende",
    ratio: "16/9",
    rounded: true,
  },
};

export const SvgFichier: Story = {
  args: {
    type: "svg",
    src: "/logos/logo.svg",
    alt: "Logo de l’établissement",
    ratio: "auto",
  },
};

export const SvgInline: Story = {
  args: {
    type: "svg",
    src: "",
    alt: "Icône informative",
    ratio: "1/1",
    children: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
      </svg>
    ),
  },
};
