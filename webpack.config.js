const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const path = require('path');

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.resolve(__dirname, 'src/public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        port: 4000,
        publicPath: '/',
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        new HtmlWebpackRootPlugin()
    ]
}