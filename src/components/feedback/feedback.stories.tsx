import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Feedback from "./feedback";

/* ==========================================================================
   MÉTADONNÉES
   ========================================================================== */

const meta: Meta<typeof Feedback> = {
  title: "Components/Feedback",
  component: Feedback,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Composant de retour utilisateur en plusieurs étapes : notation, précision, remerciement.",
      },
    },
  },
  argTypes: {
    maxRating: { control: { type: "number" } },
    detailThreshold: { control: { type: "number" } },
  },
};

export default meta;
type Story = StoryObj<typeof Feedback>;

/* ==========================================================================
   STORIES
   ========================================================================== */

/** Étape 1 : notation */
export const Rating: Story = {
  name: "Étape 1 — Notation",
  args: {
    maxRating: 5,
    detailThreshold: 2,
  },
};

/** Étape 2 : précision (après une note basse) */
export const Detail: Story = {
  name: "Étape 2 — Précision",
  args: {
    maxRating: 5,
    detailThreshold: 2,
  },
};

/** Étape 3 : remerciement */
export const Thanks: Story = {
  name: "Étape 3 — Remerciement",
  args: {
    maxRating: 5,
  },
};

/** Parcours complet interactif */
const InteractiveFeedback: React.FC = () => {
  const [closed, setClosed] = React.useState(false);

  if (closed) {
    return <p>Feedback fermé.</p>;
  }

  return (
    <Feedback onSubmit={(data) => console.log("Feedback envoyé :", data)} />
  );
};

export const Interactive: Story = {
  name: "Interactif",
  render: () => <InteractiveFeedback />,
};
