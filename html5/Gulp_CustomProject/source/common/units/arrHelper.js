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

    /**
     * 用Math.random()函数生成0~1之间的随机数与0.5比较
     * @返回-1或1
     * @returns {Number}
     */
    exports.randomsort = function randomsort() {
        return Math.random()>.5 ? -1 : 1;
    }

});
