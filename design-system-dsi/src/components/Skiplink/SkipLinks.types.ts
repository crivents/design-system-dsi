export interface SkipLinkItem {
  /** Identifiant unique */
  id: string;
  /** Id de l'élément cible */
  targetId: string;
  /** Libellé du lien */
  label: string;
}

export interface SkipLinksProps {
  /** Liste des liens d'évitement */
  links: SkipLinkItem[];
  /** Libellé accessible du groupe */
  ariaLabel?: string;
  /** Classes additionnelles */
  className?: string;
}
