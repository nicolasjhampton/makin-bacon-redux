module.exports = {
  //context: __dirname,
  entry: './frontapp/app.jsx',
  output: {
    //path: './src/public/app/',
    filename: 'src/public/app/bundle.js'
  },
  resolve: {
    alias: {
      'rxjs': 'rxjs-es'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /(node_modules(?!\/rxjs))/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
}
