/**
 * Tronque une chaîne à un nombre maximum de mots.
 * Ajoute "…" si la chaîne a été tronquée.
 */
export const truncateWords = (text: string, maxWords = 4): string => {
  const words = text.trim().split(/\s+/);

  if (words.length <= maxWords) {
    return text;
  }

  return `${words.slice(0, maxWords).join(" ")}…`;
};
