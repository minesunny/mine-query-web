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
      fontWeight: {},
      fontSize: {
        h1: ["20px", { lineHeight: "24px", fontWeight: "Semibold" }],
        h2: ["16px", { lineHeight: "20px", fontWeight: "Semibold" }],
        default: ["13px", { lineHeight: "16px", fontWeight: "Medium" }],
        "default-semibold": [
          "13px",
          { lineHeight: "16px", fontWeight: "Semibold" },
        ],
        paragraph: ["13px", { lineHeight: "18px", fontWeight: "Medium" }],
        medium: ["12px", { lineHeight: "16px", fontWeight: "Medium" }],
        "medium-semibold": [
          "12px",
          { lineHeight: "16px", fontWeight: "Semibold" },
        ],
        "editor-default": [
          "12px",
          { lineHeight: "22px", fontWeight: "Medium" },
        ],
        "editor-bold": ["12px", { lineHeight: "22px", fontWeight: "Bold" }],
        small: ["13px", { lineHeight: "22px", fontWeight: "Medium" }],
        "small-bold": ["12px", { lineHeight: "22px", fontWeight: "Bold" }],
      },
      colors: {
        blue: {
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
          "14": "var(--gray-14-white)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--gray-14-white)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        button: {
          primary: {
            active: {
              bg: "var(--button-primary-active-bg)",
              text: "var(--button-primary-active-text)",
              split: "var(--button-primary-active-split)",
            },
            hovered: {
              bg: "var(--button-primary-hovered-bg)",
              text: "var(--button-primary-hovered-text)",
            },
            pressed: {
              bg: "var(--button-primary-pressed-bg)",
              text: "var(--button-primary-pressed-text)",
              split: "var(--button-primary-pressed-split)",
            },
            focused: {
              bg: "var(--button-primary-focused-bg)",
              text: "var(--button-primary-focused-text)",
              split: "var(--button-primary-focused-split)",
            },
            disabled: {
              bg: "var(--button-primary-disabled-bg)",
              text: "var(--button-primary-disabled-text)",
              split: "var(--button-primary-disabled-split)",
              splitArrow: "var(--button-primary-disabled-split-arrow)",
            },
          },
        },
        dialog: {
          header: {
            bg: "var(--dialog-content-header-bg)",
            text: "var(--dialog-content-header-text)",
            border: "var(--dialog-content-header-border)",
          },
        },
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
  plugins: [
    require("tailwindcss-animate"),
    addDynamicIconSelectors(),
    ({ addComponents, theme, ...others }: PluginAPI) => {
      addComponentsColor({ addComponents, theme, ...others });
    },
  ],
} satisfies Config;

export default config;
