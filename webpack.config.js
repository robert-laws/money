// Check if npm config production value is set to true. If this value is true, it will skip over the dev dependencies.
// Run npm config get production
// To set it: npm config set -g production false

var webpack = require("webpack");

module.exports = {
	entry: "./app/app.js",
	output: {
		path: "public",
		filename: "bundle.js"
	},
	// devtool: 'cheap-module-eval-source-map', // makes bundles.js file very large in production
	devServer: {
		inline: true,
		contentBase: './public',
		port: 3000
	},
    resolve: {
     root: __dirname,
		 modulesDirectories: [
			 'node_modules',
			 './app/components'
		 ],
     alias: {
       applicationStyles: 'app/styles/ui.scss'
     }
   },
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: ["babel-loader"],
				query: {
					presets: ['es2015', 'react', 'stage-0']
				}
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!autoprefixer-loader'
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
			}
		]
	},
	plugins: [
				new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            }
        })
    ]
}
