export const VALIDATION_RULES = {
  required: {
    validate: (v: string) => v.trim().length > 0,
    message: "Ce champ est obligatoire",
  },
  email: {
    validate: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message: "Adresse e-mail invalide",
  },
  minLength: {
    validate: (v: string, param: number) => v.length >= param,
    message: (param: number) => `Minimum ${param} caractères requis`,
  },
  // ... autres règles
};

// Type pour les règles
export type ValidationRuleName = keyof typeof VALIDATION_RULES;
