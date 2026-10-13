// useFormValidation.ts
import { useCallback, useEffect, useRef } from "react";
// @ts-expect-error - ValidationGestion is provided at runtime without a declaration file.
import { ValidationGestion } from "../validation/ValidationGestion";

export interface UseFormValidationReturn {
  /** Référence au formulaire */
  formRef: React.RefObject<HTMLFormElement | null>;
  /** Valide tous les champs, retourne true si tout est valide */
  validateAll: () => boolean;
  /** Récupère les valeurs du formulaire */
  getValues: () => Record<string, string>;
  /** Réinitialise le formulaire */
  reset: () => void;
  /** Instance de validation (pour accès avancé) */
  validationInstance: ValidationGestion | null;
}

export const useFormValidation = (): UseFormValidationReturn => {
  const formRef = useRef<HTMLFormElement>(null);
  const validationRef = useRef<ValidationGestion | null>(null);

  useEffect(() => {
    if (formRef.current) {
      validationRef.current = new ValidationGestion(formRef.current);
    }

    // Nettoyage à la destruction
    return () => {
      validationRef.current = null;
    };
  }, []);

  const validateAll = useCallback((): boolean => {
    return validationRef.current?.validateAll() ?? true;
  }, []);

  const getValues = useCallback((): Record<string, string> => {
    return validationRef.current?.getValues() ?? {};
  }, []);

  const reset = useCallback((): void => {
    validationRef.current?.reset();
  }, []);

  return {
    formRef,
    validateAll,
    getValues,
    reset,
    validationInstance: validationRef.current,
  };
};
