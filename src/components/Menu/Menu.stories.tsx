import type { Meta, StoryObj } from "@storybook/react";
import Menu from "./Menu";
import type { MenuLink, MenuSection as MenuSectionType } from "./Menu.types";

/* ==========================================================================
   MÉTADONNÉES
   ========================================================================== */

const meta: Meta<typeof Menu> = {
  title: "Components/Navigation/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Menu à composition libre via un tableau de sections ordonnées. Les sections utilisateur et déconnexion sont épinglées en bas.",
      },
    },
  },
  argTypes: {
    sections: {
      table: { disable: true },
    },
    isDarkMode: { control: "boolean" },
    onLogout: { action: "logoutClicked" },
    onThemeChange: { action: "themeChanged" },
    onLinkClick: { action: "linkClicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

/* ==========================================================================
   DONNÉES DE TEST
   ========================================================================== */

const navigationGroup = {
  id: "main",
  title: "Navigation",
  icon: "Menu" as const,
  defaultOpen: true,
  items: [
    { id: "home", label: "Accueil", href: "/", icon: "Home" as const },
    {
      id: "formations",
      label: "Formations",
      href: "/formations",
      icon: "GraduationCap" as const,
      children: [
        { id: "licence", label: "Licence", href: "/formations/licence" },
        { id: "master", label: "Master", href: "/formations/master" },
        { id: "doctorat", label: "Doctorat", href: "/formations/doctorat" },
      ],
    },
    {
      id: "cours",
      label: "Mes cours",
      href: "/cours",
      icon: "BookOpen" as const,
    },
    {
      id: "contact",
      label: "Contact",
      href: "/contact",
      icon: "Mail" as const,
    },
  ],
};

const settingsGroup = {
  id: "settings",
  title: "Paramètres",
  icon: "Settings" as const,
  defaultOpen: false,
  items: [
    {
      id: "profil",
      label: "Mon profil",
      href: "/profil",
      icon: "User" as const,
    },
    {
      id: "notifications",
      label: "Notifications",
      href: "/notifications",
      icon: "Bell" as const,
    },
    {
      id: "preferences",
      label: "Préférences",
      href: "/preferences",
      icon: "Settings" as const,
    },
  ],
};

const rootItems: MenuLink[] = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    href: "/dashboard",
    icon: "LayoutDashboard" as const,
  },
  {
    id: "calendar",
    label: "Calendrier",
    href: "/calendar",
    icon: "Calendar" as const,
  },
  {
    id: "mdp",
    label: "Changer le mot de passe",
    href: "/mdp",
    icon: "FormInput" as const,
    external: true,
  },
];

const quickAccessItems = [
  { id: "1", label: "Bibliothèque", href: "/biblio", icon: "Library" as const },
  {
    id: "2",
    label: "Emploi du temps",
    href: "/edt",
    icon: "Calendar" as const,
  },
  { id: "3", label: "Aide", href: "/aide", icon: "HelpCircle" as const },
];

const defaultUser = {
  name: "Jean Dupont",
  id: "jdupont123",
};

/* ==========================================================================
   STORIES
   ========================================================================== */

/** Menu complet avec toutes les sections */
export const Complet: Story = {
  name: "Complet",
  args: {
    sections: [
      {
        type: "quick-access",
        id: "qa",
        title: "Accès rapide",
        items: quickAccessItems,
      },
      { type: "group", id: "nav", group: navigationGroup },

      { type: "group", id: "settings", group: settingsGroup },

      { type: "items", id: "top", items: rootItems },
    ] as MenuSectionType[],
    user: defaultUser,
  },
};

/** Groupes fermés par défaut */
export const GroupesFermés: Story = {
  name: "Groupes fermés",
  args: {
    sections: [
      {
        type: "quick-access",
        id: "qa",
        title: "Accès rapide",
        items: quickAccessItems,
      },
      {
        type: "group",
        id: "nav",
        group: { ...navigationGroup, defaultOpen: false },
      },
      {
        type: "group",
        id: "settings",
        group: { ...settingsGroup, defaultOpen: false },
      },
    ] as MenuSectionType[],
    user: defaultUser,
  },
};

/** Menu avec uniquement des items racine (pas de groupes) */
export const UniquementItemsRacine: Story = {
  name: "Uniquement items racine",
  args: {
    sections: [
      { type: "items", id: "top", items: rootItems },
    ] as MenuSectionType[],
    user: defaultUser,
  },
};

/** Menu avec groupes puis items racine (ordre libre) */
export const GroupesPuisItems: Story = {
  name: "Groupes puis items racine",
  args: {
    sections: [
      { type: "group", id: "nav", group: navigationGroup },
      { type: "items", id: "bottom", items: rootItems },
    ] as MenuSectionType[],
    user: defaultUser,
  },
};

/** Ordre complètement personnalisé : items → groupe → custom → items → groupe */
export const OrdrePersonnalisé: Story = {
  name: "Ordre personnalisé",
  args: {
    sections: [
      { type: "items", id: "top", items: [rootItems[0]] },
      { type: "group", id: "nav", group: navigationGroup },
      {
        type: "custom",
        id: "banner",
        content: (
          <div
            style={{ padding: "16px", background: "#f5f5f5", margin: "8px 0" }}
          >
            Section personnalisée
          </div>
        ),
      },
      { type: "items", id: "middle", items: [rootItems[1]] },
      { type: "group", id: "settings", group: settingsGroup },
    ] as MenuSectionType[],
    user: defaultUser,
  },
};

/** Menu avec sous-menus (les icônes des enfants sont ignorées) */
export const SousMenus: Story = {
  name: "Sous-menus",
  args: {
    sections: [
      {
        type: "group",
        id: "nav",
        group: {
          id: "nav",
          title: "Navigation",
          icon: "Menu",
          defaultOpen: true,
          items: [
            { id: "home", label: "Accueil", href: "/", icon: "Home" },
            {
              id: "formations",
              label: "Formations",
              href: "/formations",
              icon: "GraduationCap",
              children: [
                // ⚠️ Les icônes sont ignorées car level >= 1
                {
                  id: "licence",
                  label: "Licence",
                  href: "/formations/licence",
                  icon: "BookOpen",
                },
                {
                  id: "master",
                  label: "Master",
                  href: "/formations/master",
                  icon: "BookOpen",
                },
              ],
            },
          ],
        },
      },
    ] as MenuSectionType[],
    user: defaultUser,
  },
};

/** Menu avec un item actif surligné */
export const ItemActif: Story = {
  name: "Item actif",
  args: {
    sections: [
      {
        type: "group",
        id: "nav",
        group: {
          ...navigationGroup,
          defaultOpen: true,
        },
      },
    ] as MenuSectionType[],
    user: defaultUser,
    activeHref: "/cours",
  },
};

/** Menu sans accès rapide */
export const SansAccèsRapide: Story = {
  name: "Sans accès rapide",
  args: {
    sections: [
      { type: "group", id: "nav", group: navigationGroup },
      { type: "group", id: "settings", group: settingsGroup },
    ] as MenuSectionType[],
    user: defaultUser,
  },
};

/** Menu sans utilisateur (pas de section user/logout) */
export const SansUtilisateur: Story = {
  name: "Sans utilisateur",
  args: {
    sections: [
      {
        type: "quick-access",
        id: "qa",
        title: "Accès rapide",
        items: quickAccessItems,
      },
      { type: "group", id: "nav", group: navigationGroup },
    ] as MenuSectionType[],
  },
};

/** Menu minimal */
export const Minimal: Story = {
  name: "Minimal",
  args: {
    sections: [
      {
        type: "group",
        id: "nav",
        group: {
          id: "nav",
          title: "Navigation",
          icon: "Menu",
          defaultOpen: true,
          items: [
            { id: "home", label: "Accueil", href: "/", icon: "Home" },
            { id: "contact", label: "Contact", href: "/contact", icon: "Mail" },
          ],
        },
      },
    ] as MenuSectionType[],
  },
};

/** Menu avec beaucoup de sections */
export const BeaucoupDeSections: Story = {
  name: "Beaucoup de sections",
  args: {
    sections: [
      {
        type: "quick-access",
        id: "qa",
        title: "Accès rapide",
        items: quickAccessItems,
      },
      { type: "items", id: "top", items: rootItems },
      { type: "group", id: "nav", group: navigationGroup },
      { type: "group", id: "settings", group: settingsGroup },
      {
        type: "group",
        id: "help",
        group: {
          id: "help",
          title: "Aide & support",
          icon: "HelpCircle",
          items: [
            { id: "faq", label: "FAQ", href: "/faq", icon: "FileQuestion" },
            {
              id: "contact-support",
              label: "Contacter le support",
              href: "/support",
              icon: "MessageCircle",
            },
          ],
        },
      },
      {
        type: "group",
        id: "legal",
        group: {
          id: "legal",
          title: "Mentions légales",
          icon: "FileText",
          items: [
            { id: "cgu", label: "CGU", href: "/cgu" },
            {
              id: "privacy",
              label: "Politique de confidentialité",
              href: "/privacy",
            },
          ],
        },
      },
    ] as MenuSectionType[],
    user: defaultUser,
  },
};
