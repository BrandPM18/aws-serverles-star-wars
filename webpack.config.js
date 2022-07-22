const path = require('path')
const slsw = require('serverless-webpack');

const entries = {};

Object.keys(slsw.lib.entries).forEach(
  key => (entries[key] = ['./source-map-install.js', slsw.lib.entries[key]])
);


module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  context: __dirname,
  entry: entries,
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js','.json'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /.ts$/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  node: {
    __dirname: false
  },
}
