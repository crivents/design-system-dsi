import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Layout from "./Layout";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import type { MenuSection } from "../Menu/Menu.types";
import SkipLinks from "../Skiplink/SkipLinks";
import Header from "../Header/Header";
import Switch from "../Input/Switch/Switch";

/* ==========================================================================
   MÉTADONNÉES
   ========================================================================== */

const meta: Meta<typeof Layout> = {
  title: "Components/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Structure de page principale. Gère le header, le menu latéral, le breadcrumb, le contenu, le footer et les overlays.",
      },
    },
  },
  argTypes: {
    contentWidth: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
      description: "Largeur du contenu principal",
      table: { defaultValue: { summary: "md" } },
    },
    withMenu: { control: "boolean" },
    withBreadcrumb: { control: "boolean" },
    header: { table: { disable: true } },
    menu: { table: { disable: true } },
    breadcrumb: { table: { disable: true } },
    footer: { table: { disable: true } },
    overlays: { table: { disable: true } },
    skipLink: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

/* ==========================================================================
   DONNÉES DE TEST
   ========================================================================== */

const menuSections: MenuSection[] = [
  {
    type: "items",
    id: "top",
    items: [
      {
        id: "dashboard",
        label: "Tableau de bord",
        href: "/dashboard",
        icon: "LayoutDashboard",
      },
      {
        id: "calendar",
        label: "Calendrier",
        href: "/calendar",
        icon: "Calendar",
      },
    ],
  },
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
            { id: "licence", label: "Licence", href: "/formations/licence" },
            { id: "master", label: "Master", href: "/formations/master" },
          ],
        },
        { id: "cours", label: "Mes cours", href: "/cours", icon: "BookOpen" },
      ],
    },
  },
  {
    type: "quick-access",
    id: "qa",
    title: "Accès rapide",
    items: [
      { id: "biblio", label: "Bibliothèque", href: "/biblio", icon: "Library" },
      { id: "aide", label: "Aide", href: "/aide", icon: "HelpCircle" },
    ],
  },
];

const breadcrumbItems = [
  { id: "home", label: "Accueil", href: "/" },
  { id: "formations", label: "Formations", href: "/formations" },
  { id: "licence", label: "Licence", href: "/formations/licence" },
  { id: "informatique", label: "Informatique" },
];

const user = { name: "Jean Dupont", id: "jdupont123" };

const defaultSkipLinks = [
  { id: "content", targetId: "main-content", label: "Aller au contenu" },
  { id: "nav", targetId: "main-nav", label: "Aller à la navigation" },
];

/* ==========================================================================
   ÉLÉMENTS PARTAGÉS
   ========================================================================== */

const footerElement = (
  <Footer
    address={{
      lines: ["12 rue de la Formation", "75001 Paris", "France"],
      name: "Conservatoire national des arts et métiers",
    }}
    copyright="© 2025 Université Exemple"
    infos={[
      { href: "/contact", id: "contact", label: "Nous contacter" },
      { href: "/rgpd", id: "rgpd", label: "Règlement RGPD" },
      {
        href: "/institutionnelle",
        id: "institutionnelle",
        label: "Site institutionnel",
      },
      { id: "accessibility", label: "Partiel", title: "Accessibilité : " },
    ]}
    interactions={
      <div>
        <Switch
          aria-label="Passer en mode nuit/jour"
          className="footer__dark-mode"
          icons={{ off: "Sun", on: "Moon" }}
          id="dark-mode-footer"
          label="Thème :"
          onChange={() => {}}
          value="off"
          variant="toggle"
        />
      </div>
    }
    logoAlt="Logo Cnam"
    logoUrl="data:image/svg+xml,%3csvg..." /* votre logo ici */
    partners={[
      {
        href: "https://p1.fr",
        id: "p1",
        logoAlt: "Partenaire 1",
        logoUrl: "/src/components/Footer/assets/logoRepubliqueFrance.png",
      },
    ]}
  />
);

const headerElementWithoutMenu = (
  <Header
    logoAlt="Logo de l'établissement"
    logoUrl="data:image/svg+xml,%3csvg%20width='76'%20height='14'%20viewBox='0%200%2076%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4.28077%208.44064C4.2822%2010.2914%204.80998%2011.6539%205.69916%2012.5636C6.5893%2013.4719%207.86867%2013.9594%209.48064%2013.9609L9.4835%2013.9604C10.5386%2013.9609%2011.402%2013.7396%2012.0795%2013.298C12.6764%2012.9042%2013.0902%2012.36%2013.2691%2011.5639L12.5223%2011.325C12.3931%2011.9444%2012.1423%2012.4615%2011.7251%2012.8391C11.2078%2013.3065%2010.4923%2013.5072%209.61569%2013.508H9.59565C8.42222%2013.5085%207.39147%2013.0429%206.68028%2012.2216C5.97212%2011.4072%205.3516%2010.2532%205.3516%208.88459V8.48184H13.177C13.2658%208.00067%2013.2982%207.51297%2013.2982%207.10783C13.2966%205.72284%2012.915%204.69957%2012.2416%204.01495C11.5666%203.33113%2010.5666%202.94651%209.20927%202.9446C6.3157%202.9656%204.30749%205.00227%204.28077%208.44064ZM9.22295%203.34735L9.22948%203.34783L9.24316%203.34735C10.1807%203.34704%2010.9717%203.68044%2011.5048%204.27407C12.0373%204.86421%2012.3721%205.68069%2012.3741%206.60105V6.61425C12.3736%206.95719%2012.3721%207.5548%2012.2734%207.94467L12.2511%208.03105H5.31756L5.32758%207.90745L5.35335%207.59584C5.44577%206.44118%205.96401%205.45688%206.56528%204.66649C7.16766%203.86925%208.1149%203.3464%209.22295%203.34735Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M44.5035%206.14915C44.5035%204.10197%2046.2758%202.92807%2049.3676%202.92807C52.6407%202.92807%2054.232%204.45892%2054.232%207.60794V11.0566C54.232%2011.8337%2054.5637%2012.2113%2055.2462%2012.2113C55.4449%2012.2113%2055.5922%2012.1833%2055.7136%2012.1502V13.3784C55.2442%2013.7865%2054.6675%2013.9774%2053.9035%2013.9774C52.1704%2013.9774%2051.3089%2013.2901%2051.1924%2011.8135L51.0208%2011.7874C50.6163%2012.7971%2049.688%2014%2047.5605%2014C45.5009%2014%2044.2713%2012.9519%2044.2713%2011.1957C44.2713%209.33762%2045.8263%208.31451%2048.6491%208.31451C49.3228%208.31451%2050.0597%208.3608%2050.8385%208.45195L50.9381%208.46372V7.23716C50.9381%205.71824%2050.3627%204.94804%2049.228%204.94804C48.1862%204.94804%2047.5644%205.44846%2047.5644%206.2877C47.5644%206.31808%2047.5726%206.48001%2047.5963%206.61919C47.6155%206.73292%2047.6508%206.83202%2047.6508%206.83202L44.7385%207.48307C44.7294%207.46176%2044.6992%207.38302%2044.6731%207.29983C44.6462%207.21378%2044.6238%207.12263%2044.6155%207.08684C44.5409%206.76155%2044.5035%206.4474%2044.5035%206.14915ZM47.4714%2011.1957C47.4714%2011.8895%2047.9465%2012.304%2048.7423%2012.304C50.0763%2012.304%2050.9381%2011.3145%2050.9381%209.78364V9.33349L50.8431%209.33985C48.0447%209.52373%2047.4714%2010.215%2047.4714%2011.1957Z'%20fill='white'/%3e%3cpath%20d='M24.919%202.9197C21.5457%202.93895%2019.8063%205.14821%2019.7807%208.4466C19.8009%2011.7302%2021.7365%2013.9802%2025.0889%2013.9964C27.5755%2013.9721%2028.7307%2013.0242%2029.229%2011.1908C28.9565%2011.1021%2028.7287%2011.0325%2028.4686%2010.9531L28.4685%2010.9531L28.467%2010.9526C28.3796%2010.9259%2028.2885%2010.8981%2028.1908%2010.8681C27.8224%2012.2158%2026.8542%2013.1968%2025.204%2013.1968C25.1969%2013.1968%2025.1898%2013.1967%2025.1828%2013.1966C25.1758%2013.1965%2025.1687%2013.1965%2025.1616%2013.1965H25.1531C23.9388%2013.1965%2022.9276%2012.6555%2022.2448%2011.7895C21.5576%2010.9239%2021.1868%209.74458%2021.1868%208.4466C21.1873%207.1701%2021.4776%206.00303%2022.0905%205.13517C22.6975%204.26794%2023.6477%203.71869%2024.8608%203.71869H24.8843C26.3385%203.71869%2027.403%204.65495%2027.8175%205.97949C28.0224%205.91525%2028.2154%205.8502%2028.4154%205.78278C28.5917%205.72334%2028.7735%205.66207%2028.9737%205.59789C28.5934%203.93438%2027.1865%202.93497%2024.919%202.9197Z'%20fill='white'/%3e%3cpath%20d='M0%2013.8303H0.829052V0H0V13.8303Z'%20fill='white'/%3e%3cpath%20d='M33.8442%206.07147C34.413%203.7674%2035.5079%202.91863%2037.7985%202.90495C40.2767%202.91624%2041.5006%204.50069%2041.5149%207.10556V13.8425L39.5095%2013.8433V7.27098C39.5095%206.4141%2039.3042%205.76081%2038.9172%205.31861C38.5308%204.87673%2037.9704%204.66326%2037.3106%204.66326H37.303C35.1587%204.68601%2034.0133%207.39665%2034.0112%2010.6459V13.8425H32.0019V3.13384H33.1081L33.5897%206.06129L33.8442%206.07147Z'%20fill='white'/%3e%3cpath%20d='M71.8153%202.91947C70.1704%202.91947%2068.978%204.2526%2068.2576%206.03811C67.5983%203.86114%2065.9294%202.91947%2064.5111%202.91947C62.6819%202.91947%2061.3691%204.09337%2060.6442%205.99994L60.3713%205.99819L59.7975%203.11957H57.4877V13.8446H61.287V11.1751C61.287%2010.0673%2061.3276%206.44978%2063.2267%206.44978C63.4901%206.44978%2064.2175%206.44978%2064.2175%207.94706V13.8446H68.5912V11.1751C68.5912%208.89955%2069.1237%206.44978%2070.5304%206.44978C70.7931%206.44978%2071.5205%206.44978%2071.5205%207.94706V13.8446H75.8586V7.94706C75.8586%203.79131%2073.6592%202.91947%2071.8153%202.91947Z'%20fill='white'/%3e%3c/svg%3e"
    onLogout={() => {}}
    onMenuToggle={() => {}}
    onThemeChange={() => {}}
    siteName="Portail inscription"
    title="Portail inscription"
    user={{
      id: "jdupont123",
      name: "Jean Dupont",
    }}
    variant="without-menu"
  />
);

const headerElementWithMenu = (
  <Header
    logoAlt="Logo de l'établissement"
    logoUrl="data:image/svg+xml,%3csvg..." /* votre logo ici */
    onLogout={() => {}}
    onMenuToggle={() => {}}
    onThemeChange={() => {}}
    siteName="Portail inscription"
    title="Portail inscription"
    variant="with-menu"
  />
);

const menuElement = (
  <Menu
    onLinkClick={() => {}}
    onThemeChange={() => {}}
    sections={[
      {
        id: "qa",
        type: "quick-access",
        title: "Accès rapide",
        items: [
          { href: "/biblio", icon: "Library", id: "1", label: "Bibliothèque" },
          { href: "/edt", icon: "Calendar", id: "2", label: "Emploi du temps" },
          { href: "/aide", icon: "HelpCircle", id: "3", label: "Aide" },
        ],
      },
      {
        id: "nav",
        type: "group",
        group: {
          defaultOpen: true,
          icon: "Menu",
          id: "main",
          title: "Navigation",
          items: [
            { href: "/", icon: "Home", id: "home", label: "Accueil" },
            {
              id: "formations",
              label: "Formations",
              href: "/formations",
              icon: "GraduationCap",
              children: [
                {
                  href: "/formations/licence",
                  id: "licence",
                  label: "Licence",
                },
                { href: "/formations/master", id: "master", label: "Master" },
                {
                  href: "/formations/doctorat",
                  id: "doctorat",
                  label: "Doctorat",
                },
              ],
            },
            {
              href: "/cours",
              icon: "BookOpen",
              id: "cours",
              label: "Mes cours",
            },
            { href: "/contact", icon: "Mail", id: "contact", label: "Contact" },
          ],
        },
      },
      {
        id: "settings",
        type: "group",
        group: {
          defaultOpen: false,
          icon: "Settings",
          id: "settings",
          title: "Paramètres",
          items: [
            {
              href: "/profil",
              icon: "User",
              id: "profil",
              label: "Mon profil",
            },
            {
              href: "/notifications",
              icon: "Bell",
              id: "notifications",
              label: "Notifications",
            },
            {
              href: "/preferences",
              icon: "Settings",
              id: "preferences",
              label: "Préférences",
            },
          ],
        },
      },
      {
        id: "top",
        type: "items",
        items: [
          {
            href: "/dashboard",
            icon: "LayoutDashboard",
            id: "dashboard",
            label: "Tableau de bord",
          },
          {
            href: "/calendar",
            icon: "Calendar",
            id: "calendar",
            label: "Calendrier",
          },
          {
            external: true,
            href: "/mdp",
            icon: "FormInput",
            id: "mdp",
            label: "Changer le mot de passe",
          },
        ],
      },
    ]}
    user={{
      id: "jdupont123",
      name: "Jean Dupont",
    }}
  />
);

/** Contenu long pour tester le scroll */
const longContent = (title: string, description: string) => (
  <div
    id="main-content"
    style={{
      minHeight: "80rem",
      display: "flex",
      flexDirection: "column",
      width: "100%",
    }}
  >
    <h1>{title}</h1>
    <p>{description}</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
);

/* ==========================================================================
   STORIES
   ========================================================================== */

/** Layout minimal : header + contenu + footer */
export const SansMenu: Story = {
  name: "Sans menu",
  args: {
    withMenu: false,
    withBreadcrumb: false,
    contentWidth: "md",
    skipLink: (
      <SkipLinks
        links={[
          {
            id: "content",
            targetId: "main-content",
            label: "Aller au contenu",
          },
        ]}
      />
    ),
    header: headerElementWithoutMenu,
    footer: footerElement,
    children: longContent(
      "Contenu principal",
      "Voici le contenu de la page sans menu latéral.",
    ),
  },
};

/** Layout complet avec menu, breadcrumb et contenu long */
export const AvecMenu: Story = {
  name: "Avec menu",
  args: {
    withMenu: true,
    withBreadcrumb: true,
    contentWidth: "md",
    skipLink: <SkipLinks links={defaultSkipLinks} />,
    header: headerElementWithoutMenu,
    menu: menuElement,
    breadcrumb: <Breadcrumb items={breadcrumbItems} />,
    footer: footerElement,
    children: longContent(
      "Tableau de bord",
      "Contenu de la page avec menu latéral et breadcrumb.",
    ),
  },
};

/** Layout sans menu avec contenu très long */
export const SansMenuContenuLong: Story = {
  name: "Sans menu - Contenu long",
  args: {
    withMenu: false,
    withBreadcrumb: true,
    contentWidth: "md",
    skipLink: (
      <SkipLinks
        links={[
          {
            id: "content",
            targetId: "main-content",
            label: "Aller au contenu",
          },
        ]}
      />
    ),
    header: headerElementWithoutMenu,
    breadcrumb: <Breadcrumb items={breadcrumbItems} />,
    footer: footerElement,
    children: longContent(
      "Article long",
      "Contenu très long sans menu latéral pour tester le scroll.",
    ),
  },
};

/** Layout avec contenu étroit (xs) pour un formulaire */
export const ContenuXS: Story = {
  name: "Contenu XS (formulaire)",
  args: {
    withMenu: true,
    withBreadcrumb: true,
    contentWidth: "xs",
    skipLink: <SkipLinks links={defaultSkipLinks} />,
    header: headerElementWithoutMenu,
    menu: menuElement,
    breadcrumb: <Breadcrumb items={breadcrumbItems} />,
    footer: footerElement,
    children: longContent(
      "Formulaire d'inscription",
      "Contenu étroit idéal pour les formulaires.",
    ),
  },
};

/** Layout avec contenu large (lg) pour un tableau */
export const ContenuLG: Story = {
  name: "Contenu LG (tableau)",
  args: {
    withMenu: true,
    withBreadcrumb: true,
    contentWidth: "lg",
    skipLink: <SkipLinks links={defaultSkipLinks} />,
    header: headerElementWithoutMenu,
    menu: menuElement,
    breadcrumb: <Breadcrumb items={breadcrumbItems} />,
    footer: footerElement,
    children: longContent(
      "Liste des étudiants",
      "Contenu large idéal pour les tableaux et dashboards.",
    ),
  },
};

/** Layout avec contenu très large (full) */
export const ContenuFull: Story = {
  name: "Contenu Full",
  args: {
    withMenu: true,
    withBreadcrumb: true,
    contentWidth: "lg",
    skipLink: <SkipLinks links={defaultSkipLinks} />,
    header: headerElementWithoutMenu,
    menu: menuElement,
    breadcrumb: <Breadcrumb items={breadcrumbItems} />,
    footer: footerElement,
    children: longContent(
      "Vue plein écran",
      "Contenu pleine largeur pour les tableaux complexes.",
    ),
  },
};

/** Layout sans footer */
export const SansFooter: Story = {
  name: "Sans footer",
  args: {
    withMenu: true,
    withBreadcrumb: true,
    contentWidth: "md",
    skipLink: <SkipLinks links={defaultSkipLinks} />,
    header: headerElementWithoutMenu,
    menu: menuElement,
    breadcrumb: <Breadcrumb items={breadcrumbItems} />,
    children: longContent(
      "Page sans footer",
      "Le footer est absent de ce layout.",
    ),
  },
};

/** Layout avec trois liens d'évitement */
export const AvecTroisSkipLinks: Story = {
  name: "Avec 3 liens d'évitement",
  args: {
    withMenu: true,
    withBreadcrumb: true,
    contentWidth: "md",
    skipLink: (
      <SkipLinks
        links={[
          {
            id: "content",
            targetId: "main-content",
            label: "Aller au contenu",
          },
          { id: "nav", targetId: "main-nav", label: "Aller à la navigation" },
          {
            id: "search",
            targetId: "main-search",
            label: "Aller à la recherche",
          },
        ]}
      />
    ),
    header: headerElementWithoutMenu,
    menu: menuElement,
    breadcrumb: <Breadcrumb items={breadcrumbItems} />,
    footer: footerElement,
    children: (
      <div id="main-content" style={{ minHeight: "80rem", width: "100%" }}>
        <div id="main-search" style={{ marginBottom: "24px" }}>
          <h2>Recherche</h2>
        </div>
        <h1>Contenu avec plusieurs liens d'évitement</h1>
        <p>Testez la navigation au clavier avec Tab.</p>
      </div>
    ),
  },
};

/** Layout sans breadcrumb */
export const SansBreadcrumb: Story = {
  name: "Sans breadcrumb",
  args: {
    withMenu: true,
    withBreadcrumb: false,
    contentWidth: "md",
    skipLink: <SkipLinks links={defaultSkipLinks} />,
    header: headerElementWithoutMenu,
    menu: menuElement,
    footer: footerElement,
    children: longContent(
      "Page sans breadcrumb",
      "Le fil d'Ariane est absent de ce layout.",
    ),
  },
};

/* ==========================================================================
   STORY INTERACTIVE (état du menu géré par le Layout)
   ========================================================================== */

export const Interactive: Story = {
  name: "Interactif (menu)",
  render: () => (
    <Layout
      withMenu
      withBreadcrumb
      contentWidth="md"
      skipLink={<SkipLinks links={defaultSkipLinks} />}
      header={headerElementWithMenu}
      menu={menuElement}
      breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      footer={footerElement}
    >
      {longContent(
        "Page interactive",
        "Le menu s'ouvre et se ferme via le bouton du header.",
      )}
    </Layout>
  ),
};

/* ==========================================================================
   STORY CONTRÔLÉE (état du menu géré par le parent)
   ========================================================================== */

const ContrôléLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Layout
      withMenu
      withBreadcrumb
      contentWidth="md"
      isMenuOpen={isMenuOpen}
      onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
      onMenuClose={() => setIsMenuOpen(false)}
      skipLink={<SkipLinks links={defaultSkipLinks} />}
      header={
        <Header
          logoAlt="Logo de l'établissement"
          logoUrl="data:image/svg+xml,%3csvg%20width='152'%20height='28'%20viewBox='0%200%20152%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.56154%2016.8813C8.5644%2020.5827%209.61996%2023.3079%2011.3983%2025.1273C13.1786%2026.9438%2015.7373%2027.9189%2018.9613%2027.9217L18.967%2027.9208C21.0772%2027.9217%2022.804%2027.4792%2024.1589%2026.5961C25.3529%2025.8084%2026.1803%2024.72%2026.5382%2023.1278L25.0446%2022.65C24.7863%2023.8888%2024.2846%2024.923%2023.4501%2025.6783C22.4156%2026.6129%2020.9846%2027.0144%2019.2314%2027.016H19.1913C16.8444%2027.017%2014.7829%2026.0858%2013.3606%2024.4433C11.9442%2022.8144%2010.7032%2020.5064%2010.7032%2017.7692V16.9637H26.354C26.5316%2016.0013%2026.5965%2015.0259%2026.5965%2014.2157C26.5933%2011.4457%2025.8301%209.39914%2024.4831%208.02991C23.1333%206.66226%2021.1332%205.89302%2018.4185%205.8892C12.6314%205.93119%208.61498%2010.0045%208.56154%2016.8813ZM18.4459%206.69471L18.459%206.69566L18.4863%206.69471C20.3614%206.69407%2021.9435%207.36088%2023.0095%208.54814C24.0746%209.72841%2024.7443%2011.3614%2024.7481%2013.2021V13.2285C24.7472%2013.9144%2024.7443%2015.1096%2024.5467%2015.8893L24.5022%2016.0621H10.6351L10.6552%2015.8149L10.7067%2015.1917C10.8915%2012.8824%2011.928%2010.9138%2013.1306%209.33297C14.3353%207.7385%2016.2298%206.6928%2018.4459%206.69471Z'%20fill='%23C1002A'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M89.007%2012.2983C89.007%208.20394%2092.5517%205.85613%2098.7352%205.85613C105.281%205.85613%20108.464%208.91783%20108.464%2015.2159V22.1133C108.464%2023.6674%20109.127%2024.4226%20110.492%2024.4226C110.89%2024.4226%20111.184%2024.3666%20111.427%2024.3004V26.7567C110.488%2027.5731%20109.335%2027.9548%20107.807%2027.9548C104.341%2027.9548%20102.618%2026.5802%20102.385%2023.627L102.042%2023.5748C101.233%2025.5943%2099.3759%2028%2095.1209%2028C91.0017%2028%2088.5426%2025.9038%2088.5426%2022.3913C88.5426%2018.6752%2091.6526%2016.629%2097.2982%2016.629C98.6455%2016.629%20100.119%2016.7216%20101.677%2016.9039L101.876%2016.9274V14.4743C101.876%2011.4365%20100.725%209.89609%2098.4559%209.89609C96.3725%209.89609%2095.1289%2010.8969%2095.1289%2012.5754C95.1289%2012.6362%2095.1451%2012.96%2095.1925%2013.2384C95.231%2013.4658%2095.3016%2013.664%2095.3016%2013.664L89.4769%2014.9661C89.4588%2014.9235%2089.3984%2014.766%2089.3462%2014.5997C89.2924%2014.4276%2089.2476%2014.2453%2089.231%2014.1737C89.0818%2013.5231%2089.007%2012.8948%2089.007%2012.2983ZM94.9428%2022.3913C94.9428%2023.779%2095.893%2024.6081%2097.4846%2024.6081C100.152%2024.6081%20101.876%2022.629%20101.876%2019.5673V18.667L101.686%2018.6797C96.0893%2019.0475%2094.9428%2020.4301%2094.9428%2022.3913Z'%20fill='%23C1002A'/%3e%3cpath%20d='M49.838%205.8394C43.0913%205.8779%2039.6125%2010.2964%2039.5613%2016.8932C39.6017%2023.4604%2043.4731%2027.9604%2050.1777%2027.9928C55.1511%2027.9441%2057.4614%2026.0484%2058.4581%2022.3816C57.9129%2022.2043%2057.4573%2022.0651%2056.9372%2021.9062L56.9369%2021.9062L56.9341%2021.9053C56.7592%2021.8519%2056.577%2021.7962%2056.3816%2021.7361C55.6448%2024.4317%2053.7083%2026.3936%2050.408%2026.3936C50.3937%2026.3936%2050.3797%2026.3934%2050.3656%2026.3932C50.3515%2026.3931%2050.3374%2026.3929%2050.3231%2026.3929H50.3062C47.8776%2026.3929%2045.8553%2025.311%2044.4895%2023.5791C43.1152%2021.8478%2042.3736%2019.4892%2042.3736%2016.8932C42.3746%2014.3402%2042.9552%2012.0061%2044.1809%2010.2703C45.3949%208.53589%2047.2954%207.43738%2049.7215%207.43738H49.7686C52.677%207.43738%2054.8059%209.3099%2055.635%2011.959C56.0448%2011.8305%2056.4308%2011.7004%2056.8308%2011.5656C57.1835%2011.4467%2057.5471%2011.3241%2057.9475%2011.1958C57.1868%207.86876%2054.3729%205.86994%2049.838%205.8394Z'%20fill='%23C1002A'/%3e%3cpath%20d='M0%2027.6606H1.6581V0H0V27.6606Z'%20fill='%23C1002A'/%3e%3cpath%20d='M67.6884%2012.1429C68.8261%207.5348%2071.0158%205.83725%2075.5969%205.80989C80.5534%205.83248%2083.0011%209.00139%2083.0297%2014.2111V27.6849L79.019%2027.6865V14.542C79.019%2012.8282%2078.6083%2011.5216%2077.8343%2010.6372C77.0616%209.75345%2075.9408%209.32652%2074.6212%209.32652H74.6059C70.3175%209.37201%2068.0266%2014.7933%2068.0225%2021.2918V27.6849H64.0038V6.26768H66.2161L67.1794%2012.1226L67.6884%2012.1429Z'%20fill='%23C1002A'/%3e%3cpath%20d='M143.631%205.83894C140.341%205.83894%20137.956%208.5052%20136.515%2012.0762C135.197%207.72228%20131.859%205.83894%20129.022%205.83894C125.364%205.83894%20122.738%208.18675%20121.288%2011.9999L120.743%2011.9964L119.595%206.23915H114.975V27.6892H122.574V22.3503C122.574%2020.1345%20122.655%2012.8996%20126.453%2012.8996C126.98%2012.8996%20128.435%2012.8996%20128.435%2015.8941V27.6892H137.182V22.3503C137.182%2017.7991%20138.247%2012.8996%20141.061%2012.8996C141.586%2012.8996%20143.041%2012.8996%20143.041%2015.8941V27.6892H151.717V15.8941C151.717%207.58262%20147.318%205.83894%20143.631%205.83894Z'%20fill='%23C1002A'/%3e%3c/svg%3e"

          siteName="Portail inscription"
          title="Portail inscription"
          variant="with-menu"
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
        />
      }
      menu={menuElement}
      breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      footer={footerElement}
    >
      {longContent(
        "Page contrôlée",
        "L'état du menu est géré par le composant parent.",
      )}
    </Layout>
  );
};

export const Contrôlé: Story = {
  name: "Contrôlé (parent)",
  render: () => <ContrôléLayout />,
};
