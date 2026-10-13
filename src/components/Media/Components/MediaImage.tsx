import React from "react";
import type { MediaImageProps } from "../Media.types";

const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt,
  srcSet,
  sizes,
  sources,
  loading = "lazy",
  onLoad,
  onError,
}) => {
  /* Cas avec <picture> */
  if (sources && sources.length > 0) {
    return (
      <picture>
        {sources.map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            type={source.type}
            media={source.media}
          />
        ))}
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className="media__image"
          onLoad={onLoad}
          onError={onError}
        />
      </picture>
    );
  }

  /* Cas simple */
  return (
    <img
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes}
      loading={loading}
      decoding="async"
      className="media__image"
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default MediaImage;
