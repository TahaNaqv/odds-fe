
import colors from './colors';
import animations from './animations';
import typography from './typography';
import { Config } from 'tailwindcss';

const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    ...colors,
    ...animations,
    ...typography,
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    backdropFilter: {
      'none': 'none',
      'blur': 'blur(20px)',
    },
    boxShadow: {
      'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      'subtle': '0 2px 10px rgba(0, 0, 0, 0.05)',
      'elevated': '0 10px 30px rgba(0, 0, 0, 0.08)',
      'hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      'glow': '0 0 20px rgba(155, 135, 245, 0.2)',
    },
    transitionProperty: {
      'height': 'height',
      'spacing': 'margin, padding',
    },
  },
};

export default theme;
