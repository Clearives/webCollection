define(function(require, exports) {
    'use strict';

    /**
     * 通过url解析出传递的参数
     *
     * @returns {IEElementStyle}
     */
    exports.getUrlParams = function getUrlParams() {
        var search = decodeURI(location.search).slice(1);
        var params = search.split('&');
        var res = {};

        for(var i = 0, p; p = params[i++]; ) {
            var temp = p.split('=');
                res[temp[0]] = temp[1];
        }

        return res;
    };

    /**
     * 通过url解析文件名(带后缀)
     *
     * @returns {string}
     */
    exports.getFileName = function getFileName(url) {
        var temp = [];
        var res = '';
        temp = url.split('/');
        res = temp[temp.length-1].split('?')[0];
        return res;
    };

});