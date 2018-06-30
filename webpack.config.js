var webpack = require('webpack')
var path = require('path')

module.exports = {
    devServer: {
        historyApiFallback: true,
        host: "0.0.0.0",
        port: 8082
    },
    context: __dirname + '/src',
    entry: "./js/root.js",
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
                plugins: ['react-html-attrs']
            }
        },{ // 使用ant-design 的配置文件
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }],
    },
    output: {
        path: __dirname,
        filename: "bundle.js"
    }
}