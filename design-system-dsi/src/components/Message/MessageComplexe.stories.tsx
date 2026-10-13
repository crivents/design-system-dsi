import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import MessageComplexe from "./MessageComplexe";
import Icon from "../Icon/Icon";
import Message from "./Message";

const meta: Meta<typeof MessageComplexe> = {
  title: "Components/Message/MessageComplexe",
  component: MessageComplexe,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Message complexe sans fond, avec sous-parties. Accessible : rôle ARIA, aria-live, structure sémantique.",
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
      description: "Titre principal",
    },

    autoFocus: {
      control: "boolean",
      description: "Focaliser le message à l'apparition",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageComplexe>;

export const Simple: Story = {
  args: {
    type: "info",
    title: "Titre principal",
    children: "Contenu principal du message sans sous-parties.",
  },
};

export const AvecSections: Story = {
  args: {
    type: "info",
    title: "Message avec sous-parties",
    children: "Contenu introductif avant les sections.",
    sections: [
      {
        id: "section-1",
        title: "Première sous-partie",
        children: (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Icon name={"AArrowDown"} />
            Section avec un contenu plus complexe, incluant une icône et du
            texte.
          </div>
        ),
      },
      {
        id: "section-2",
        title: "Deuxième sous-partie",
        children: (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Icon name={"AArrowDown"} />
              Section avec un contenu plus complexe, incluant une icône et du
              texte.
            </div>
            <Message type={"info"} title="Message imbriqué">
              Message imbriqué à l'intérieur de la section, démontrant la
              possibilité d'avoir des messages complexes à différents niveaux.
            </Message>
          </div>
        ),
      },
    ],
  },
};

export const ErreurAvecSections: Story = {
  args: {
    type: "error",
    title: "Erreur de validation",
    children: "Veuillez corriger les erreurs suivantes :",
    autoFocus: true,
    sections: [
      {
        id: "erreur-1",
        title: "Email",
        children: "L'adresse email est invalide.",
      },
      {
        id: "erreur-2",
        title: "Mot de passe",
        children: "Le mot de passe doit contenir au moins 8 caractères.",
      },
    ],
  },
};
