/** @type {import('tailwindcss').Config} */
const config = {
  future: {
    // https://github.com/tailwindlabs/tailwindcss/pull/8394
    hoverOnlyWhenSupported: true,
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    data: {
      active: 'ui~="active"',
    },
    extend: {},
  },
  plugins: [],
};

module.exports = config;
