import React, { useState } from "react";
import "./ColorSwatch.css";

export interface ColorSwatchProps {
  /** Nom du token */
  name: string;
  /** Valeur de la couleur (hex, rgb, hsl...) */
  value: string;
  /** Description optionnelle */
  description?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  value,
  description,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className={`color-swatch`} onClick={handleCopy}>
      <div
        className="color-swatch__preview"
        style={{ backgroundColor: value }}
        title="Cliquer pour copier"
      />
      <div className="color-swatch__info">
        <div className="color-swatch__name">{name}</div>
        <div className="color-swatch__value">{value}</div>
        {description && (
          <div className="color-swatch__description">{description}</div>
        )}
        {copied && (
          <div className="color-swatch__copied">
            Copié dans le presse-papier
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorSwatch;
