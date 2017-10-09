/**
 * Created by john on 2016/4/4.
 */
var indexName=document.getElementById("index-name");
var indexNav=document.getElementsByClassName("index-first-nav")[0];
window.onload=function(){
    indexNav.style.opacity=1;
    indexNav.style.transition="all 1s linear";
    setTimeout(logo,12000);
    toSuccess();
    var notOnline = document.getElementById("notOnline").value;
    if(notOnline==1){
        myLoginOpen();
    }
}
function logo(){
    indexName.style.opacity=1;
    indexName.style.transition="all linear 2s";
}

var firstNav = document.getElementById("first-nav");
var secondNav = document.getElementById("second-nav");
var cart = document.getElementById("cart");
var bar = document.getElementById("bar");

bar.onclick=function(){
    var secondNav = document.getElementById("second-nav");
    secondNav.style.height="10px";
    secondNav.style.transition="all .3s linear";
}

//导航条收缩
var i=0;
bar.onclick=function(){
    i++;
    if(i%2!=0){
        var secondNav = document.getElementById("nav-box");
        secondNav.style.height="22px";
        secondNav.style.borderRadius="3px";
        bar.style.top="-13px";
        bar.style.transition="all .3s linear";
        secondNav.style.transition="all .3s linear";
    }else if(i%2==0){
        var secondNav = document.getElementById("nav-box");
        secondNav.style.height="88px";
        bar.style.top="50px";
    }
}

//    导航

var adverWord= document.getElementById("adverWord");
var adverImg=document.getElementById("adverImg");
function nav(){
    if(document.body.scrollTop>0){
        cart.className="cart cartChange";
        cart.style.transition="all 0s linear";
        firstNav.style.display="none";
        secondNav.style.transition="all .3s linear";
        //secondNav.style.display="block";
        secondNav.style.top="25px";
        indexNav.style.transform="translate(0,-30px)";

    }if(document.body.scrollTop==0){
        cart.className="cart";
        cart.style.transition="all .3s linear";
        firstNav.style.display="block";
        indexNav.style.transform="translate(0,50px)";
        indexNav.style.transition="all 1s linear";
        secondNav.style.transition="all .3s linear";
        //secondNav.style.display="none";
        secondNav.style.top="-100px";
        adverWord.style.transform="translate(0,30px)";
    }if(document.body.scrollTop>=1700){
        console.log(1);
        adverWord.style.transform="translate(0,-30px)";
        adverWord.style.opacity=1;
    }
}
setInterval(nav,50);

var firstPro =document.getElementById("firstPro");
var secondPro = document.getElementById("secondPro");
var thirdPro = document.getElementById("thirdPro");
var fourthPro =document.getElementById("fourthPro");
var fifthPro = document.getElementById("fifthPro");
var sixthPro = document.getElementById("sixthPro");

//    图片悬停移动
//    x方向移动90,y方向移动64
firstPro.onmouseover=function(){
    firstPro.style.width="420px";
    secondPro.style.left="435px";
    thirdPro.style.left="855px";
    fourthPro.style.top="300px";
    fifthPro.style.left="435px";
    fifthPro.style.top="290px";
    sixthPro.style.top="500px";
    firstPro.style.transition="all 1s linear";
}
firstPro.onmouseout=function(){
    firstPro.style.width="330px";
    secondPro.style.width="405px";
    secondPro.style.left="345px";
    thirdPro.style.left="765px";
    fourthPro.style.top="235px";
    fifthPro.style.left="345px";
    fifthPro.style.top="254px";
    sixthPro.style.top="452px";
    firstPro.style.transition="all 1s linear";
}
secondPro.onmouseover=function(){
    secondPro.style.width="500px";
    thirdPro.style.left="855px";
    fifthPro.style.top="305px";
    sixthPro.style.top="502px";
}
secondPro.onmouseout=function(){
    secondPro.style.width="405px";
    thirdPro.style.left="765px";
    fourthPro.style.top="235px";
    fifthPro.style.top="254px";
    sixthPro.style.top="452px";
}
thirdPro.onmouseover=function(){
    firstPro.style.left="-100px";
    secondPro.style.left="242px";
    thirdPro.style.width="750px";
    thirdPro.style.left="660px";
    fourthPro.style.left="-100px";
    fifthPro.style.left="242px";
    sixthPro.style.top="515px";
    sixthPro.style.left="242px";
    firstPro.style.transition="all 1s linear";
}
thirdPro.onmouseout=function(){
    firstPro.style.left="0";
    secondPro.style.left="345px";
    thirdPro.style.width="650px";
    thirdPro.style.left="765px";
    fourthPro.style.left="0";
    fifthPro.style.left="345px";
    sixthPro.style.top="452px";
    sixthPro.style.left="345px";
}

fourthPro.onmouseover=function(){
    firstPro.style.top="-60px";
    secondPro.style.top="-70px";
    thirdPro.style.left="810px";
    fourthPro.style.width="400px";
    fourthPro.style.top="175px";
    fifthPro.style.left="400px";
    fifthPro.style.top="200px";
    sixthPro.style.left="415px";
    firstPro.style.transition="all 1s linear";
}
fourthPro.onmouseout=function(){
    firstPro.style.top="0";
    secondPro.style.top="-10px";
    thirdPro.style.left="765px";
    fourthPro.style.width="330px";
    fourthPro.style.top="235px";
    fifthPro.style.top="254px";
    fifthPro.style.left="345px";
    sixthPro.style.left="345px";
}