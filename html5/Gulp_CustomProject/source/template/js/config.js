(function () {
    window.dev = 0;
    var dynamicLoading = {
        css: function(path){
            if(!path || path.length === 0){
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = path+'?'+new Date().getTime();
            head.appendChild(link);
        }
    }
    if(dev) {
        dynamicLoading.css('publish/css/main.min.css');
        document.write('<script type="text/javascript" src="publish/js/sea.min.js?'+new Date().getTime()+'">\<\/script>');
        document.write('<script type="text/javascript" src="publish/js/all.min.js?'+new Date().getTime()+'">\<\/script>');
    }else {
        dynamicLoading.css('css/reset.css');
        dynamicLoading.css('css/swiper.css');
        dynamicLoading.css('css/all.css');
        document.write('<script type="text/javascript" src="js/sea.js?"'+new Date().getTime()+'">\<\/script>');
        document.write('<script type="text/javascript" src="js/all.js?"'+new Date().getTime()+'">\<\/script>')
    }
})();