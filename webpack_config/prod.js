'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'entry.min': './src/entry.js',
    },
    mode: 'production',
    output: {
        chunkFilename: '[name].[contenthash].js',
        filename: '[name].js',
        publicPath: '/entryjs/',
    },
    module: {
        rules: [],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name][contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'example', 'example_prod.ejs'),
            title: 'Entry Example',
            filename: path.resolve('dist', 'index.html'),
            inject: true,
            hash: true,
        }),
        new CopyPlugin({
            patterns: [
                { from: 'extern', to: 'extern' }, // 'extern' 폴더를 'dist/extern'으로 복사
                { from: 'images', to: 'images' },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
                parallel: true,
                terserOptions: {
                    ecma: 5,
                },
            }),
        ],
    },
};
