// 加载入口模块
;(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = (window.innerWidth <= 320) ? 320 : ((window.innerWidth >= 640) ? 640 : window.innerWidth);
            docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
seajs.use('main')