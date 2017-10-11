var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 使用 extract text webpack plugin
var extractPlugin = new ExtractTextPlugin({
   filename: 'bundle.css' // scss轉css後另存的目標檔名
});

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 針對所有.css 的檔案作預處理，這邊是用 regular express 的格式
        use: [
          'style-loader',  // 這個會後執行 (順序很重要)
          'css-loader' // 這個會先執行
        ]
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({ //利用 extractPlugin 實例裡的 extract 來建立 Loader
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, // 注意要排除 node_modules
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(function(){
        // 這裡應該可以設定一些東西，但不是本篇想討論的，有興趣可以 Google 這個 plugin 可以做啥...
    }),
    extractPlugin, // 把extract過的loader轉存成css檔 (我的理解啦XD)
    new webpack.ProvidePlugin({ // 利用 webpack.ProvidePlugin 讓 $ 和 jQuery 可以連結到 jquery library
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'] //4.0.0-beta 
    }),
  ]
}
