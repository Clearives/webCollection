/*
* 判断是否为手机
*/
function isMobile() {
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