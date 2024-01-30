const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      icon: './public/favicon.ico',
      title: 'Production',
      template: './public/index.html'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/plugin-syntax-jsx', '@babel/preset-typescript'],
        }
    },{
      test: /\.scss$/,
      use: [
        'style-loader', // Injects styles into DOM
        'css-loader',   // Translates CSS into CommonJS
        'sass-loader'  // Compiles Sass to CSS
      ]
    },{
      test: /\.(png|jpe?g|gif|jp2|webp)$/,
      loader: 'file-loader',
      options: {
        name: 'images/[name].[ext]'
      }
    }
  ],
},
resolve: {
  extensions: ['.tsx', '.ts', '.js'],
},
devServer: {
  historyApiFallback: true,
},
};