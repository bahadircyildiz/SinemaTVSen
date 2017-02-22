var path = require('path');
// var webpack = require('webpack');

module.exports = {
    entry: {
        app: "./www/src/app.js",
    },
    output: {
        path: path.resolve(__dirname, 'www/dist/'),
        publicPath: "www/dist/",
        filename: "[name].build.js"
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
        }]
    }
}
