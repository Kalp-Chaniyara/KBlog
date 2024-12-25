// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//       "./index.html",
//       "./src/**/*.{js,ts,jsx,tsx}",
//       "./node_modules/tw-elements-react/dist/js/**/*.js"
//   ],
//   theme: {
//       extend: {},
//   },
//   darkMode: "class",
//   plugins: [require("tw-elements-react/dist/plugin.cjs")]
//   }

import plugin from "tw-elements-react/dist/plugin.cjs";
// // import pluginn from "shrutibalasa/tailwind-grid-auto-fit";
// // const gridAutoFit = require('@shrutibalasa/tailwind-grid-auto-fit');
import gridAutoFit from '@shrutibalasa/tailwind-grid-auto-fit';

// /** @type {import('tailwindcss').Config} */
// const config = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/tw-elements-react/dist/js/**/*.js",
//   ],
//   theme: {
//     extend: {
//       screens:{
//         'lg':'1200px'
//       }
//     },
//   },
//   darkMode: "class",
//   plugins: [plugin,gridAutoFit],
// };

// export default config;

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [plugin,gridAutoFit],
};

export default config;
