import type { Meta, StoryObj } from "@storybook/react";
import SkipLinks from "./SkipLinks";

/* ==========================================================================
   MÉTADONNÉES
   ========================================================================== */

const meta: Meta<typeof SkipLinks> = {
  title: "Components/SkipLinks",
  component: SkipLinks,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Groupe de liens d'évitement accessibles. Les liens sont masqués jusqu'à ce qu'ils reçoivent le focus clavier.",
      },
    },
  },
  argTypes: {
    links: { table: { disable: true } },
    ariaLabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SkipLinks>;

/* ==========================================================================
   STORIES
   ========================================================================== */

/** Deux liens d'évitement : contenu + navigation */
export const Default: Story = {
  args: {
    ariaLabel: "Liens d'évitement",
    links: [
      { id: "content", targetId: "main-content", label: "Aller au contenu" },
      { id: "nav", targetId: "main-nav", label: "Aller à la navigation" },
    ],
  },
  render: (args) => (
    <div style={{ padding: "24px", minHeight: "300px" }}>
      <SkipLinks {...args} />

      <p style={{ marginTop: "24px", color: "#666" }}>
        Appuyez sur <kbd>Tab</kbd> pour faire apparaître les liens.
      </p>

      <nav
        id="main-nav"
        style={{
          marginTop: "48px",
          padding: "24px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2>Navigation</h2>
        <ul>
          <li>Accueil</li>
          <li>Formations</li>
        </ul>
      </nav>

      <div
        id="main-content"
        style={{
          marginTop: "24px",
          padding: "24px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2>Contenu principal</h2>
        <p>Zone ciblée par le lien d'évitement.</p>
      </div>
    </div>
  ),
};

/** Trois liens d'évitement : contenu + navigation + recherche */
export const TroisLiens: Story = {
  args: {
    ariaLabel: "Liens d'évitement",
    links: [
      { id: "content", targetId: "main-content", label: "Aller au contenu" },
      { id: "nav", targetId: "main-nav", label: "Aller à la navigation" },
      { id: "search", targetId: "main-search", label: "Aller à la recherche" },
    ],
  },
  render: (args) => (
    <div style={{ padding: "24px", minHeight: "400px" }}>
      <SkipLinks {...args} />

      <p style={{ marginTop: "24px", color: "#666" }}>
        Appuyez sur <kbd>Tab</kbd> pour faire apparaître les liens.
      </p>

      <div
        id="main-search"
        style={{
          marginTop: "48px",
          padding: "24px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2>Recherche</h2>
      </div>

      <nav
        id="main-nav"
        style={{
          marginTop: "24px",
          padding: "24px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2>Navigation</h2>
      </nav>

      <div
        id="main-content"
        style={{
          marginTop: "24px",
          padding: "24px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2>Contenu principal</h2>
      </div>
    </div>
  ),
};

/** Un seul lien d'évitement */
export const UnSeulLien: Story = {
  args: {
    ariaLabel: "Liens d'évitement",
    links: [
      { id: "content", targetId: "main-content", label: "Aller au contenu" },
    ],
  },
  render: (args) => (
    <div style={{ padding: "24px", minHeight: "300px" }}>
      <SkipLinks {...args} />

      <p style={{ marginTop: "24px", color: "#666" }}>
        Appuyez sur <kbd>Tab</kbd> pour faire apparaître le lien.
      </p>

      <div
        id="main-content"
        style={{
          marginTop: "48px",
          padding: "24px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2>Contenu principal</h2>
      </div>
    </div>
  ),
};

/** Libellés personnalisés */
export const LibellésPersonnalisés: Story = {
  args: {
    ariaLabel: "Raccourcis d'accès",
    links: [
      { id: "form", targetId: "main-form", label: "Accéder au formulaire" },
      { id: "nav", targetId: "main-nav", label: "Accéder au menu" },
    ],
  },
  render: (args) => (
    <div style={{ padding: "24px", minHeight: "300px" }}>
      <SkipLinks {...args} />

      <p style={{ marginTop: "24px", color: "#666" }}>
        Appuyez sur <kbd>Tab</kbd> pour faire apparaître les liens.
      </p>

      <nav
        id="main-nav"
        style={{
          marginTop: "48px",
          padding: "24px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2>Menu</h2>
      </nav>

      <div
        id="main-form"
        style={{
          marginTop: "24px",
          padding: "24px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2>Formulaire</h2>
      </div>
    </div>
  ),
};

/** Aucun lien (le composant ne rend rien) */
export const Vide: Story = {
  args: {
    links: [],
  },
  render: (args) => (
    <div style={{ padding: "24px" }}>
      <SkipLinks {...args} />
      <p style={{ color: "#666" }}>Aucun lien rendu car la liste est vide.</p>
    </div>
  ),
};
