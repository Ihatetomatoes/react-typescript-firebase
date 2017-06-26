const webpack = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const path = require('path');

var config = {
    app: ['./src/index.tsx'],
    tsxLoaders: ['babel-loader','awesome-typescript-loader']
}

module.exports = (env) => {

    const isDevelopment = env.development === true;
    const isProduction = env.production === true;

    const bootstrapConfig = isProduction ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

    return {
        entry: {
            app: config.app,
            bootstrap: bootstrapConfig
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
                },
                { test: /\.(woff2?)$/, use: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
                { test: /\.(ttf|eot|svg)$/, use: 'file-loader?name=fonts/[name].[ext]' },
                // Bootstrap 3
                { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, use: 'imports-loader?jQuery=jquery' }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                // Allows these constants to be accessed by the aurelia app
                DEVELOPMENT: JSON.stringify(isDevelopment),
                PRODUCTION: JSON.stringify(isProduction)
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new (webpack.optimize.OccurenceOrderPlugin || webpack.optimize.OccurrenceOrderPlugin)(),
            new ExtractTextPlugin({
                filename: '/css/[name].css',
                disable: !isProduction,
                allChunks: true
            })
        ]
    }
};