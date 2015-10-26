define(function(require, exports, module) {
    var CcAudio=function(url){
        if(!url){return;}
        var audio_cc=document.getElementById('audio_cc');
        this.audio=document.createElement("audio");
        this.audio.preload = true;
        this.audio.className = 'hide';
        document.body.appendChild(this.audio);
        if(!this.audio){return;}
        this.audioCc=audio_cc||null;
        this.aurl=url;
        this.loadMusic();
    };
    //load
    CcAudio.prototype.loadMusic=function(){
        var _this=this;
        _this.audio.src=window.dev==0 ? 'images/'+this.aurl : 'publish/images/'+this.aurl;
        _this.audio.volume=0.5;
        if(!_this.audioCc){return;}
        _this.audioCc.style.display='block';
        _this.audioCc.className='bgAudio audioPlay';
        /*ios默认暂停*/
        _this.isIphone();
        //绑定音频控制
        _this.audioCc.addEventListener('click',function(){
            console.log(this.className=='bgAudio');
            this.className=='bgAudio'?_this.playMusic():_this.pauseMusic();
        },false);
    };

    //play
    CcAudio.prototype.playMusic=function(callback){
        this.audio.play();
        this.audioCc.className='bgAudio audioPlay';
        if(callback) {
            this.audio.addEventListener('ended', callback)
        }else return;
    };

    //pause
    CcAudio.prototype.pauseMusic=function(){
        this.audio.pause();
        this.audioCc.className='bgAudio';
    };

    /*判断系统
     ios自动暂停
     ios 4隐藏
     */
    CcAudio.prototype.isIphone = function(){
        var sys = navigator.userAgent;
        if(sys.indexOf('iPhone')>-1){
            this.pauseMusic();
            if(window.screen.height<=480){this.audioCc.style.display='none';}
        }
    }


    module.exports = CcAudio;
})


