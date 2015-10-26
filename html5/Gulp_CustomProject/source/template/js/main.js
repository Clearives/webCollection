define(function(require, exports, module) {
    var $ = require('./jquery');
    var page = require('./model/page');
    require('./model/loading');

    ;(function () {
        page.initPage(1);

        $('.p1').find('.btn').on('click', function () {
            page.initPage(2);
        });
        $('.p2').find('.btn').on('click', function () {
            page.initPage(3);
        });
        $('.p3').find('.btn').on('click', function () {
            page.initPage(2);
        });
        $('.p3').find('.btn1').on('click', function () {
            page.initPage(4);
        });

    })();


});
