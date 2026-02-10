export const theme = {
  colors: {
    background: {
      app: "#0f1115",
      panel: "#161a22",
      elevated: "#1e2430",
    },

    text: {
      primary: "#e6e8eb",
      secondary: "#9aa4b2",
      muted: "#6b7280",
    },

    border: {
      default: "#2a2f3a",
      subtle: "#1f2937",
    },

    accent: {
      primary: "#4f46e5",   // indigo
      success: "#22c55e",
      warning: "#f59e0b",
      danger: "#ef4444",
    },
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },

  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    round: "9999px",
  },

  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.3)",
    md: "0 4px 12px rgba(0,0,0,0.4)",
  },

  transition: {
    fast: "0.15s ease",
    normal: "0.25s ease",
  },

  zIndex: {
    dropdown: 1000,
    modal: 1100,
    tooltip: 1200,
  },
} as const;