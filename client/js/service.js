/**
 * Created by Administrator on 2016/3/24.
 */
var firstNav = document.getElementById("first-nav");
var secondNav = document.getElementById("second-nav");
var cart = document.getElementById("cart");

//    µ¼º½
function nav(){
    if(document.body.scrollTop>0){
        cart.className="cart cartChange";
        firstNav.style.display="none";
        secondNav.style.display="block";
    }else if(document.body.scrollTop==0){
        cart.className="cart";
        firstNav.style.display="block";
        secondNav.style.display="none";
    }
}
setInterval(nav,50);
