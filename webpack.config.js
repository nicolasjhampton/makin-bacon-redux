module.exports = {
  //context: __dirname,
  entry: './frontapp/app.jsx',
  output: {
    //path: './src/public/app/',
    filename: 'src/public/app/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
}
