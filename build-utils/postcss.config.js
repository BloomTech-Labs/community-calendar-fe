module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnano")({
      preset: "default",
    }),
  ],
  sourceMap: process.env.NODE_ENV === "development",
};
