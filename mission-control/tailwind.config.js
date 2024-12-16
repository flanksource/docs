const { addIconSelectors, addDynamicIconSelectors } = require('@iconify/tailwind');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./docs/**.{md,mdx}"],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ["Open Sans", "sans-serif"],
    }
  },

  safelist: [
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
