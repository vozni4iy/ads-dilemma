var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:3000',
    'webpack/hot/only-dev-server',
    './scripts/index'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
	publicPath: '/scripts/' 
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.NewWatchingPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ },
      { test: /\.css$/, loader: "style!css" }
    ]	
  }
};
