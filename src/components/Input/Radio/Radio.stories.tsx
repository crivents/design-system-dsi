import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Radio, { type RadioOption } from "./Radio";

/* ==========================================================================
   MÉTADONNÉES
   ========================================================================== */

const meta: Meta<typeof Radio> = {
  title: "Components/Input/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Groupe de boutons radio accessible avec support des messages intégrés, icônes et descriptions.",
      },
    },
  },
  argTypes: {
    id: {
      control: "text",
      description: "Identifiant unique du groupe",
      table: {
        category: "Identification",
      },
    },
    name: {
      control: "text",
      description: "Nom du groupe (pour l'association des radios)",
      table: {
        category: "Identification",
      },
    },
    label: {
      control: "text",
      description: "Libellé du groupe",
      table: {
        category: "Contenu",
      },
    },
    optional: {
      control: "boolean",
      description: "Afficher la mention (Optionnel)",
      table: {
        category: "Contenu",
      },
    },
    helpText: {
      control: "text",
      description: "Texte d'aide affiché sous le libellé",
      table: {
        category: "Contenu",
      },
    },
    message: {
      control: "text",
      description: "Message global du groupe (erreur, succès)",
      table: {
        category: "État",
      },
    },
    status: {
      control: { type: "select" },
      options: ["", "error", "success", "disabled"],
      description: "Statut du groupe",
      table: {
        category: "État",
        defaultValue: { summary: '""' },
      },
    },
    direction: {
      control: { type: "radio" },
      options: ["vertical", "horizontal"],
      description: "Direction d'affichage des options",
      table: {
        category: "Affichage",
        defaultValue: { summary: "vertical" },
      },
    },
    defaultValue: {
      control: "text",
      description: "Valeur sélectionnée par défaut",
      table: {
        category: "État",
      },
    },
    onChange: {
      action: "changed",
      description: "Évènement lors du changement de sélection",
      table: {
        category: "Évènements",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

/* ==========================================================================
   DONNÉES DE TEST
   ========================================================================== */

const defaultOptions: RadioOption[] = [
  {
    value: "student",
    label: "Étudiant",
    description: "Inscrit en formation initiale",
    subtext: "sous-texte",
  },
  {
    value: "apprentice",
    label: "Apprenti",
    description: "En alternance",
  },
  {
    value: "professional",
    label: "Professionnel",
    description: "En reconversion",
  },
];

const disabledOptions: RadioOption[] = [
  {
    value: "student",
    label: "Étudiant",
    description: "Inscrit en formation initiale",
    disabled: true,
  },
  {
    value: "apprentice",
    label: "Apprenti",
    description: "En alternance",
    disabled: true,
  },
];

const messagesOptions: RadioOption[] = [
  {
    value: "student",
    label: "Étudiant",
    description: "Inscrit en formation initiale",
    subtext: "sous-texte",
    message: <span>Message de radio pour étudiant</span>,
  },
  {
    value: "apprentice",
    label: "Apprenti",
    description: "En alternance",
    subtext: "sous-texte",
    message: <span>Message de radio pour apprenti</span>,
  },
  {
    value: "professional",
    label: "Professionnel",
    description: "En reconversion",
    message: <span>Message de radio pour professionnel</span>,
  },
];

const iconOptions: RadioOption[] = [
  {
    value: "accessibility",
    label: "Accessibilité",
    description: "Inscrit en formation initiale",
    subtext: "sous-texte",
    icon: "Accessibility",
    message: <span>Message de radio avec icône</span>,
  },
  {
    value: "clock",
    label: "Horloge",
    description: "En alternance",
    subtext: "sous-texte",
    icon: "AlarmClock",
    message: <span>Message de radio avec icône</span>,
  },
  {
    value: "calendar",
    label: "Calendrier",
    description: "En reconversion",
    subtext: "sous-texte",
    icon: "Calendar",
    message: <span>Message de radio avec icône</span>,
  },
];

/* ==========================================================================
   STORIES
   ========================================================================== */

/** Story de base avec les options par défaut */
export const Default: Story = {
  name: "Défaut",
  args: {
    id: "statut",
    name: "statut",
    label: "Statut",
    options: defaultOptions,
  },
};

/** Story avec disposition horizontale */
export const Horizontal: Story = {
  name: "Horizontal",
  parameters: {
    docs: {
      description: {
        story: "Les options sont disposées horizontalement.",
      },
    },
  },
  args: {
    ...Default.args,
    direction: "horizontal",
  },
};

/** Story avec texte d'aide */
export const AvecAide: Story = {
  name: "Avec aide",
  parameters: {
    docs: {
      description: {
        story: "Un texte d'aide est affiché sous le libellé du groupe.",
      },
    },
  },
  args: {
    ...Default.args,
    helpText: "Sélectionnez votre statut actuel",
  },
};

/** Story avec mention optionnel */
export const Optionnel: Story = {
  name: "Optionnel",
  parameters: {
    docs: {
      description: {
        story: "Le groupe est marqué comme optionnel.",
      },
    },
  },
  args: {
    ...Default.args,
    label: "Statut",
    optional: true,
  },
};

/** Story avec état d'erreur */
export const Erreur: Story = {
  name: "Avec erreur",
  parameters: {
    docs: {
      description: {
        story: "Un message d'erreur est affiché sous le groupe.",
      },
    },
  },
  args: {
    ...Default.args,
    status: "error",
    message: "Veuillez sélectionner un statut.",
  },
};

/** Story avec valeur par défaut */
export const AvecValeur: Story = {
  name: "Avec valeur sélectionnée",
  parameters: {
    docs: {
      description: {
        story: "Une option est pré-sélectionnée.",
      },
    },
  },
  args: {
    ...Default.args,
    defaultValue: "student",
  },
};

/** Story avec groupe désactivé */
export const GroupeDésactivé: Story = {
  name: "Groupe désactivé",
  parameters: {
    docs: {
      description: {
        story: "Toutes les options sont désactivées.",
      },
    },
  },
  args: {
    ...Default.args,
    status: "disabled",
  },
};

/** Story avec une option désactivée */
export const UneOptionDésactivée: Story = {
  name: "Une option désactivée",
  parameters: {
    docs: {
      description: {
        story: "Certaines options sont désactivées individuellement.",
      },
    },
  },
  args: {
    id: "statut",
    name: "statut",
    label: "Statut",
    options: disabledOptions,
    defaultValue: "apprentice",
  },
};

/** Story avec messages intégrés */
export const AvecMessages: Story = {
  name: "Avec messages intégrés",
  parameters: {
    docs: {
      description: {
        story:
          "Chaque option peut afficher un message supplémentaire lorsqu'elle est sélectionnée.",
      },
    },
  },
  args: {
    id: "statut",
    name: "statut",
    label: "Statut",
    options: messagesOptions,
  },
};

/** Story avec icônes */
export const AvecIcônes: Story = {
  name: "Avec icônes",
  parameters: {
    docs: {
      description: {
        story:
          "Les options peuvent inclure des icônes pour améliorer la reconnaissance visuelle.",
      },
    },
  },
  args: {
    id: "statut",
    name: "statut",
    label: "Statut",
    options: iconOptions,
  },
};

/** Story combinant toutes les fonctionnalités */
export const Complet: Story = {
  name: "Complet",
  parameters: {
    docs: {
      description: {
        story:
          "Exemple combinant icônes, messages, descriptions et sous-textes.",
      },
    },
  },
  args: {
    id: "statut-complet",
    name: "statut-complet",
    label: "Statut complet",
    options: iconOptions,
    defaultValue: "clock",
    helpText: "Sélectionnez l'option qui vous correspond",
  },
};
