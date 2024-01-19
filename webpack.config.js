/**
 * webpack.config.js
 *
 * Configures webpack for use with the babel loader
 */

const path = require("path");

module.exports = (argv) => {
    const isDevMode = argv.mode === "development";

    return {
        mode: argv.mode || "development",
        entry: "./leadflow/frontend/src/index.js",
        output: {
            filename: "main.js",
            path: path.resolve("leadflow/frontend/static/frontend"),
        },
        devtool: isDevMode ? "eval-source-map" : "source-map",
        optimization: {
            minimize: !isDevMode,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    use: ["url-loader"],
                },
            ],
        },
    };
};
