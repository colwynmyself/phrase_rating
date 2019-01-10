const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/ts/main.ts',
    plugins: [
        new CleanWebpackPlugin(['public/dist']),
        new HtmlWebpackPlugin({
            template: 'src/templates/index.html'
        }),
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'build/[name].[contenthash].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: 'ts-loader' }
        ]
    }
}
