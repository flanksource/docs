const { addIconSelectors, addDynamicIconSelectors } = require('@iconify/tailwind');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./docs/**.{md,mdx}"],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ["Open Sans", "sans-serif"],
    }
  },

  safelist: [
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
