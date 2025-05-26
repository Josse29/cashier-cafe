/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/client/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        firacode: ["FiraCode"],
        montserrat: ["Montserrat"],
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
