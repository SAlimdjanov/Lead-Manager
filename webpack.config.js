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
        entry: "./leadmanager/frontend/src/index.js",
        output: {
            filename: "main.js",
            path: path.resolve("leadmanager/frontend/static/frontend"),
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
                    use: {
                        loader: "babel-loader",
                    },
                },
            ],
        },
    };
};
