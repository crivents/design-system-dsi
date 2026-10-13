/* ==========================================================================
   VALIDATION GESTION
   Système de validation pour formulaires HTML
   ========================================================================== */

/* ==========================================================================
   RÈGLES DE VALIDATION
   ========================================================================== */

const BUILT_IN_RULES = {
  required: {
    validate: (v) => v.trim().length > 0,
    message: "Ce champ est obligatoire",
  },
  email: {
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message: "Adresse e-mail invalide",
  },
  minLength: {
    validate: (v, param) => v.length >= param,
    message: (param) => `Minimum ${param} caractères requis`,
  },
  maxLength: {
    validate: (v, param) => v.length <= param,
    message: (param) => `Maximum ${param} caractères autorisés`,
  },
  pattern: {
    validate: (v, param) => new RegExp(param).test(v),
    message: "Format invalide",
  },
  match: {
    validate: (v, param, allValues) =>
      v.toLowerCase() === allValues[param].toLowerCase(),
    message: "Les valeurs ne correspondent pas",
  },
  notMatch: {
    validate: (v, param, allValues) =>
      v.toLowerCase() !== allValues[param].toLowerCase(),
    message: "Les valeurs sont identiques",
  },
  minDate: {
    validate: (v, param) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
        return new Date(v) >= new Date(param);
      }
      return Number(v) >= param;
    },
    message: (param) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(param)) {
        return `La date doit être après le ${new Date(param).toLocaleDateString("fr-FR")}.`;
      }
      return `La valeur doit être ≥ ${param}`;
    },
  },
  maxDate: {
    validate: (v, param) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
        return new Date(v) <= new Date(param);
      }
      return Number(v) <= param;
    },
    message: (param) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(param)) {
        return `La date doit être avant le ${new Date(param).toLocaleDateString("fr-FR")}.`;
      }
      return `La valeur doit être ≤ ${param}`;
    },
  },
  custom: {
    validate: (v, param) => param(v),
    message: "Valeur invalide",
  },
  noEmail: {
    validate: (v) =>
      BUILT_IN_RULES.pattern.validate(v, "^(?!.*@[^\\s@]+\\.[^\\s@]+$).*$"),
    message: "Les adresses e-mail ne sont pas acceptées",
  },
  noAuditeurFormat: {
    validate: (v) => !v.toLowerCase().endsWith(".auditeur"),
    message:
      "Les identifiants ENF ne sont pas utilisables ici. Cliquez sur Identifiant oublié.",
  },
};

// Règle de validation native des inputs
const NATIVE_RULES_MAP = [
  { attr: "required", key: "required", parse: () => true },
  { attr: "minlength", key: "minLength", parse: (v) => parseInt(v) },
  { attr: "maxlength", key: "maxLength", parse: (v) => parseInt(v) },
  {
    attr: "min",
    key: "min",
    parse: (v) => (/^\d{4}-\d{2}-\d{2}$/.test(v) ? v : parseFloat(v)),
  },
  {
    attr: "max",
    key: "max",
    parse: (v) => (/^\d{4}-\d{2}-\d{2}$/.test(v) ? v : parseFloat(v)),
  },
  { attr: "pattern", key: "pattern", parse: (v) => v },
];

/* ==========================================================================
   CONSTANTES CSS
   ========================================================================== */

const CSS_CLASSES = {
  /* Classes de base */
  label: "input__label",
  icone: "icone",

  /* Classes d'état des champs */
  fieldValid: "input--success",
  fieldInvalid: "input--error",

  /* Classes d'état des conteneurs */
  containerValid: "input--success",
  containerInvalid: "input--error",

  /* Classes d'état des labels */
  labelSucces: "label--success",
  labelErreur: "label--error",

  /* Classes des messages */
  inputMessageContainer: "input__message",
  inputMessageSuccess: "input__message--success",
  inputMessageError: "input__message--error",

  /* Attributs ARIA */
  ariaInvalidTrue: "true",
  ariaInvalidFalse: "false",

  /* Messages HTML */
  messageHtmlVide: "",
};

/* ==========================================================================
   CONTENU DES ICÔNES
   ========================================================================== */

const ICONS = {
  erreur: `<span class="${CSS_CLASSES.icone}" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>`,
  succes: `<span class="${CSS_CLASSES.icone}" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22 22" fill="none">
      <path d="M8 11L10 13L14 9M11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21Z"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>`,
};

/* ==========================================================================
   SÉLECTEURS DOM
   ========================================================================== */

const SELECTORS = {
  field: "input[id^='input-'], input[id^='datalist-input-']",
  radio: "input[type='radio']",
  radioByName: (name) => `input[type='radio'][name='${name}']`,
  radioChecked: (name) => `input[type='radio'][name='${name}']:checked`,
  inputContainer: ".input",
  inputContainerRadio: ".radio-group",
  inputMessageContainer: `.${CSS_CLASSES.inputMessageContainer}`,
  label: `.${CSS_CLASSES.label}`,
};

/* ==========================================================================
   CLASSE PRINCIPALE
   ========================================================================== */

export class ValidationGestion {
  /**
   * @param {HTMLFormElement} formEl - Élément formulaire à gérer
   * @param {Object} [options={}] - Options de configuration
   */
  constructor(formEl, options = {}) {
    this.formEl = formEl;
    this.options = options;

    /** @type {Object.<string, string>} État courant des valeurs indexées par nom de champ */
    this.state = {};
    /** @type {Object.<string, string[]>} Erreurs courantes indexées par nom de champ */
    this.errors = {};
    /** @type {Object.<string, boolean>} Indique si chaque champ a déjà été visité */
    this.touched = {};
    /** @type {OnChangeCallback[]} Callbacks associés aux changements de valeur */
    this.onChangeCallbacks = [];

    /** @type {FieldDescriptor[]} Liste de tous les champs parsés du formulaire */
    this.fields = this._parseFields();
    /** @type {Object.<string, FieldDescriptor>} Index des champs par nom */
    this.fieldMap = Object.fromEntries(this.fields.map((f) => [f.name, f]));

    this._attachListeners();
  }

  /* ==========================================================================
     PARSING DES CHAMPS
     ========================================================================== */

  _parseFields() {
    return [...this._parseTextFields(), ...this._parseRadioFields()];
  }

  _parseTextFields() {
    const inputs = this.formEl.querySelectorAll(SELECTORS.field);
    return Array.from(inputs).map((input) => ({
      name: input.id,
      el: input,
      type: "text",
      rules: this._mergeRules(input),
      linkedFields: this._parseJson(input.dataset.linkedFields, []),
    }));
  }

  _parseRadioFields() {
    const names = new Set(
      Array.from(this.formEl.querySelectorAll(SELECTORS.radio)).map(
        (r) => r.name,
      ),
    );

    return Array.from(names).map((name) => {
      const radios = this.formEl.querySelectorAll(SELECTORS.radioByName(name));
      const firstRadio = radios[0];
      return {
        name,
        el: firstRadio,
        type: "radio",
        radios,
        rules: this._parseJson(firstRadio.dataset.rules, {}),
        linkedFields: this._parseJson(firstRadio.dataset.linkedFields, []),
      };
    });
  }

  _mergeRules(input) {
    const nativeRules = {};

    NATIVE_RULES_MAP.forEach(({ attr, key, parse }) => {
      if (input.hasAttribute(attr)) {
        nativeRules[key] = parse(input.getAttribute(attr));
      }
    });

    if (input.type === "email") {
      nativeRules.email = true;
    }

    return { ...nativeRules, ...this._parseJson(input.dataset.rules, {}) };
  }

  /* ==========================================================================
     LISTENERS
     ========================================================================== */

  _attachListeners() {
    this.fields.forEach((field) => {
      if (field.type === "radio") {
        this._attachRadioListeners(field);
      } else {
        this._attachTextListeners(field);
      }
    });
  }

  _attachTextListeners(field) {
    const { el } = field;
    if (!el) return;

    el.addEventListener("input", (e) => {
      this._updateState(field.name, e.target.value);

      if (this.touched[field.name]) {
        this._validateAndDisplay(field.name);
      }

      this._revalidateLinked(field);
    });

    el.addEventListener("blur", (e) => {
      this.touched[field.name] = true;
      this._updateState(field.name, e.target.value);
      this._validateAndDisplay(field.name);
    });
  }

  _attachRadioListeners(field) {
    field.radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        const checked = this.formEl.querySelector(
          SELECTORS.radioChecked(field.name),
        );
        this.touched[field.name] = true;
        this._updateState(field.name, checked?.value || "");
        this._validateAndDisplay(field.name);
      });
    });
  }

  /* ==========================================================================
     VALIDATION
     ========================================================================== */

  validateField(name) {
    const field = this.fieldMap[name];
    if (!field?.rules) return { valid: true, errors: [] };

    const value = this.state[name] ?? "";

    if (!field.rules.required && value.trim() === "") {
      return { valid: true, errors: [] };
    }

    const errors = [];

    for (const [ruleName, ruleConfig] of Object.entries(field.rules)) {
      const builtIn = BUILT_IN_RULES[ruleName];
      if (!builtIn) continue;

      const param = this._extractParam(ruleConfig);

      const isValid =
        ruleName === "match" || ruleName === "notMatch"
          ? builtIn.validate(value, param, this.getAllValues())
          : builtIn.validate(value, param);

      if (!isValid) {
        errors.push(this._resolveMessage(builtIn, ruleConfig, param));
        break;
      }
    }

    this.errors[name] = errors;
    return { valid: errors.length === 0, errors };
  }

  validateAll() {
    this._syncStateFromDom();
    let allValid = true;

    this.fields.forEach((f) => {
      this.touched[f.name] = true;

      if (this.state[f.name] === undefined) {
        const domValue =
          f.type === "radio"
            ? (this.formEl.querySelector(SELECTORS.radioChecked(f.name))
                ?.value ?? "")
            : (f.el.value ?? "");
        this._updateState(f.name, domValue);
      }

      const res = this.validateField(f.name);
      this.displayFieldError(f.name, res);
      if (!res.valid) allValid = false;
    });

    return allValid;
  }

  checkAll() {
    this._syncStateFromDom();
    this.fields.forEach((f) => {
      this._updateState(f.name, f.el.value);
      this.touched[f.name] = true;
      const res = this.validateField(f.name);
      if (!res.errors) {
        this.displayFieldError(f.name, res);
      }
    });
  }

  _syncStateFromDom() {
    this.fields.forEach((f) => {
      if (this.state[f.name] !== undefined) return;

      const value =
        f.type === "radio"
          ? (this.formEl.querySelector(SELECTORS.radioChecked(f.name))?.value ??
            "")
          : (f.el.value ?? "");

      this._updateState(f.name, value);
    });
  }

  /* ==========================================================================
     AFFICHAGE
     ========================================================================== */

  displayFieldError(name, result) {
    const field = this.fieldMap[name];

    const inputContainer =
      field.type === "radio"
        ? field.el.closest(SELECTORS.inputContainerRadio)
        : field.el.closest(SELECTORS.inputContainer);

    const inputMessageContainer = inputContainer?.querySelector(
      SELECTORS.inputMessageContainer,
    );
    const label = inputContainer?.querySelector(SELECTORS.label);

    if (!inputMessageContainer) return;

    if (result.valid) {
      this._applyState(field.el, inputContainer, label, inputMessageContainer, {
        inputClass: CSS_CLASSES.fieldValid,
        containerClass: CSS_CLASSES.containerValid,
        labelClass: CSS_CLASSES.labelSucces,
        ariaInvalid: CSS_CLASSES.ariaInvalidFalse,
        messageClass: `${CSS_CLASSES.inputMessageContainer} ${CSS_CLASSES.inputMessageSuccess}`,
        messageHtml: CSS_CLASSES.messageHtmlVide,
      });
    } else {
      this._applyState(field.el, inputContainer, label, inputMessageContainer, {
        inputClass: CSS_CLASSES.fieldInvalid,
        containerClass: CSS_CLASSES.containerInvalid,
        labelClass: CSS_CLASSES.labelErreur,
        ariaInvalid: CSS_CLASSES.ariaInvalidTrue,
        messageClass: `${CSS_CLASSES.inputMessageContainer} ${CSS_CLASSES.inputMessageError}`,
        messageHtml: `<span>${result.errors[0]}</span>`,
      });
    }
  }

  _applyState(input, inputContainer, label, inputMessageContainer, config) {
    const oppositeField =
      config.inputClass === CSS_CLASSES.fieldValid
        ? CSS_CLASSES.fieldInvalid
        : CSS_CLASSES.fieldValid;

    input.classList.replace(oppositeField, config.inputClass) ||
      input.classList.add(config.inputClass);

    const oppositeContainer =
      config.containerClass === CSS_CLASSES.containerValid
        ? CSS_CLASSES.containerInvalid
        : CSS_CLASSES.containerValid;

    inputContainer.classList.replace(
      oppositeContainer,
      config.containerClass,
    ) || inputContainer.classList.add(config.containerClass);

    input.setAttribute("aria-invalid", config.ariaInvalid);
    if (label) label.className = `${CSS_CLASSES.label} ${config.labelClass}`;
    inputMessageContainer.className = config.messageClass;
    inputMessageContainer.innerHTML = config.messageHtml;
  }

  /* ==========================================================================
     API PUBLIQUE
     ========================================================================== */

  onChange(cb) {
    this.onChangeCallbacks.push(cb);
  }

  getAllValues() {
    return Object.fromEntries(
      Object.keys(this.state).map((k) => [k, this.state[k] ?? ""]),
    );
  }

  getValues() {
    return { ...this.getAllValues() };
  }

  reset() {
    this.fields.forEach((f) => {
      this.state[f.name] = "";
      this.touched[f.name] = false;
      this.displayFieldError(f.name, { valid: true, errors: [] });
    });
  }

  /* ==========================================================================
     UTILITAIRES PRIVÉS
     ========================================================================== */

  _validateAndDisplay(name) {
    const res = this.validateField(name);
    this.displayFieldError(name, res);
    this.onChangeCallbacks.forEach((cb) => cb(name, this.state[name], res));
    return res;
  }

  _revalidateLinked(field) {
    field.linkedFields?.forEach((linked) => {
      if (this.touched[linked]) this._validateAndDisplay(linked);
    });
  }

  _updateState(name, value) {
    this.state[name] = value;
  }

  _extractParam(ruleConfig) {
    if (ruleConfig === true) return undefined;
    if (typeof ruleConfig === "object") return ruleConfig.value;
    return ruleConfig;
  }

  _resolveMessage(builtIn, ruleConfig, param) {
    if (typeof ruleConfig === "object" && ruleConfig.message)
      return ruleConfig.message;
    if (typeof builtIn.message === "function") return builtIn.message(param);
    return builtIn.message;
  }

  _parseJson(value, fallback) {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  _getInputTopRelativeToGroupe(input, inputContainer) {
    let top = input.offsetTop;
    let parent = input.offsetParent;

    while (parent && parent !== inputContainer) {
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }

    return top;
  }
}

/* ==========================================================================
   EXPORT
   ========================================================================== */

export { BUILT_IN_RULES, NATIVE_RULES_MAP, ICONS, SELECTORS, CSS_CLASSES };
