const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const html2canvas = require('html2canvas')
//const TerserPlugin = require('terser-webpack-plugin')
//const dompurify = require('dompurify')
//const canvg = require('canvg')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
    // mode: 'development',
    mode: modoDev ? 'development' : 'production',
    entry: './src/principal.js',
    output: {
        filename: 'principal.js',
        path: __dirname + '/public'
    },

    devServer: {
        contentBase: "./public",
        port: 9000,
    },

    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //             parallel: true,
    //             terserOptions: {
    //                 ecma: 6,
    //             },
    //         }),
    //         new OptimizeCSSAssetsPlugin({})
    //     ]
    // },

    plugins: [
        new webpack.DefinePlugin({
            'process.browser': 'true'
        }),
        new MiniCssExtractPlugin({
            filename: "estilo.css",
        }),
        new CopyPlugin({
            patterns: [
                { from: __dirname + '/src/assets/img', to: 'assets/img' },
                { from: __dirname + '/src/assets/exported', to: 'assets/exported' },
            ],
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: __dirname + '/src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: "imprimir.html",
            template: __dirname + '/src/modulos/imprimir.html'
        })
    ],

    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                //'style-loader',
                'css-loader',
                'sass-loader',
            ]
        }, {
            test: /\.(png|svg|jpg|gif|ico)$/,
            use: [
                'file-loader'
            ]
        }]
    },
    node: {
        fs: "empty"
    },

    devtool: 'eval-source-map'
}
