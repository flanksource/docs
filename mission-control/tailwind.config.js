module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./docs/**.{md,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
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
      pattern: /text-zinc/,
    },
  ],
};
