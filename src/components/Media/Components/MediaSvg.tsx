import React from "react";
import type { MediaSvgProps } from "../Media.types";

const MediaSvg: React.FC<MediaSvgProps> = ({ src, alt, children }) => {
  /* SVG inline fourni */
  if (children) {
    return (
      <div
        className="media__svg media__svg--inline"
        role="img"
        aria-label={alt}
      >
        {children}
      </div>
    );
  }

  /* SVG chargé depuis un fichier */
  return (
    <img
      src={src}
      alt={alt}
      className="media__svg"
      loading="lazy"
      decoding="async"
    />
  );
};

export default MediaSvg;
