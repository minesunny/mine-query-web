import type { Config } from "tailwindcss";
import { addDynamicIconSelectors } from "@iconify/tailwind";
import { PluginAPI } from "tailwindcss/types/config";

const componentsColor = ["button", "alert"];

type colorComponent = {
  bg: string[][];
  border: string[][];
  text: string[][];
};

const flattenJSON = (
  jsonObj: { [key: string]: any },
  prefix: string,
): colorComponent => {
  const result: colorComponent = {
    bg: [],
    border: [],
    text: [],
  };
  const recurseFlattenJSON = (obj: { [key: string]: any }, prefix = "") => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        switch (key) {
          case "bg":
            if (typeof obj[key] == "string") {
              result.bg.push([prefix, obj[key] as string]);
            }
            break;
          case "border":
            if (typeof obj[key] == "string") {
              result.border.push([prefix, obj[key] as string]);
            }
            break;
          default:
            if (typeof obj[key] === "object") {
              recurseFlattenJSON(obj[key], prefix ? `${prefix}-${key}` : key);
            }
        }
      }
    }
  };
  recurseFlattenJSON(jsonObj, prefix);
  return result;
};
const addComponentsColor = ({ addComponents, theme }: PluginAPI) => {
  const colors = theme("colors");
  const components: Record<string, Record<string, string>> = {};
  if (colors === undefined) {
    return;
  }
  for (let key of Object.keys(colors)) {
    if (componentsColor.includes(key)) {
      const result = flattenJSON(colors[key], key);

      for (let k of Object.keys(result)) {
        switch (k) {
          case "bg":
            const bg = result.bg;
            bg.forEach((c) => {
              const colorKey = c[0];
              const colorValue = c[1];
              components[`.bg-${colorKey}`] = {
                backgroundColor: colorValue,
              };
              components[`.${colorKey}-bg`] = {
                backgroundColor: colorValue,
              };
            });
            break;
          case "border":
            const border = result.border;
            border.forEach((c) => {
              const colorKey = c[0];
              const colorValue = c[1];
              components[`.border-${colorKey}`] = {
                borderColor: colorValue,
              };
              components[`.${colorKey}-border`] = {
                borderColor: colorValue,
              };
            });
            break;
          default:
        }
      }
    }
  }
  addComponents(components);
};

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["-apple-system"],
      },

      fontWeight: {},
      fontSize: {
        h1: ["20px", { lineHeight: "24px", fontWeight: 700 }],
        h2: ["16px", { lineHeight: "20px", fontWeight: 700 }],
        default: ["13px", { lineHeight: "16px", fontWeight: 500 }],
        "default-semibold": ["13px", { lineHeight: "16px", fontWeight: 700 }],
        paragraph: ["13px", { lineHeight: "18px", fontWeight: 500 }],
        medium: ["12px", { lineHeight: "16px", fontWeight: 500 }],
        "medium-semibold": ["12px", { lineHeight: "16px", fontWeight: 700 }],
        "editor-default": ["12px", { lineHeight: "22px", fontWeight: 500 }],
        "editor-bold": ["12px", { lineHeight: "22px", fontWeight: 700 }],
        small: ["13px", { lineHeight: "22px", fontWeight: 500 }],
        "small-bold": ["12px", { lineHeight: "22px", fontWeight: 700 }],
      },
      boxShadow: {
        popup: "0px 6px 20px rgba(145, 145, 145, 0.47)",
      },
      colors: {
        blue: {
          "4": "var(--blue-4)",
          "5": "var(--blue-5)",
          "6": "var(--blue-6)",
        },
        gray: {
          primary: "var(--gray-1-primary)",
          "1": "var(--gray-1-primary)",
          "2": "var(--gray-2)",
          "3": "var(--gray-3)",
          "4": "var(--gray-4)",
          "5": "var(--gray-5)",
          "6": "var(--gray-6)",
          "7": "var(--gray-7)",
          "8": "var(--gray-8)",
          "9": "var(--gray-9)",
          "10": "var(--gray-10)",
          "11": "var(--gray-11)",
          "12": "var(--gray-12)",
          "13": "var(--gray-13)",
          "14": "var(--gray-14)",
        },
        primary: {
          DEFAULT: "var(--primary-background)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        dialog: {
          header: {
            bg: "var(--dialog-content-header-bg)",
            text: "var(--dialog-content-header-text)",
            border: "var(--dialog-content-header-border)",
          },
        },
      },
      borderColor: {
        default: "var(--gray-6)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "expand-to": {
          to: { height: "100%", with: "100%" },
        },
        "expand-from": {
          from: { height: "100%", with: "100%" },
        },
        "translate-from": {
          from: { transform: "translate(-50%, -50%)" },
        },
        "translate-to": {
          to: { transform: "translate(-50%, -50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addDynamicIconSelectors()],
} satisfies Config;

export default config;
