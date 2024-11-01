const path = require('path'); 
const { CleanWebpackPlugin}  = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/js/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:"bundle.js",
        clean: true,
    },
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    module: {
        rules: [
            
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ["@babel/preset-env"],
                  plugins: ["@babel/plugin-proposal-class-properties"],
                }
              }
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i, 
                type: 'asset/resource',
                
            },

            {
                test: /\.(woff(2)?|eot|ttf|svg|)$/,
                type: 'asset/inline',
            },

            {
                test: /\.(css|sass)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            
        
          ]
    },



    plugins: [
        new htmlWebpackPlugin({
            title: "Tracalories App", 
            template: path.resolve(__dirname, './src/template.html'), 
            filename: 'index.html',
            favicon: path.resolve(__dirname, './src/icon/favicon.ico'),
            
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),

    ]
}