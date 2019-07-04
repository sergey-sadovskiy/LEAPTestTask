const path = require('path');

module.exports = {
    entry: './src/entry-point.ts',
    mode: 'development',
    devtool: "eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, 'out'),
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'out')
    }
};