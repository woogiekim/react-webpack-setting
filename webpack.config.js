const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
	mode: prod ? 'production' : 'development',
	devtool: prod ? 'hidden-source-map' : 'source-map',

	entry: './index.tsx',

	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
			},
		],
	},

	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].[contenthash].js',
	},

	devServer: {
		historyApiFallback: true,
		// inline: true,
		port: 3000,
		hot: true,
		// publicPath: '/',
	},

	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
};
