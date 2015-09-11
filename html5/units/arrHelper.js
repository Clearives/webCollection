define(function(require, exports) {
    'use strict';

    /**
     * 判断数组中是否有这个值
     * @param {*} ele
     * @param {Array} arr
     * @returns {Boolean}
     */
    exports.isInArr = function isInArr(ele,arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === ele) {
                return true;
            }
        }
        return false;
    };

});
