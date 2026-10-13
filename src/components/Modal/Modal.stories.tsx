import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";
import Button from "../Button/Button";
import Menu from "../Menu/Menu";

/* ==========================================================================
   HELPERS DE DÉMO
   Centralisent le contenu répétitif : une modification = un seul endroit.
   ========================================================================== */

/** Page factice affichée derrière la modale (contexte réaliste + overlay visible). */
const PageBackground: React.FC = () => (
  <main style={{ padding: "2rem" }}>
    <h1>Tableau de bord</h1>
    <p>
      Retrouvez ici l’avancement de vos formations et vos prochaines échéances.
    </p>
    <ul>
      <li>Accessibilité numérique : 60 % terminé</li>
      <li>Conception d’interfaces : 25 % terminé</li>
      <li>Design system : à démarrer</li>
    </ul>
  </main>
);

/** Contenu long, pour forcer le défilement interne de la modale. */
const LongContent: React.FC<{ count?: number }> = ({ count = 12 }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <p key={index}>
        <strong>Article {index + 1}.</strong> Texte d’exemple destiné à remplir
        la modale afin de vérifier le défilement du contenu et le maintien du
        pied de page visible en bas de l’écran.
      </p>
    ))}
  </>
);

type ActionsProps = {
  /** Nom de la modale, utilisé par le ModalManager pour la fermeture. */
  modalName: string;
  confirmLabel: string;
  cancelLabel?: string;
};

/** Boutons d’action, placés soit dans le body, soit dans le footer. */
const Actions: React.FC<ActionsProps> = ({
  modalName,
  confirmLabel,
  cancelLabel = "Annuler",
}) => (
  <>
    <Button
      variant="secondary"
      label={cancelLabel}
      data-modal-close={modalName}
    />
    <Button
      variant="primary"
      label={confirmLabel}
      data-modal-close={modalName}
    />
  </>
);

/**
 * Conteneur des boutons quand ils sont dans le body (contenu court).
 * Styles inline uniquement pour la démo : à remplacer par la classe
 * utilitaire du design system si elle existe.
 */
const BodyActions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.75rem",
      marginTop: "1.5rem",
    }}
  >
    {children}
  </div>
);

/** Ligne de footer : information à gauche, actions à droite. */
const FooterRow: React.FC<{
  info?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ info, children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1rem",
      width: "100%",
    }}
  >
    <div>{info}</div>
    {children && (
      <div style={{ display: "flex", gap: "0.75rem" }}>{children}</div>
    )}
  </div>
);

/** Champ de formulaire avec label explicitement associé. */
const Field: React.FC<{
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
}> = ({ id, label, type = "text", autoComplete }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
      marginBottom: "1rem",
    }}
  >
    <label htmlFor={id}>{label}</label>
    <input id={id} type={type} autoComplete={autoComplete} />
  </div>
);

/** Données de démo pour les listes. */
const TRAININGS = Array.from(
  { length: 15 },
  (_, index) => `Formation ${index + 1}`,
);
const FILTER_OPTIONS = [
  "Accessibilité",
  "Design system",
  "UX research",
  "Prototypage",
  "Développement front",
  "Gestion de projet",
  "Rédaction web",
  "Tests utilisateurs",
];

/* ==========================================================================
   MÉTADONNÉES
   ========================================================================== */

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <>
        <PageBackground />
        <Story />
      </>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Modale accessible (centrée ou latérale, 4 tailles). Le footer est un emplacement fixe : il accueille les boutons d’action quand le contenu défile, ou des informations et filtres. Quand le contenu est court, les boutons sont placés à la fin du body.",
      },
    },
  },
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["center", "left", "right"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "full"],
    },
    defaultOpen: {
      control: "boolean",
      description: "État ouvert par défaut",
      table: { defaultValue: { summary: "false" } },
    },
    children: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
  args: {
    defaultOpen: true,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/* ==========================================================================
   CONTENU COURT : boutons dans le body, pas de footer
   ========================================================================== */

/** Confirmation d’une action destructive : message court, boutons dans le body. */
export const ConfirmationSuppression: Story = {
  name: "Center / sm / confirmation (boutons dans le body)",
  args: {
    name: "demo-delete",
    title: "Supprimer la formation ?",
    icon: "AlertTriangle",
    position: "center",
    size: "sm",
    children: (
      <>
        <p>
          La formation « Design system » et sa progression seront supprimées.
          Cette action est définitive.
        </p>
        <BodyActions>
          <Actions modalName="demo-delete" confirmLabel="Supprimer" />
        </BodyActions>
      </>
    ),
  },
};

/** Message d’information : aucune action, la fermeture se fait via le bouton de fermeture. */
export const InformationSimple: Story = {
  name: "Center / sm / information (sans bouton)",
  args: {
    name: "demo-info",
    title: "Maintenance programmée",
    icon: "Info",
    position: "center",
    size: "sm",
    children: (
      <p>Le service sera indisponible samedi de 2 h à 4 h pour maintenance.</p>
    ),
  },
};

/** Formulaire court : les champs tiennent à l’écran, les boutons suivent dans le body. */
export const FormulaireCourt: Story = {
  name: "Center / md / formulaire court (boutons dans le body)",
  args: {
    name: "demo-short-form",
    title: "Inviter un collègue",
    position: "center",
    size: "md",
    children: (
      <>
        <Field id="short-form-name" label="Nom complet" autoComplete="name" />
        <Field
          id="short-form-email"
          label="Adresse e-mail"
          type="email"
          autoComplete="email"
        />
        <BodyActions>
          <Actions
            modalName="demo-short-form"
            confirmLabel="Envoyer l’invitation"
          />
        </BodyActions>
      </>
    ),
  },
};

/* ==========================================================================
   CONTENU LONG : boutons dans le footer
   ========================================================================== */

/** Contenu qui défile : les boutons restent accessibles dans le footer. */
export const ConditionsUtilisation: Story = {
  name: "Center / md / contenu long (boutons dans le footer)",
  args: {
    name: "demo-terms",
    title: "Conditions d’utilisation",
    position: "center",
    size: "md",
    children: <LongContent />,
    footer: (
      <FooterRow>
        <Actions
          modalName="demo-terms"
          cancelLabel="Refuser"
          confirmLabel="Accepter"
        />
      </FooterRow>
    ),
  },
};

/** Modale plein écran avec contenu long et footer d’actions. */
export const PleinEcranContenuLong: Story = {
  name: "Center / full / contenu long (boutons dans le footer)",
  args: {
    name: "demo-full",
    title: "Rapport détaillé",
    position: "center",
    size: "full",
    children: <LongContent count={20} />,
    footer: (
      <FooterRow>
        <Actions
          modalName="demo-full"
          cancelLabel="Fermer"
          confirmLabel="Télécharger"
        />
      </FooterRow>
    ),
  },
};

/* ==========================================================================
   FOOTER : INFORMATIONS ET FILTRES
   ========================================================================== */

/** Panneau de filtres : compteur de résultats annoncé aux lecteurs d’écran + actions. */
export const FiltresAvances: Story = {
  name: "Left / lg / filtres (compteur + boutons dans le footer)",
  args: {
    name: "demo-filters",
    title: "Filtres avancés",
    icon: "Filter",
    position: "left",
    size: "lg",
    children: (
      <fieldset style={{ border: 0, padding: 0 }}>
        <legend>Thématiques</legend>
        {FILTER_OPTIONS.map((option) => (
          <div key={option}>
            <label>
              <input type="checkbox" name="topic" value={option} /> {option}
            </label>
          </div>
        ))}
      </fieldset>
    ),
    footer: (
      <FooterRow info={<p aria-live="polite">42 résultats</p>}>
        <Actions
          modalName="demo-filters"
          cancelLabel="Réinitialiser"
          confirmLabel="Appliquer"
        />
      </FooterRow>
    ),
  },
};

/** Liste consultable avec des filtres dans le footer, sans bouton d’action. */
export const ListeAvecFiltresEnFooter: Story = {
  name: "Right / md / liste (filtres dans le footer)",
  args: {
    name: "demo-list-filters",
    title: "Mes formations",
    position: "right",
    size: "md",
    children: (
      <ul>
        {TRAININGS.map((training) => (
          <li key={training}>{training}</li>
        ))}
      </ul>
    ),
    footer: (
      <FooterRow>
        <label>
          Trier par{" "}
          <select defaultValue="recent">
            <option value="recent">Plus récentes</option>
            <option value="name">Nom</option>
          </select>
        </label>
        <label>
          <input type="checkbox" /> Afficher les archivées
        </label>
      </FooterRow>
    ),
  },
};

/** Panneau de détails : le footer porte uniquement une information. */
export const DetailsAvecInformation: Story = {
  name: "Right / sm / détails (footer informatif)",
  args: {
    name: "demo-details",
    title: "Détails",
    position: "right",
    size: "sm",
    children: <p>Panneau étroit pour consulter rapidement une fiche.</p>,
    footer: (
      <FooterRow
        info={<small>Dernière modification : 12 septembre 2026</small>}
      />
    ),
  },
};

/* ==========================================================================
   MODALE LATÉRALE DE NAVIGATION
   ========================================================================== */

/** Menu de navigation : pas de footer, pas d’action. */
export const NavigationGauche: Story = {
  name: "Left / md / navigation (sans footer)",
  args: {
    name: "demo-nav",
    icon: "Menu",
    position: "left",
    size: "md",
    className: "modal--menu",
    children: (
      <Menu
        onLinkClick={() => {}}
        onLogout={() => {}}
        onThemeChange={() => {}}
        sections={[
          {
            id: "qa",
            items: [
              {
                href: "/biblio",
                icon: "Library",
                id: "1",
                label: "Bibliothèque",
              },
              {
                href: "/edt",
                icon: "Calendar",
                id: "2",
                label: "Emploi du temps",
              },
              {
                href: "/aide",
                icon: "HelpCircle",
                id: "3",
                label: "Aide",
              },
            ],
            title: "Accès rapide",
            type: "quick-access",
          },
          {
            group: {
              defaultOpen: true,
              icon: "Menu",
              id: "main",
              items: [
                {
                  href: "/",
                  icon: "Home",
                  id: "home",
                  label: "Accueil",
                },
                {
                  children: [
                    {
                      href: "/formations/licence",
                      id: "licence",
                      label: "Licence",
                    },
                    {
                      href: "/formations/master",
                      id: "master",
                      label: "Master",
                    },
                    {
                      href: "/formations/doctorat",
                      id: "doctorat",
                      label: "Doctorat",
                    },
                  ],
                  href: "/formations",
                  icon: "GraduationCap",
                  id: "formations",
                  label: "Formations",
                },
                {
                  href: "/cours",
                  icon: "BookOpen",
                  id: "cours",
                  label: "Mes cours",
                },
                {
                  href: "/contact",
                  icon: "Mail",
                  id: "contact",
                  label: "Contact",
                },
              ],
              title: "Navigation",
            },
            id: "nav",
            type: "group",
          },
          {
            group: {
              defaultOpen: false,
              icon: "Settings",
              id: "settings",
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
              title: "Paramètres",
            },
            id: "settings",
            type: "group",
          },
          {
            id: "top",
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
            type: "items",
          },
        ]}
        user={{
          id: "jdupont123",
          name: "Jean Dupont",
        }}
      />
    ),
  },
};

/* ==========================================================================
   STORY INTERACTIVE (fermées par défaut, ouvertes via un bouton de la page)
   ========================================================================== */

const InteractiveModals: React.FC = () => (
  <>
    <Button
      variant="primary"
      label="Supprimer (contenu court)"
      data-modal-open="interactive-short"
    />
    <Button
      variant="secondary"
      label="Conditions (contenu long)"
      data-modal-open="interactive-long"
    />

    <Modal
      name="interactive-short"
      title="Supprimer l’élément ?"
      icon="AlertTriangle"
      position="center"
      size="sm"
      defaultOpen={false}
    >
      <p>Cette action est définitive.</p>
      <BodyActions>
        <Actions modalName="interactive-short" confirmLabel="Supprimer" />
      </BodyActions>
    </Modal>

    <Modal
      name="interactive-long"
      title="Conditions d’utilisation"
      position="center"
      size="md"
      defaultOpen={false}
      footer={
        <FooterRow>
          <Actions
            modalName="interactive-long"
            cancelLabel="Refuser"
            confirmLabel="Accepter"
          />
        </FooterRow>
      }
    >
      <LongContent />
    </Modal>
  </>
);

/** Deux modales fermées par défaut pour tester ouverture, fermeture et retour du focus (ModalManager). */
export const Interactive: Story = {
  name: "Interactive (contenu court et long)",
  render: () => <InteractiveModals />,
};
