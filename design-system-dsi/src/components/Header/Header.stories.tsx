import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import logoUrl from "./assets/logo.svg";

const meta: Meta<typeof Header> = {
  title: "Components/Navigation/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "En-tête de page avec logo, titre, accès rapide et deux variantes : avec ou sans menu.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["with-menu", "without-menu"],
      description: "Variante du header",
      table: {
        defaultValue: { summary: "without-menu" },
      },
    },
    logoUrl: {
      table: {
        disable: true,
      },
    },
    logo: {
      table: {
        disable: true,
      },
    },
    isMenuOpen: {
      control: "boolean",
      description: "État d'ouverture du menu (avec menu)",
    },
    isDarkMode: {
      control: "boolean",
      description: "Thème sombre actif",
    },
    onMenuToggle: {
      action: "menuToggled",
      description: "Callback lors du clic sur le bouton menu",
    },
    onLogout: {
      action: "logoutClicked",
      description: "Callback lors de la déconnexion",
    },
    onThemeChange: {
      action: "themeChanged",
      description: "Callback lors du changement de thème",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

/* ==========================================================================
   DONNÉES DE TEST
   ========================================================================== */

const defaultQuickAccess = [
  { id: "1", label: "Mon espace", href: "/espace", icon: "User" as const },
  { id: "2", label: "Mes cours", href: "/cours", icon: "BookOpen" as const },
];

const defaultUser = {
  name: "Jean Dupont",
  id: "jdupont123",
};

/* ==========================================================================
   STORIES - SANS MENU
   ========================================================================== */

export const SansMenu: Story = {
  name: "Sans menu",
  args: {
    siteName: "Portail inscription",
    variant: "without-menu",
    logoUrl,
    logoAlt: "Logo de l'établissement",
    title: "Portail inscription",
    user: defaultUser,
  },
};

export const SansMenuNomLong: Story = {
  name: "Sans menu - Nom long",
  args: {
    ...SansMenu.args,
    user: {
      name: "Marie-Charlotte de la Tour d'Auvergne",
      id: "mcdltauvergne2024",
    },
  },
};

export const SansUtilisateur: Story = {
  name: "Sans menu - Sans utilisateur",
  args: {
    ...SansMenu.args,
    user: undefined,
  },
};

export const AvecAccèsRapide: Story = {
  name: "Sans menu - Avec accès rapide",
  args: {
    ...SansMenu.args,
    quickAccess: defaultQuickAccess,
  },
};

export const SansSousTitre: Story = {
  name: "Sans menu - Sans sous-titre",
  args: {
    ...SansMenu.args,
    subtitle: undefined,
  },
};

/* ==========================================================================
   STORIES - AVEC MENU
   ========================================================================== */

export const AvecMenu: Story = {
  name: "Avec menu",
  args: {
    siteName: "Portail inscription",
    variant: "with-menu",
    logoUrl,
    logoAlt: "Logo de l'établissement",
    title: "Mon établissement",
    subtitle: "Portail étudiant",
  },
};

export const AvecMenuOuvert: Story = {
  name: "Avec menu ouvert",
  args: {
    ...AvecMenu.args,
    isMenuOpen: true,
  },
};

/* ==========================================================================
   STORY COMPLÈTE
   ========================================================================== */
