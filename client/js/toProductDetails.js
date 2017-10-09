/**
 * Created by john on 2016/4/4.
 */
window.onload=function(){
    toSuccess();
    setInterval(nav,50);
}
var introduceTable=document.getElementsByClassName("introduceTable");
var line= document.getElementsByClassName("line")[0];
function nav(){
    if(document.body.scrollTop>300){
        introduceTable[0].style.opacity=1;
        introduceTable[1].style.opacity=1;
        line.style.opacity=1;
    }
}


//    点击切换图片
function changeImg(obj){
    var bigImg=document.getElementById("bigImg");
    bigImg.src=obj.src;
    bigImg.setAttribute("jqimg",obj.src);
}
var i=0;
var color1 = document.getElementById("color1");
var color2 = document.getElementById("color2");
var mood1 = document.getElementById("mood1");
var mood2 = document.getElementById("mood2");
var reduce = document.getElementById("z-reduce");//减
var add = document.getElementById("z-add");//加
var number = document.getElementById("j-number");//数字
function checkedButton(obj){
    i++;
    if(i%2!=0){
        toRed(obj);
    }else if(i%2==0){
        toBack(obj);
    }
    var thisId = obj.getAttribute("id");
    if(thisId=="color2"&&color1.childNodes[1].getAttribute("disabled")==null){
        toBack(color1);
        toRed(color2);
    }else if(thisId=="color1"&&color2.childNodes[1].getAttribute("disabled")==null){
        toBack(color2);
        toRed(color1);
    }else if(thisId=="mood2"&&mood1.childNodes[1].getAttribute("disabled")==null){
        toBack(mood1);
        toRed(mood2);
    }else if(thisId=="mood1"&&mood2.childNodes[1].getAttribute("disabled")==null){
        toBack(mood2);
        toRed(mood1);
    }
}

//点击变红
function toRed(obj){
    obj.style.background="rgba(195, 126, 4, 0.42)";
    obj.style.border="1px solid rgba(195, 126, 4, 0.42)";
    obj.style.color="#fff";
    obj.childNodes[1].disabled=false;
}

//点击变回
function toBack(obj){
    obj.style.background="#fff";
    obj.style.border="1px solid #000";
    obj.style.color="#000";
    obj.childNodes[1].setAttribute("disabled","disabled");
}
//增加数量
add.onclick=function(){
    var addNumber =number.value;
    addNumber++;
    number.value=addNumber;
}
//减少数量
reduce.onclick= function () {
    var reduceNumber =number.value;
    if(reduceNumber>1){
        reduceNumber--;
        number.value=reduceNumber;
    }
}

var subButton= document.getElementById("sub-Button");
var productInfo = document.getElementById("productInfo");
var notice= document.getElementsByClassName("j-notice")[0];
var exclamation= document.getElementsByClassName("exclamation")[0];
var clickButton =document.getElementById("clickButton");

//    如果有信息为空，不能提交表单
subButton.onclick=function() {
    if((color1.childNodes[1].disabled==false||color2.childNodes[1].disabled==false)&&(mood1.childNodes[1].disabled==false||mood2.childNodes[1].disabled==false)){
        notice.style.opacity=0;
        exclamation.style.opacity=0;
        productInfo.onsubmit= function () {
            return true;
        }
    }else{
        notice.style.opacity=1;
        exclamation.style.opacity=1;
        productInfo.onsubmit= function () {
            return false;
        }
    }
}