import type { Preview } from "@storybook/react-vite";
import "../src/styles/main.css";
import "../src/styles/police.css";
import "../src/components/docs/DoDont.css";
import "../src/components/docs/Message.css";
import { themes } from "@storybook/theming";
import { useEffect } from "react";
import { ModalManager } from "../src/components/Modal/ModalManager";

// Ajout de la gestion des modales

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    (Story: () => any) => {
      // Initialisation après le rendu de chaque story
      setTimeout(() => {
        const overlays = document.querySelectorAll<HTMLElement>("[data-modal]");
        overlays.forEach((overlay) => {
          const name = overlay.dataset.modal;
          if (name) {
            new ModalManager(name, overlay);
          }
        });
      }, 0);

      return Story();
    },
  ],
};

export default preview;
