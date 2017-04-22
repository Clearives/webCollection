/**
 * Created by Clearives on 2015/11/23.
 */
'use strict';

module.exports = {
    entry: "./webapp/src/js",
    output: {
        path: __dirname + "./webapp/assets/js",
        filename: "app.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css!less"},
            {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
            {test: /\.(jpg|png)$/, loader: "url?limit=8192"}
        ]
    }
};