import { useState, useCallback } from "react";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface UseCollapsibleReturn {
  /** État d'ouverture */
  isOpen: boolean;
  /** Ouvre le contenu */
  open: () => void;
  /** Ferme le contenu */
  close: () => void;
  /** Bascule l'état */
  toggle: () => void;
  /** Définit l'état manuellement */
  setOpen: (value: boolean) => void;
}

/* ==========================================================================
   HOOK
   ========================================================================== */

/**
 * Hook utilitaire pour gérer l'ouverture/fermeture d'un contenu dépliable.
 * Utilisé en complément du composant <Collapsible>.
 */
export const useCollapsible = (initialOpen = false): UseCollapsibleReturn => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const setOpen = useCallback((value: boolean) => setIsOpen(value), []);

  return { isOpen, open, close, toggle, setOpen };
};

export default useCollapsible;
