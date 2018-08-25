module.exports = function (env) {
    env = env || {};
    var webpack = require('webpack'),
        path = require('path'),
        isProd = env.prod,
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        targetFolder = "static/",
        plugins = [new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: true })],
        proxy = {
            "/api": {
                target: "http://localhost:9000",
                secure: false,
                changeOrigin: true,
                bypass: function(req) {
                    return false;
                }
            }
        };

    return [
        // ######## JS Configuration ########
        // ##################################
        {
            name: "js",

            entry: [
                "core-js/fn/set",
                "core-js/fn/array/index-of",
                "core-js/fn/array/is-array",
                "core-js/fn/array/from",
                "core-js/fn/object/get-own-property-descriptor",
                "core-js/fn/object/get-own-property-descriptors",
                "core-js/fn/object/get-own-property-names",
                "core-js/fn/object/get-own-property-symbols",
                "core-js/fn/promise",
                "./src/index.ts"
            ],
            output: {
                path: path.join(__dirname, "app"),
                filename: targetFolder + "bundle.js"
            },

            devtool: isProd ? false : "source-map",

            resolve: {
                extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
            },

            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        exclude: /(node_modules)/,
                        use: [
                            {
                                loader: "babel-loader",
                                options: {
                                    presets: ["env"]
                                }
                            },
                            {
                                loader: "ts-loader"
                            },
                        ]
                    },
                    {
                        test: /\.js$/,
                        use: ["source-map-loader"],
                        enforce: "pre"
                    }
                ]
            },

            plugins: isProd ? plugins : [],

            externals: {
                "react": "React",
                "react-dom": "ReactDOM",
                "three": "THREE"
            },

            devServer: {
                port: 8080,
                open: true,
                contentBase: "app/",
                proxy: proxy,
                quiet: false
            }
        },


        // ####### SASS Configuration #######
        // ##################################
        {
            name: "css",

            entry: [ "./src/style/index.scss" ],

            output: {
                path: path.join(__dirname, "app"),
                filename: targetFolder + "style.css"
            },

            module: {
                rules: [
                    {
                        test: /\.scss$/,
                        use: ExtractTextPlugin.extract({ use: ["css-loader", "sass-loader"]})
                    }
                ]
            },

            plugins: [
                // Required for creating a separate css file rather than mashing css and js into one horrible file
                new ExtractTextPlugin(targetFolder + "style.css")
            ]
        }
    ];
};