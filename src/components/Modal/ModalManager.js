/**
 * Gestion des modales accessibles.
 * Gère l'ouverture, la fermeture, le focus trap et la navigation clavier
 * selon les critères d'accessibilité ARIA.
 */
export class ModalManager {
  /**
   * @param {string} name - Nom unique de la modale (data-modal="<name>")
   * @param {HTMLElement} [overlay=null] - Élément overlay (optionnel)
   */
  constructor(name, overlay = null) {
    /** @type {HTMLElement|null} Overlay principal */
    this.overlay = overlay || document.querySelector(`[data-modal="${name}"]`);

    /** @type {HTMLElement|null} Contenu de la modale */
    this.modal = this.overlay?.querySelector(".modal");

    /** @type {HTMLElement|null} Fond cliquable */
    this.overlayFond = this.overlay?.querySelector(".overlay__fond");

    /** @type {NodeList} Boutons d'ouverture */
    this.openButtons = document.querySelectorAll(`[data-modal-open="${name}"]`);

    /** @type {HTMLElement|null} Élément ayant le focus avant l'ouverture */
    this.previousFocus = null;

    this._init();
  }

  /**
   * @private
   * Initialise tous les écouteurs d'événements.
   */
  _init() {
    if (!this.overlay) return;

    // Boutons d'ouverture
    this.openButtons.forEach((btn) => {
      btn.addEventListener("click", () => this._open());
    });

    // Délégation pour prendre en charge les boutons rendus après l'initialisation.
    this.overlay.addEventListener("click", (e) => {
      if (!(e.target instanceof Element)) return;

      if (
        e.target.closest(`[data-modal-close="${this.overlay.dataset.modal}"]`)
      ) {
        this._close();
      }
    });

    // Clic sur le fond
    if (this.overlayFond) {
      this.overlayFond.addEventListener("click", () => {
        if (this.overlayFond.dataset.modalFond === "false") return;
        this._close();
      });
    }

    // Fermeture avec Échap
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this._isOpen()) {
        this._close();
      }
    });

    // Focus trap
    this.modal?.addEventListener("keydown", (e) => {
      this._handleTabKey(e);
    });

    // Si la modale est ouverte par défaut, on initialise l'état
    if (this._isOpen()) {
      document.body.classList.add("modal-open");
    }
  }

  /**
   * @private
   * Ouvre la modale.
   */
  _open() {
    this.previousFocus = document.activeElement;

    this.overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    setTimeout(() => {
      this._getFirstFocusable()?.focus();
    }, 100);
  }

  /**
   * @private
   * Ferme la modale avec animation.
   */
  _close() {
    this.overlay.classList.add("closing");

    setTimeout(() => {
      this.overlay.setAttribute("aria-hidden", "true");
      this.overlay.classList.remove("closing");
      document.body.classList.remove("modal-open");

      if (this.previousFocus) {
        this.previousFocus.focus();
      }
    }, 300);
  }

  /**
   * @private
   * Indique si la modale est ouverte.
   */
  _isOpen() {
    return this.overlay.getAttribute("aria-hidden") === "false";
  }

  /**
   * @private
   * Retourne le premier élément focusable de la modale.
   */
  _getFirstFocusable() {
    return this.modal?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
  }

  /**
   * @private
   * Gère la navigation par tabulation dans la modale.
   */
  _handleTabKey(e) {
    if (e.key !== "Tab") return;

    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  }
}

/**
 * Initialisation automatique des modales au chargement du DOM.
 */
document.addEventListener("DOMContentLoaded", () => {
  const overlays = document.querySelectorAll("[data-modal]");
  overlays.forEach((overlay) => {
    const name = overlay.dataset.modal;
    new ModalManager(name, overlay);
  });
});
