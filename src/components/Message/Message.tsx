import React, { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

/* ==========================================================================
   TYPES
   ========================================================================== */

export type MessageType = "info" | "success" | "warning" | "error";

export interface MessageProps {
  /** Identifiant unique du message */
  id?: string;
  /** Type de message (info, success, warning, error) */
  type: MessageType;
  /** Titre du message */
  title: string;
  /** Contenu du message */
  children: ReactNode;
  /** Icône optionnelle (remplace l'icône par défaut) */
  iconName?: keyof typeof import("lucide-react");
  /** Masquer l'icône */
  hideIcon?: boolean;
  /** Classes additionnelles */
  className?: string;
  /** Rôle ARIA (par défaut : "status" pour info/success, "alert" pour warning/error) */
  role?: string;
  /** Focaliser le message à l'apparition */
  autoFocus?: boolean;
}

/* ==========================================================================
   ICÔNES PAR DÉFAUT
   ========================================================================== */

const DEFAULT_ICONS: Record<MessageType, keyof typeof import("lucide-react")> =
  {
    info: "Info",
    success: "CheckCircle",
    warning: "AlertTriangle",
    error: "XCircle",
  };

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Message: React.FC<MessageProps> = ({
  id,
  type,
  title,
  children,
  iconName,
  hideIcon = false,
  className = "",
  role,
  autoFocus = false,
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const messageId =
    id || `message-${type}-${Math.random().toString(36).substr(2, 9)}`;
  const defaultRole =
    type === "error" || type === "warning" ? "alert" : "status";
  const messageRole = role || defaultRole;
  const selectedIcon = iconName || DEFAULT_ICONS[type];

  // Focaliser le message à l'apparition si demandé
  useEffect(() => {
    if (autoFocus && messageRef.current) {
      messageRef.current.focus();
    }
  }, [autoFocus]);

  const containerClasses = ["message", `message--${type}`, className]
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
      <div className="message__content">
        <div className="message__header">
          {!hideIcon && (
            <div className="message__icon" aria-hidden="true">
              <Icon name={selectedIcon} size="md" />
            </div>
          )}
          <p className="message__title" id={`${messageId}-title`}>
            {title}
          </p>
        </div>

        <div className="message__body">{children}</div>
      </div>
    </div>
  );
};

export default Message;
