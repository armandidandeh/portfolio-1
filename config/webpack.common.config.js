const webpack = require("webpack");
const CleanPlugin = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const commonPaths = require("./common-paths");

const config = {
  entry: {
    main: ["./src/index.js"]
  },
  output: {
    filename: "[name].js",
    path: commonPaths.outputPath,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "eslint-loader",
        options: {
          failOnWarning: false,
          failOnerror: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_compontents)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "react", "stage-0"]
            }
          }
        ]
      },
      { test: /\.(woff|woff2|eot|ttf)$/, loader: "url-loader?limit=100000" },
      {
        test: /\.s?css$/,
        use:
          process.env.NODE_ENV === "production"
            ? ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                  {
                    loader: "css-loader"
                  },
                  {
                    loader: "sass-loader"
                  }
                ]
              })
            : [
                { loader: "style-loader" },
                { loader: "css-loader" },
                { loader: "sass-loader" }
              ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "videos/[name].[ext]"
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new ExtractTextPlugin("[name].css"),
    new CleanPlugin(["../public"], { allowExternal: true }),
    new HtmlPlugin({
      filename: "index.html",
      template: commonPaths.template,
      favicon: commonPaths.favicon,
      inject: true
    })
  ]
};

module.exports = config;
