import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const theme = {
  colors,
  spacing,
  typography,

  radius: {
    sm: 8,
    md: 12,
    lg: 20,
    full: 9999,
  },
} as const;

export type Theme = typeof theme;
