module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: ["node_modules"],
                use: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.gif$/,
                type: "asset/inline",
            },
            {
                test: /\.(ttf|eot|svg)$/,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        alias: {
            config$: "./configs/app-config.js",
            react: "./vendor/react-master",
        },
        extensions: [".js", ".jsx"],
        modules: [
            "node_modules",
            "bower_components",
            "shared",
            "/shared/vendor/modules",
        ],
    },
};
