define(function(require, exports, module) {
    var CcAudio=function(url,el){
        if(!url){return;}
        var audio_cc=document.getElementById('audio_cc');
        this.audio=document.getElementById(el);
        if(!this.audio){return;}
        this.audioCt=audio_cc||null;
        this.aurl=url;
        this.loadMusic();
    };
    //装载音频
    CcAudio.prototype.loadMusic=function(){
        var _this=this;
        _this.audio.src=this.aurl;
        _this.audio.volume=0.5;
        if(!_this.audioCt){return;}
        _this.audioCt.style.display='block';
        _this.audioCt.className='bgAudio audioPlay';
        /*ios默认暂停*/
        _this.isIphone();

        //绑定音频控制
        _this.audioCt.addEventListener('click',function(){
            this.className=='bgAudio'?_this.playMusic():_this.pauseMusic();
        },false);
    };

    //播放音频
    CcAudio.prototype.playMusic=function(){
        this.audio.play();
        this.audioCt.className='bgAudio audioPlay';
    };

    //暂停音频
    CcAudio.prototype.pauseMusic=function(){
        this.audio.pause();
        this.audioCt.className='bgAudio';
    };

    /*判断系统
     ios自动暂停
     ios 4隐藏
     */
    CcAudio.prototype.isIphone = function(){
        var sys = navigator.userAgent;
        if(sys.indexOf('iPhone')>-1){
            this.pauseMusic();
            if(window.screen.height<=480){this.audioCt.style.display='none';}
        }
    }


    module.exports = CcAudio;
})


