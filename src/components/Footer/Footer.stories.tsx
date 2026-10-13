import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./Footer";
import type { FooterAddress, FooterInfo } from "./Footer.types";
import Switch from "../Input/Switch/Switch";
import logoCnam from "./assets/logoCnam.svg";
import logoFrance from "./assets/logoRepubliqueFrance.png";

const meta: Meta<typeof Footer> = {
  title: "Components/Navigation/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Pied de page avec logo + adresse, zone d'interaction libre (liens, formulaires…), réseaux sociaux et logos partenaires.",
      },
    },
  },
  argTypes: {
    logo: { table: { disable: true } },
    logoUrl: { table: { disable: true } },
    interactions: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const defaultAddress: FooterAddress = {
  name: " Conservatoire national des arts et métiers",
  lines: ["12 rue de la Formation", "75001 Paris", "France"],
};

const defaultPartners = [
  {
    id: "p1",
    logoUrl: logoFrance,
    logoAlt: "Partenaire 1",
    href: "https://p1.fr",
  },
];

const defaultInfo: FooterInfo[] = [
  { id: "contact", label: "Nous contacter", href: "/contact" },
  { id: "rgpd", label: "Règlement RGPD", href: "/rgpd" },
  {
    id: "institutionnelle",
    label: "Site institutionnelle ",
    href: "/institutionnelle",
  },
  {
    id: "accessibility",
    title: "Accéssibilité : ",
    label: "Partiel",
  },
];

export const Complet: Story = {
  args: {
    logoUrl: logoCnam,
    logoAlt: "Logo Cnam",
    address: defaultAddress,
    interactions: (
      <div>
        <Switch
          id="dark-mode-footer"
          label="Thème :"
          aria-label="Passer en mode nuit/jour"
          variant="toggle"
          icons={{ off: "Sun", on: "Moon" }}
          value="off"
          onChange={() => console.log("Changement de thème")}
          className="footer__dark-mode"
        />
      </div>
    ),
    partners: defaultPartners,
    copyright: "© 2025 Université Exemple",
    infos: defaultInfo,
  },
};

export const LogoEtAdresse: Story = {
  name: "Logo et adresse",

  args: {
    logoUrl: logoCnam,
    logoAlt: "Logo Cnam",
    address: defaultAddress,
  },
};

export const LiensUniquement: Story = {
  name: "Liens uniquement",
  args: {
    logoUrl: logoCnam,
    logoAlt: "Logo Cnam",
    infos: defaultInfo,
  },
};

export const SansPartenaires: Story = {
  name: "Sans partenaires",
  args: {
    ...Complet.args,
    partners: undefined,
  },
};

export const Minimal: Story = {
  name: "Minimal",
  args: {
    logoUrl: logoCnam,
    logoAlt: "Logo Cnam",
    copyright: "© 2025 Université Exemple",
  },
};

export const LiensExternes: Story = {
  name: "Liens externes",
  args: {
    logoUrl: logoCnam,
    logoAlt: "Logo Cnam",
    infos: [
      {
        id: "cnam",
        label: "Site du Cnam",
        href: "https://www.cnam.fr",
      },
    ],
  },
};
