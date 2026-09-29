import type { FC, ReactNode } from "react";

/**
 * Types de statut pour le composant Do/Don't
 */
export type messageStatus = "info" | "success" | "warning" | "error";

/**
 * Props du composant DoDont
 */
export interface DoDontProps {
  /** Type : Do (bonne pratique) ou Don't (mauvaise pratique) */
  status: messageStatus;
  /** Titre du message */
  title?: string;
  /** Description */
  children?: ReactNode;
}

const defaultTitles: Record<messageStatus, string> = {
  info: "Information",
  success: "Succès",
  warning: "Avertissement",
  error: "Erreur",
};

const Message: FC<DoDontProps> = ({ status, children, title }) => {
  const showTitle = title || defaultTitles[status];

  return (
    <div className={`u-message u-message--${status}`}>
      <div className="u-message__header">
        <span className="u-message__title">{showTitle}</span>
      </div>
      <div className="u-message__content">{children}</div>
    </div>
  );
};

export default Message;
