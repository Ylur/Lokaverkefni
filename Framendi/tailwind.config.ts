// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Existing colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Custom colors from your style guide
        primary: '#3E6053',
        secondary: '#C16757',
        accent: '#BA2329',
      },
    },
  },
  plugins: [],
};

export default config;
