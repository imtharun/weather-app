module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        new: "repeat(1, minmax(120px, 1fr))",
        new4: "repeat(4, minmax(120px, 1fr))",
      },
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
