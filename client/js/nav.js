/**
 * Created by john on 2016/3/28.
 */
var firstNav = document.getElementById("first-nav");
var indexNav=document.getElementsByClassName("index-first-nav")[0];
var secondNav = document.getElementById("second-nav");
var cart = document.getElementById("cart");
var bar = document.getElementById("bar");

//    导航
function nav(){
    if(document.body.scrollTop>0){
        cart.className="cart cartChange";
        cart.style.transition="all 0s linear";
        firstNav.style.display="none";
        secondNav.style.transition="all .3s linear";
        //secondNav.style.display="block";
        secondNav.style.top="25px";
        //indexNav.style.transform="translate(0,-30px)";

    }else if(document.body.scrollTop==0){
        cart.className="cart";
        cart.style.transition="all .3s linear";
        firstNav.style.display="block";
        //indexNav.style.transform="translate(0,30px)";
        //indexNav.style.transition="all 1s linear";
        secondNav.style.transition="all .3s linear";
        //secondNav.style.display="none";
        secondNav.style.top="-100px";
    }
}
setInterval(nav,50);

bar.onclick=function(){
    alert(1);
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