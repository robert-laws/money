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
     alias: {
       Main: 'app/components/Main.js',
       WebMenu: 'app/components/WebMenu.js',
       Home: 'app/components/Home.js',
       Footer: 'app/components/Footer.js',
       Page404: 'app/components/Page404.js',
			 Chapter1: 'app/components/Chapter1.js',
			 Chapter2: 'app/components/Chapter2.js',
			 Chapter3: 'app/components/Chapter3.js',
			 FindPercentage: 'app/components/FindPercentage.js',
			 CompoundInterest: 'app/components/CompoundInterest.js',
			 CompoundingFrequencies: 'app/components/CompoundingFrequencies.js',
			 SolveRateTime: 'app/components/SolveRateTime.js',
			 RuleOf72: 'app/components/RuleOf72.js',
			 EffectiveRate: 'app/components/EffectiveRate.js',
			 SimpleInterest: 'app/components/SimpleInterest.js',
			 SimpleDiscount: 'app/components/SimpleDiscount.js',
			 SimpleDiscountFormula: 'app/components/SimpleDiscountFormula.js',
			 ArithmeticSequences: 'app/components/ArithmeticSequence.js',
			 GeometricSequences: 'app/components/GeometricSequence.js'
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
