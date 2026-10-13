import React, { useState, useCallback } from "react";
import imageStep3 from "./images/image-step-3.svg";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import type {
  FeedbackOption,
  FeedbackProps,
  FeedbackStep,
  FeedbackData,
} from "./feedback.types";
import Modal from "../Modal/Modal";
import InputText from "../Input/InputText/InputText";
import Link from "../Link/Link";
import Media from "../Media/Media";

/* ==========================================================================
   OPTIONS PAR DÉFAUT
   ========================================================================== */

const DEFAULT_REASONS: FeedbackOption[] = [
  { id: "comprehension", label: "Le contenu n’était pas clair" },
  { id: "missing-info", label: "Il manquait des informations" },
  { id: "error", label: "J’ai rencontré une erreur" },
  { id: "slow", label: "Le site était lent" },
  { id: "accessibility", label: "Accéssibilité" },
];

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Feedback: React.FC<FeedbackProps> = ({
  maxRating = 5,
  detailThreshold = 2,
  onSubmit,
  className = "",
  reasonsProp = DEFAULT_REASONS,
  defaultOpen = true,
}) => {
  /* ------------------------------------------------------------------
     État du parcours
     ------------------------------------------------------------------ */
  const [step, setStep] = useState<FeedbackStep>("rating");
  const [rating, setRating] = useState<number | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [showCommentField, setShowCommentField] = useState<boolean>(false);

  /* ------------------------------------------------------------------
     Envoi des données
     ------------------------------------------------------------------ */

  const submitFeedback = useCallback(
    (data: FeedbackData) => {
      onSubmit?.(data);
      setStep("thanks");
    },
    [onSubmit],
  );

  /* ------------------------------------------------------------------
     Transitions
     ------------------------------------------------------------------ */

  const handleRatingChange = useCallback(
    (value: number) => {
      setRating(value);

      if (value <= detailThreshold) {
        setStep("detail");
      } else {
        submitFeedback({ rating: value });
      }
    },
    [detailThreshold, submitFeedback],
  );

  const handleReasonToggle = useCallback((reasonId: string) => {
    setReasons((prev) =>
      prev.includes(reasonId)
        ? prev.filter((id) => id !== reasonId)
        : [...prev, reasonId],
    );
  }, []);

  const handleDetailSubmit = useCallback(() => {
    if (rating === null) return;
    submitFeedback({ rating, reasons, comment: comment.trim() || undefined });
  }, [rating, reasons, comment, submitFeedback]);

  /* ------------------------------------------------------------------
     Rendu : Étape 1 — Notation
     ------------------------------------------------------------------ */

  const renderRatingStep = () => (
    <div className="feedback__step feedback__step--rating">
      <label id="feedback-rating-label" className="feedback__label">
        Votre avis nous aide à nous améliorer.
      </label>

      <div
        className="feedback__rating"
        role="radiogroup"
        aria-labelledby="feedback-rating-label"
      >
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((value) => (
          <label
            key={value}
            className={`feedback__rate ${
              rating !== null && value <= rating ? "is-active" : ""
            }`}
          >
            {value}
            <input
              type="radio"
              name="feedback-rating"
              value={value}
              checked={rating === value}
              onChange={() => handleRatingChange(value)}
              className="feedback__input"
              aria-label={`${value} sur ${maxRating}`}
            />
          </label>
        ))}
        <div className="feedback__hint">
          <p className="feedback__hint-info">Pauvre</p>
          <p className="feedback__hint-info">Excellente</p>
        </div>
      </div>
    </div>
  );

  /* ------------------------------------------------------------------
     Rendu : Étape 2 — Précision
     ------------------------------------------------------------------ */

  const renderDetailStep = () => (
    <div className="feedback__step feedback__step--detail">
      <p className="feedback__subtitle">
        Votre retour nous aide à améliorer le service.
      </p>

      <fieldset className="feedback__reasons">
        <legend className="feedback__reasons-legend sr-only">
          Sélectionner le motif (plusieurs choix possibles)
        </legend>

        {reasonsProp.map((reason) => (
          <label key={reason.id} className="feedback__reason">
            <input
              type="checkbox"
              value={reason.id}
              checked={reasons.includes(reason.id)}
              onChange={() => handleReasonToggle(reason.id)}
              className="feedback__reason-input"
            />
            <span className="feedback__reason-label">{reason.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="feedback__comment-wrapper">
        <InputText
          id="feedback-comment"
          label="Commentaire (optionnel)"
          type="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Décrivez votre expérience…"
          rows={4}
        />
      </div>

      <div className="feedback__actions">
        <Button
          variant="primary"
          label="Envoyer"
          onClick={handleDetailSubmit}
        />
        <p className="feedback__actions-hint">ou</p>
        <Link
          label="Nous contacter directement"
          href="/contact"
          className="feedback__contact-link"
          icon="Mail"
        />
      </div>
    </div>
  );

  /* ------------------------------------------------------------------
     Rendu : Étape 3 — Remerciement
     ------------------------------------------------------------------ */

  const renderThanksStep = () => (
    <div className="feedback__step feedback__step--thanks">
      <Media
        className="feedback__step-3-image"
        type="svg"
        ratio="1/1"
        size="sm"
        rounded
        maxWidth="14 rem"
        src={imageStep3}
        alt="image de remerciement"
      />
      <div className="feedback__actions">
        <Button
          variant="secondary"
          label="Fermer"
          data-modal-close="feedback"
        />
      </div>
    </div>
  );

  /* ------------------------------------------------------------------
     Composition
     ------------------------------------------------------------------ */

  const stepRenderers: Record<FeedbackStep, () => React.ReactNode> = {
    rating: renderRatingStep,
    detail: renderDetailStep,
    thanks: renderThanksStep,
  };

  const containerClasses = ["feedback", `feedback--${step}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Modal
      className={containerClasses}
      aria-live="polite"
      aria-atomic="true"
      name="feedback"
      size="sm"
      title={
        step === "detail" || step === "rating"
          ? "Notez votre expérience"
          : "Merci de votre retour"
      }
      defaultOpen={defaultOpen}
    >
      <div className="feedback">{stepRenderers[step]()}</div>
    </Modal>
  );
};

export default Feedback;
