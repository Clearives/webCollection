define(function(require, exports, module) {
    var canPlayFlag = 0;
    var waitVideoTime =1000;
    var checkTimer = null;
    var CcVideo=function(url){
        if(!url){return;}
        var video_box=document.getElementById('video_box');
        this.video=document.createElement("video");
        video_box.appendChild(this.video);
        if(!this.video){return;}
        this.vurl=url;
        this.loadVideo();
    };

    CcVideo.prototype.loadVideo = function () {
        var _this=this;
        _this.video.preload = 'auto';
        _this.video.className = 'cc_video';
        _this.video.setAttribute('x-webkit-airplay','true');
        _this.video.setAttribute('y-webkit-airplay','true');
        _this.video.setAttribute('webkit-playsinline','true');
        _this.video.load();
        _this.video.src=this.vurl;
        _this.video.addEventListener("canplaythrough", function(){
            canPlayFlag = 1;
        });

    }

    CcVideo.prototype.palyVideo = function (callback) {
        this.video.play();
        if(callback) {
            this.video.addEventListener('ended', callback)
        }else return;
    }

    CcVideo.prototype.pauseVideo = function (callback) {
        this.video.pause();
    }

    CcVideo.prototype.FlushVideoCanPlay = function (callback){
        if(canPlayFlag==1){
            console.log('可以播放');
            clearInterval(checkTimer);
            this.palyVideo(callback);
        }
        else{
            checkTimer= setTimeout(this.FlushVideoCanPlay,waitVideoTime);
        }
    }





    module.exports = CcVideo;

})