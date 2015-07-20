function init(){
  //判断移动浏览器是否支持运动传感器事件
  if(window.DeviceMotionEvent){
    //添加一个事件监听器
    window.addEventListener('devicemotion',deviceMotionHandler,false);
  }else{
    alert('not support mobile event');
  }
}      
var SHAKE_THRESHOLD=1000;//定义一个摇动的阈值
var last_update=0;//定义一个变量记录上一次摇动的时间
var x=y=z=last_x=last_y=last_z=0;//定义x、y、z记录三个轴的数据以及上一次触发的时间
//运动传感器处理
function deviceMotionHandler(eventData){
  //获取含重力加速
  var acceleration=eventData.accelerationIncludingGravity;
  var curTime=new Date().getTime();//获取当前时间戳
  var diffTime=curTime-last_update;
  if(diffTime>100){
    last_update=curTime;//记录上一次摇动的时间
    x=acceleration.x;//获取加速度X方向
    y=acceleration.y;//获取加速度Y方向
    z=acceleration.z;//获取加速度垂直方向
    var speed=Math.abs(x+y+z-last_x-last_y-last_z)/diffTime*10000;//计算阈值
    if(speed>SHAKE_THRESHOLD){
      alert("shaked");
    }
    //记录上一次加速度
    last_x=x;
    last_y=y;
    last_z=z;
  }
}