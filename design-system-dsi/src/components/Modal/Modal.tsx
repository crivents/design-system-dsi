import React from "react";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import type { ModalProps } from "./Modal.types";

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Modal: React.FC<ModalProps> = ({
  name,
  title,
  icon,
  position = "center",
  size = "md",
  children,
  footer,
  closeOnOverlayClick = true,
  defaultOpen = false,
  className = "",
}) => {
  const modalId = `modal-${name}`;
  const titleId = `${modalId}-title`;
  const overlayId = `${modalId}-overlay`;

  const modalClasses = [
    "modal",
    `modal--${position}`,
    `modal--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      id={overlayId}
      data-modal={name}
      className="overlay"
      aria-hidden={defaultOpen ? "false" : "true"}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Fond cliquable */}
      <div
        className="overlay__fond"
        data-modal-fond={closeOnOverlayClick ? "true" : "false"}
      />

      {/* Contenu de la modale */}
      <div className={modalClasses} role="document">
        <Button
          variant="tertiary"
          className="modal__close"
          data-modal-close={name}
          aria-label="Fermer la modale"
          iconLeft="X"
          label={size !== "sm" ? "Fermer" : ""}
        />

        {/* En-tête */}
        {title && (
          <div className="modal__title-wrapper">
            {icon && (
              <Icon
                name={icon}
                size="md"
                className="modal__icon"
                aria-hidden="true"
              />
            )}
            <h2 className="modal__title" id={titleId}>
              {title}
            </h2>
          </div>
        )}

        {/* Corps */}
        <div className="modal__body">{children}</div>

        {/* Pied */}
        {footer && <footer className="modal__footer">{footer}</footer>}
      </div>
    </div>
  );
};

export default Modal;
