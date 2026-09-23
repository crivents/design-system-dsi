import type { Meta, StoryObj } from "@storybook/react";
import Form from "./Form";
import FormFieldset from "./FormFieldset";
import InputText from "../Input/InputText/InputText";
import Select from "../Input/Select/Select";
import Button from "../Button/Button";
import RadioGroup from "../Input/Radio/Radio";
import CheckboxGroup from "../Input/CheckBox/CheckBoxGroup";
import InputPassword from "../Input/InputPassword/InputPassword";

const meta: Meta<typeof Form> = {
  title: "Components/Form/Form",
  component: Form,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Formulaire générique réutilisable avec blocs fonctionnels.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const FormulaireComplet: Story = {
  args: {
    title: "Formulaire complet",
    description: "Tous les types de champs disponibles",
  },
  render: (args) => (
    <Form {...args}>
      <FormFieldset legend="Identité" name="identite">
        <InputText id="nom" name="nom" label="Nom" type={"number"} />
        <InputText id="prenom" name="prenom" label="Prénom" />
      </FormFieldset>

      <FormFieldset legend="Préférences" name="preferences">
        <Select
          id="pays"
          name="pays"
          label="Pays"
          options={[
            { value: "fr", label: "France" },
            { value: "be", label: "Belgique" },
            { value: "ch", label: "Suisse" },
          ]}
          placeholder="Sélectionnez un pays"
        />

        <RadioGroup
          id="statut"
          name="statut"
          label="Statut"
          options={[
            { value: "student", label: "Étudiant" },
            { value: "professional", label: "Professionnel" },
          ]}
        />

        <CheckboxGroup
          id="interets"
          name="interets"
          label="Centres d'intérêt"
          options={[
            { value: "sport", label: "Sport" },
            { value: "musique", label: "Musique" },
            { value: "lecture", label: "Lecture" },
          ]}
        />
      </FormFieldset>

      <Button
        label="Envoyer"
        variant="primary"
        type="submit"
        className="form__buttons"
        iconLeft="Send"
      />
    </Form>
  ),
};

export const AvecValidation: Story = {
  args: {
    title: "Formulaire avec validation",
    description: "Les champs sont validés selon les règles définies",
    enableValidation: true,
  },
  render: (args) => (
    <Form {...args} onSubmit={(values) => console.log("Soumis:", values)}>
      <FormFieldset legend="Informations" name="informations">
        <RadioGroup
          id="statut"
          name="statut"
          label="Statut"
          required
          options={[
            {
              value: "5",
              label: "5",
            },
            {
              value: "6",
              label: "6",
            },
            {
              value: "7",
              label: "7",
            },
          ]}
        />

        <InputText id="nom" name="nom" label="Nom" required minLength={2} />

        <InputText
          id="email"
          name="email"
          label="Email"
          type="email"
          data-rules='{"required": true, "email": true}'
        />

        <InputPassword
          id="password"
          name="password"
          label="Mot de passe"
          data-rules='{"required": true, "minLength": 12}'
        />
      </FormFieldset>

      <Button type="submit" label="Valider" className="form__buttons" />
    </Form>
  ),
};

export const AvecChampsLiés: Story = {
  args: {
    title: "Validation croisée",
  },
  render: (args) => (
    <Form {...args}>
      <FormFieldset legend="Mot de passe" name="mot-de-passe">
        <InputPassword
          id="password"
          name="password"
          label="Mot de passe"
          data-rules='{"required": true, "minLength": 8}'
          data-linked-fields='["confirmPassword"]'
        />

        <InputPassword
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmer le mot de passe"
          data-rules='{"required": true, "match": "password"}'
        />
      </FormFieldset>

      <Button type="submit" label="Créer le compte" className="form__buttons" />
    </Form>
  ),
};
