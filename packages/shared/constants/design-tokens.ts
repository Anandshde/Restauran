export const colors = {
  primary: "#EF4444", // red-500
  secondary: "#3B82F6", // blue-500
  background: "#FFFFFF",
  foreground: "#111827",
};

export const spacing = {
  px: "1px",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
};

export const fontSizes = {
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
};

export const designTokens = {
  colors,
  spacing,
  fontSizes,
} as const;
