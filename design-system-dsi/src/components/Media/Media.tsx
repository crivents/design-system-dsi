import React from "react";
import type { MediaProps } from "./Media.types";
import MediaImage from "./Components/MediaImage";
import MediaSvg from "./Components/MediaSvg";

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Media: React.FC<MediaProps> = (props) => {
  const {
    type,
    ratio = "auto",
    size,
    maxWidth,
    maxHeight,
    fit,
    rounded,
    caption,
    className = "",
  } = props;

  const containerClasses = [
    "media",
    `media--${type}`,
    ratio !== "auto" && `media--ratio-${ratio.replace("/", "-")}`,
    size && `media--size-${size}`,
    fit && `media--fit-${fit}`,
    rounded && "media--rounded",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerStyle: React.CSSProperties = {
    maxWidth,
    maxHeight,
  };

  const renderMedia = () => {
    switch (props.type) {
      case "image":
        return <MediaImage {...props} />;
      case "svg":
        return <MediaSvg {...props} />;
      default:
        return null;
    }
  };

  return (
    <figure className={containerClasses} style={containerStyle}>
      {renderMedia()}

      {caption && <figcaption className="media__caption">{caption}</figcaption>}
    </figure>
  );
};

export default Media;
