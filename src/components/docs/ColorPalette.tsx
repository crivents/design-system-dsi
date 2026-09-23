import React from "react";
import ColorSwatch, { type ColorSwatchProps } from "./ColorSwatch";
import "./ColorPalette.css";

export interface ColorPaletteProps {
  /** Titre de la catégorie */
  title: string;
  /** Liste des couleurs */
  colors: ColorSwatchProps[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ title, colors }) => {
  return (
    <section className="color-palette">
      <h2 className="color-palette__title">{title}</h2>
      <div className="color-palette__grid">
        {colors.map((color) => (
          <ColorSwatch key={color.name} {...color} />
        ))}
      </div>
    </section>
  );
};

export default ColorPalette;
