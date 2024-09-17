module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // This will include everything in `src/`
    "./public/**/*.html", // Add this if you have static HTML files in `public/`
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
