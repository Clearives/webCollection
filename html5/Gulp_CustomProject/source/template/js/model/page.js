define(function(require, exports, module) {
    var $ = require('../jquery');
    require('../swiper');
    var swiper;
    exports.initPage = function initPage(page) {
        console.log("page"+page+" init");
        switch (page) {
            case 1:
                swiper = new Swiper('.swiper-container', {
                    //pagination: '.swiper-pagination',
                    animating: true,
                    noSwiping : true,
                    speed:1000,
                    effect : 'fade',
                });
                break;
            case 2:
                swiper.slideTo(1, 1000, false);
                break;
            case 3:
                swiper.slideTo(2, 1000, false);;
                break;
            case 4:
                swiper.slideTo(3, 1000, false);;
                break;
            //初始化其他页面
        }


    }
});