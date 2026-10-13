import React, { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/* ==========================================================================
   TYPES
   ========================================================================== */

export type MessageType = "info" | "success" | "warning" | "error";

export interface MessageSection {
  /** Identifiant unique de la section */
  id: string;
  /** Titre de la sous-partie */
  title: string;
  /** Contenu de la sous-partie */
  children: ReactNode;
}

export interface MessageComplexeProps {
  /** Identifiant unique du message */
  id?: string;
  /** Type de message (info, success, warning, error) */
  type: MessageType;
  /** Titre principal du message */
  title: string;
  /** Contenu principal (avant les sous-parties) */
  children?: ReactNode;
  /** Sous-parties du message */
  sections?: MessageSection[];
  /** Icône optionnelle (remplace l'icône par défaut) */
  iconName?: keyof typeof import("lucide-react");
  /** Classes additionnelles */
  className?: string;
  /** Rôle ARIA */
  role?: string;
  /** Focaliser le message à l'apparition */
  autoFocus?: boolean;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const MessageComplexe: React.FC<MessageComplexeProps> = ({
  id,
  type,
  title,
  children,
  sections = [],
  className = "",
  role,
  autoFocus = false,
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const messageId =
    id || `message-complexe-${type}-${Math.random().toString(36).substr(2, 9)}`;
  const defaultRole =
    type === "error" || type === "warning" ? "alert" : "status";
  const messageRole = role || defaultRole;

  // Focaliser le message à l'apparition si demandé
  useEffect(() => {
    if (autoFocus && messageRef.current) {
      messageRef.current.focus();
    }
  }, [autoFocus]);

  const containerClasses = [
    "message-complexe",
    `message-complexe--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={messageRef}
      id={messageId}
      className={containerClasses}
      role={messageRole}
      aria-live={type === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      tabIndex={autoFocus ? -1 : undefined}
    >
      <div className="message-complexe__header">
        <h3 className="message-complexe__title" id={`${messageId}-title`}>
          {title}
        </h3>
      </div>

      {children && <div className="message-complexe__content">{children}</div>}

      {sections.length > 0 && (
        <div
          className="message-complexe__sections"
          role="list"
          aria-label="Sous-parties du message"
        >
          {sections.map((section) => (
            <section
              key={section.id}
              className="message-complexe__section"
              role="listitem"
            >
              {section.children}
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageComplexe;
