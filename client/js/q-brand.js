/**
 * Created by Administrator on 2016/3/24.
 */

//时间轴部分的jquery函数
var curIndex = 0; //当前index
  //alert(imgLen);
// 定时器自动变换4秒每次
var autoChange = setInterval(function(){
    if(curIndex < $(".imgList li").length-1){
        curIndex ++;
    }else{
        curIndex = 0;
    }
    //调用变换处理函数
    changeTo(curIndex);
},4000);
//当时间轴被hover的时候触发的函数,改变其自动轮播为item
$(".historyList").find("li").each(function(item){
    $(this).hover(function(){
        clearInterval(autoChange);
        changeTo(item);
        curIndex = item;
    },function(){
        autoChange = setInterval(function(){
            if(curIndex < $(".imgList li").length-1){
                curIndex ++;
            }else{
                curIndex = 0;
            }
            //调用变换处理函数
            changeTo(curIndex);
        },4000);
    });
});
function changeTo(num){
    $(".imgList").find("li").removeClass("imgOn").hide(500).eq(num).fadeIn(800).addClass("imgOn");
    $(".infoList").find("li").removeClass("infoOn").eq(num).addClass("infoOn");
    $(".historyList").find("li").removeClass("hisDefault").eq(num).addClass("hisDefault");
}