define(function(require, exports, module) {

    var $ = require('../jquery');
    var page = require('./page');
    var CcAudio = require('./CcMusic');

    window.addEventListener('load', function () {
        var bgm = new CcAudio('http://dgj.uliveapp.com/img/music_bg.mp3');
        var e = ["bg-p1.png","bg-p2.png","bg-p3.jpg","bg-p4.jpg"];
        var n=0;
        var t=e.length;
        var T=document.getElementById('percentShow');

        function load(e) {
            var r = new Image;
            var per= 0,myPer= 0;
            r.onload = function() {
                ++n;
                per=parseInt(n / t * 100);

                if(per==100)
                {
                    console.log('图片资源加载完毕');
                    bgm.playMusic();
                    var timer = setInterval(function () {
                        if(myPer>=92) {
                            myPer=100
                            clearInterval(timer);
                            $('.imgload').fadeOut();
                            page.initPage(1);
                        }else {
                            myPer+=Math.floor(Math.random()*7+1);
                        }
                        T.innerHTML = '已加载: '+myPer+ '%';
                    },10)
                }
            };
            r.src = 'images/'+e;
        }
        for (var i = 0; i < t; ++i) load(e[i]);
    })

});