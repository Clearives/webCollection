define(function(require, exports) {
    /**
     * 判断是否为手机
     */
    exports.isMobile = function isMobile() {
        var sUserAgent= navigator.userAgent.toLowerCase(),
            bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
            bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
            bIsMidp= sUserAgent.match(/midp/i) == "midp",
            bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
            bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
            bIsAndroid= sUserAgent.match(/android/i) == "android",
            bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
            bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
            bIsWebview = sUserAgent.match(/webview/i) == "webview";
        return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsWebview);
    };

    /**
     * 是否安卓
     * @returns {boolean}
     */
    exports.isAndroid = function() {
        var sUserAgent= navigator.userAgent.toLowerCase();
        return bIsAndroid= sUserAgent.match(/android/i) == "android";
    };

    /**
     * 是否Ios
     * @returns {boolean}
     */
    exports.isIos = function() {
        var sUserAgent= navigator.userAgent.toLowerCase();
        return bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";
    };

    /**
     * 是否微信
     * @returns {boolean}
     */
    exports.isWeixin = function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    };

    /**
     * 设置cookie
     * @param {String} name 保存的key
     * @param {String} value 值
     */
    exports.setCookie = function setCookie(name,value) {
        var Days = 30; //此 cookie 将被保存 30 天
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + '=' + value + ';expires=' + exp.toGMTString() + '; path=/';
    };

    /**
     * 读取cookies
     * @param {String} name 所要读取的key
     */
    exports.getCookie = function getCookie(name) {
        var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        var arr = document.cookie.match(reg);

        return arr && arr.length >= 3 ? arr[2] : null;
    };

    /**
     * 是否支持cookie（手机的有时候会禁用或者不支持）
     * @private
     */
    exports._isSupportCookie = function _isSupportCookie(){
        // 手机浏览器是否启用了cookie
        if(!navigator.cookieEnabled) return false;

        this.setCookie('_support', '1');
        if(this.getCookie('_support') != '1') return false;

        return true;
    };

    /**
     * 设置值到cookie或者存储到localstorage
     * @param name {String} name 保存的key
     * @param value {String} value 值
     */
    exports.setCookieOrStorage = function setCookie(name,value) {
        if(this._isSupportCookie()){
            this.setCookie(name, value);
        } else {
            localStorage.setItem(name, value);
        }
    };

    /**
     * 从cookie或者localstorage获取值
     * @param name {String} name 所要读取的key
     */
    exports.getCookieOrStorage = function setCookie(name) {
        return this.getCookie(name) || localStorage.getItem(name);
    };

})
