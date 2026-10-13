import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumb from "./Breadcrumb";
import Icon from "../Icon/Icon";

/* ==========================================================================
   MÉTADONNÉES
   ========================================================================== */

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Navigation/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Fil d'Ariane accessible. Le dernier élément est marqué comme page courante et n'est pas cliquable.",
      },
    },
  },
  argTypes: {
    items: { table: { disable: true } },
    separator: { table: { disable: true } },
    compact: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/* ==========================================================================
   DONNÉES DE TEST
   ========================================================================== */

const defaultItems = [
  { id: "home", label: "Accueil", href: "/" },
  { id: "formations", label: "Formations", href: "/formations" },
  { id: "licence", label: "Licence", href: "/formations/licence" },
  { id: "informatique", label: "Informatique" },
];

/* ==========================================================================
   STORIES
   ========================================================================== */

/** Fil d'Ariane standard */
export const Standard: Story = {
  args: {
    items: defaultItems,
  },
};

/** Fil d'Ariane avec icônes */
export const AvecIcônes: Story = {
  args: {
    items: [
      { id: "home", label: "Accueil", href: "/", icon: "Home" },
      {
        id: "formations",
        label: "Formations",
        href: "/formations",
        icon: "GraduationCap",
      },
      { id: "licence", label: "Licence", href: "/formations/licence" },
      { id: "informatique", label: "Informatique" },
    ],
  },
};

/** Fil d'Ariane avec deux niveaux seulement */
export const DeuxNiveaux: Story = {
  args: {
    items: [
      { id: "home", label: "Accueil", href: "/" },
      { id: "contact", label: "Contact" },
    ],
  },
};

/** Fil d'Ariane avec un seul élément (page racine) */
export const UnSeulÉlément: Story = {
  args: {
    items: [{ id: "home", label: "Accueil" }],
  },
};

/** Fil d'Ariane compact (affiche seulement le parent + le courant) */
export const Compact: Story = {
  args: {
    items: defaultItems,
    compact: true,
  },
};

/** Fil d'Ariane avec séparateur personnalisé */
export const SéparateurPersonnalisé: Story = {
  args: {
    items: defaultItems,
    separator: (
      <Icon
        name="ChevronRight"
        size="sm"
        className="breadcrumb__separator-icon"
        aria-hidden="true"
      />
    ),
  },
};

/** Fil d'Ariane avec un chemin profond */
export const CheminProfond: Story = {
  args: {
    items: [
      { id: "home", label: "Accueil", href: "/" },
      { id: "formations", label: "Formations", href: "/formations" },
      { id: "licence", label: "Licence", href: "/formations/licence" },
      {
        id: "informatique",
        label: "Informatique",
        href: "/formations/licence/informatique",
      },
      {
        id: "annee-1",
        label: "Année 1",
        href: "/formations/licence/informatique/annee-1",
      },
      { id: "module-web", label: "Module Web" },
    ],
  },
};

/** Fil d'Ariane avec libellés longs */
export const LibellésLongs: Story = {
  args: {
    items: [
      { id: "home", label: "Accueil", href: "/" },
      {
        id: "formations",
        label: "Formations professionnelles continues",
        href: "/formations",
      },
      {
        id: "certification",
        label: "Certification en développement web full-stack",
      },
    ],
  },
};
