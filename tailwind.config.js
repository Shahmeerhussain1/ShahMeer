module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
         intertight: ['"Inter Tight"', 'sans-serif'],
      },
      fontSize: {
       'fluid-dynamic': 'clamp(60px, 8.85vw, 999px)',
       'fluid-dynamic-para': 'clamp(16px, 8.85vw, 24px)',
      },
    },
  },
  plugins: [],
}