import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Fichier CSS à analyser (tokens)
 * Adaptez ce chemin si nécessaire.
 */
const CSS_FILE = path.resolve(__dirname, "./src/styles/main.css");

/**
 * Fichier JSON de sortie
 */
const OUTPUT_FILE = path.resolve(__dirname, "./src/data/colors.json");

/**
 * Catégories de classification
 * L'ordre détermine la priorité (la première catégorie qui correspond au nom gagne).
 * Chaque catégorie possède une liste de mots-clés à rechercher dans le nom de la variable.
 */
const CATEGORIES = [
  {
    name: "Texte",
    keywords: ["text"],
  },
  {
    name: "Fond",
    keywords: ["background"],
  },
  {
    name: "Bordure",
    keywords: ["border"],
  },
  {
    name: "Action",
    keywords: ["action"],
  },
  {
    name: "Statuts",
    keywords: ["status", "success", "warning", "error", "info", "danger"],
  },
  {
    name: "Primitives",
    keywords: [
      "blue",
      "red",
      "green",
      "orange",
      "yellow",
      "gray",
      "grey",
      "black",
      "white",
      "primary",
      "secondary",
    ],
  },
  // Ajoutez ici d'autres catégories si nécessaire
];

/**
 * Fonction pour extraire les variables de couleur d'un contenu CSS.
 * Retourne un tableau d'objets { name, value }.
 */
function extractColors(cssContent) {
  const colorRegex =
    /--([a-zA-Z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|var\([^)]+\));/g;
  const colors = [];
  let match;

  while ((match = colorRegex.exec(cssContent)) !== null) {
    const name = `--${match[1]}`;
    const value = match[2];

    // Filtrer : on ne garde que les variables qui sont des couleurs.
    // On peut ajouter d'autres conditions si nécessaire (ex: exclure les ombres).
    if (name.includes("color")) {
      colors.push({ name, value });
    }
  }

  return colors;
}

/**
 * Fonction pour classer une couleur selon son nom.
 * Retourne le nom de la catégorie.
 */
function classifyColor(colorName) {
  const lowerName = colorName.toLowerCase();

  for (const category of CATEGORIES) {
    if (category.keywords.some((keyword) => lowerName.includes(keyword))) {
      return category.name;
    }
  }

  // Catégorie par défaut si aucun mot-clé ne correspond
  return "Autres";
}

/**
 * Fonction principale : lit le CSS, extrait les couleurs, les classe,
 * puis écrit le JSON de sortie.
 */
function main() {
  if (!fs.existsSync(CSS_FILE)) {
    process.exit(1);
  }

  const cssContent = fs.readFileSync(CSS_FILE, "utf8");
  const colors = extractColors(cssContent);

  if (colors.length === 0) {
    process.exit(1);
  }

  // Classement
  const grouped = {};
  colors.forEach((color) => {
    const category = classifyColor(color.name);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(color);
  });

  // Tri des catégories (ordre alphabétique) et des couleurs dans chaque catégorie
  const sortedGrouped = {};
  Object.keys(grouped)
    .sort()
    .forEach((category) => {
      sortedGrouped[category] = grouped[category].sort((a, b) =>
        a.name.localeCompare(b.name, "fr"),
      );
    });

  // Écriture du JSON
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sortedGrouped, null, 2), "utf8");

  Object.entries(sortedGrouped).forEach(([category, colors]) => {});
}

main();
