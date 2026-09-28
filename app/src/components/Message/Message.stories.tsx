import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Message from "./Message";

const meta: Meta<typeof Message> = {
  title: "Components/Message/Message",
  component: Message,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Message simple avec fond coloré. Accessible : rôle ARIA, aria-live, focus automatique optionnel.",
      },
    },
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
      description: "Type de message",
      table: {
        defaultValue: { summary: "info" },
      },
    },
    title: {
      control: "text",
      description: "Titre du message",
    },
    hideIcon: {
      control: "boolean",
      description: "Masquer l'icône",
    },
    dismissible: {
      control: "boolean",
      description: "Afficher le bouton de fermeture",
    },
    autoFocus: {
      control: "boolean",
      description: "Focaliser le message à l'apparition",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

export const Info: Story = {
  args: {
    type: "info",
    title: "Information",
    children: "Ceci est un message d'information.",
  },
};

export const Succès: Story = {
  args: {
    type: "success",
    title: "Opération réussie",
    children: "Votre demande a été enregistrée avec succès.",
  },
};

export const Avertissement: Story = {
  args: {
    type: "warning",
    title: "Attention",
    children: "Votre session expire dans 5 minutes.",
  },
};

export const Erreur: Story = {
  args: {
    type: "error",
    title: "Erreur",
    children: "Une erreur est survenue lors du traitement.",
    autoFocus: true,
  },
};

export const SansIcône: Story = {
  args: {
    type: "info",
    title: "Information",
    children: "Message sans icône.",
    hideIcon: true,
  },
};

export const Fermable: Story = {
  args: {
    type: "success",
    title: "Message fermable",
    children: "Cliquez sur la croix pour fermer.",
    dismissible: true,
    onDismiss: () => console.log("Message fermé"),
  },
};
