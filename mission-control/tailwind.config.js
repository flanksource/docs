const { addIconSelectors, addDynamicIconSelectors } = require('@iconify/tailwind');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./docs/**.{md,mdx}"],

  plugins: [
    require('@tailwindcss/typography'),
    require("@tailwindcss/forms"),

  ],
  theme: {
    extend: {
      colors: {
        "cta": "#0053f8"
      }
    },
    fontFamily: {
      'sans': ["Open Sans", "sans-serif"],
    }
  }, safelist: [
    {
      pattern: /p/
    },
    {
      pattern: /space/,
    },
    {
      pattern: /border-gray/,
    },
    {
      pattern: /border-blue/,
    },
    {
      pattern: /border-zinc/,
    },
    {
      pattern: /to/,
    },
    {
      pattern: /via/,
    },
    {
      pattern: /from/,
    },
    {
      pattern: /bg-gradient/,
    },
    // Specific gradient classes
    'bg-gradient-to-r',
    'bg-gradient-to-l',
    'bg-gradient-to-t',
    'bg-gradient-to-b',
    'bg-gradient-to-tr',
    'bg-gradient-to-tl',
    'bg-gradient-to-br',
    'bg-gradient-to-bl',
    // Blue gradient colors
    'from-blue-600',
    'via-blue-700',
    'to-blue-800',
    'from-blue-500',
    'via-blue-600',
    'to-blue-700',
    'from-sky-500',
    'to-indigo-500',
    'from-blue-500/10',
    'to-blue-900/20',
    {
      pattern: /bg-sky/,
    },
    {
      pattern: /bg-indigo/,
    },
    {
      pattern: /bg-zinc/,
    },
    {
      pattern: /bg-gray/,
    },
    {
      pattern: /bg-blue/,
    },
    {
      pattern: /bg-red/,
    },
    {
      pattern: /text-gray/,
    },
    {
      pattern: /text-green/,
    },
    {
      pattern: /text-red/,
    },

    {
      pattern: /text-zinc/,
    },
  ],
};
