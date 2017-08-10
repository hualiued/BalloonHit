/**
 * Created by hualiued on 17/7/26.
 */

var num = 10;
var oBody = document.documentElement||document.body;
var wW = window.innerWidth;
var wH = window.innerHeight;
var timer = null;
init(num);
function init(num){
    for(var i=0;i<num;i++){
        var randomL = Math.random()*wW; //随机left范围
        randomL = Math.min(wW-160,randomL); //规范left位置
        var balloon = document.createElement("div"); //用js生成标签
        balloon.className = "balloon";  //给设置的div设置类名
        balloon.style.left = randomL+"px";  //改变元素left值
        balloon.style.top = wW+'px'; //改变top值
        balloon.speed = Math.random()*5+1; //自定义属性，创建元素的时候添加
        oBody.appendChild(balloon); //body中添加元素对象
    }
}
timer = setInterval(function(){
    var oBall = document.querySelectorAll(".balloon"); //获取页面所有的气球
    for(var i = 0,len = oBall.length;i<len;i++){
        oBall[i].style.top = oBall[i].offsetTop-oBall[i].speed+"px";
        oBall[i].onclick = function(){
            crash(this,function(xxx){
                clearInterval(xxx.timer);
                xxx.parentNode.removeChild(xxx);
            });
            init(1);
        }
    }
},30);

function crash(ele,cb) { //被点击之后撤气效果
    ele.timeouter = setTimeout(function(){
        cb&&cb(ele);
    },500)
    ele.timer = setInterval(function(){
        ele.speed++; //加速度自增
        ele.style.top = ele.offsetTop-ele.speed+"px"; //加速逃离
        ele.style.width = ele.offsetWidth-10+"px"; //宽度减少
        ele.style.height = ele.offsetHeight-10+"px"; //高度减少
    },30);
}
