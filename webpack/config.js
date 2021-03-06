var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

if(!process.env.NODE_ENV) {
  throw "no NODE_ENV set";
}

var outputFilename;
if(process.env.NODE_ENV == "production") {
  outputFilename = "bundle-[hash].js";
} else {
  outputFilename = "bundle.js";
}

module.exports = {
  context: __dirname,

  entry: '../app.js',

  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: process.env.WEBPACK_HOST,
    filename: outputFilename
  },
  devServer: {
    inline:true,
    port: 8787
  },

  module: {
    loaders: [
      {
        test: /\.css$/i,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.js$/i,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/i,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: '../index.ejs',
      graphql: { url: process.env["GRAPHQL_ENDPOINT"]  || "http://localhost:8181/api/admin-graphql" }
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
