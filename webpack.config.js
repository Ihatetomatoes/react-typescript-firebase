const webpack = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

var config = {
    app: ['./src/index.tsx'],
    tsxLoaders: ['babel-loader','awesome-typescript-loader']
}

module.exports = (env) => {

    const isDevelopment = env.development === true;
    const isProduction = env.production === true;

    return {
        entry: {
            app: config.app
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name]-bundle-[hash].js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.webpack.js', '.scss']
        },
        devServer: {
            port: 8080,
            stats: 'errors-only'
        },
        devtool: (() => {
            if (isProduction) return 'hidden-source-map'
            else return 'cheap-module-eval-source-map'
        })(),
        module: {
            loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: config.tsxLoaders
            },
            {
                test: /mobx-react-devtools/,
                use: isDevelopment ? 'noop' : 'null'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader?modules&camelCase', 'sass-loader']
                })
            }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                // Allows these constants to be accessed by the aurelia app
                DEVELOPMENT: JSON.stringify(isDevelopment),
                PRODUCTION: JSON.stringify(isProduction)
            }),
            new HtmlWebpackPlugin({
                title: 'React, TypeScript and Firebase Authentification',
                template: './src/index.ejs'
            }),
            new (webpack.optimize.OccurenceOrderPlugin || webpack.optimize.OccurrenceOrderPlugin)(),
            new ExtractTextPlugin("styles.css")
        ]
    }
};