import purgecss from "@fullhuman/postcss-purgecss";

export default {
  plugins: [
    purgecss({
      content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
      ],
      safelist: [
        /^dt-/,
        /^dataTables/,
        /^modal/,
        /^dropdown/,
        "active",
        "show"
      ]
    })
  ]
};