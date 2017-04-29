const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/')
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./src/modules'),
            path.resolve('./node_modules')
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/templates/index.ejs'
    })]
};
