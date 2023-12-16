module.exports = {
    plugins: [
        require("postcss-import"),
        require("postcss-preset-env"),
        require("cssnano"),
        require("@fullhuman/postcss-purgecss")({
            content: ["./**/*.html"],
            css: ["./css/style.css"],
        }),
    ],
};