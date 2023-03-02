/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const pxToRem = (/** @type {number} */ px) => `${px / 16}rem`;

const range = (/** @type {number} */ start, /** @type {number} */ end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

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
    fontSize: {
      ...range(0, 100).reduce((acc, px) => {
        // @ts-ignore
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    spacing: {
      ...range(0, 100).reduce((acc, px) => {
        // @ts-ignore
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    borderWidth: {
      ...range(0, 10).reduce((acc, px) => {
        // @ts-ignore
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    screens: {
      display: { max: "1440px" },
      desktop: { max: "1024px" },
      tablet: { max: "768px" },
      foldable: { max: "523px" },
      mobile: { max: "360px" },
    },
    extend: {},
  },
  plugins: [],
};

module.exports = config;
