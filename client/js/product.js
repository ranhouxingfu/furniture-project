//===============================================================ÂÖ²¥
var Carousel=setInterval(CarouselFun,4000);
function CarouselFun(){
    var slideImg=document.getElementsByClassName("x-pro-banner")[0];
    var x= document.defaultView.getComputedStyle(slideImg,null);
    var s= parseInt(x.marginLeft);
    var Left = s-1349+"px";
    if(s<=-2698){
        Left="0px";
    }
    slideImg.style.marginLeft=Left;
}
var price=document.getElementsByClassName("x-pro-choose");
//===============================================================µãÑ¡
for(var i=0;i<=2;i++){
    price[i].onclick=function(){
        for(var j=0;j<=2;j++){
            if(this==price[j]){
                price[j].style.background="#333";
                price[j].style.color="white";
            }else{
                price[j].style.background="white";
                price[j].style.color="#333";
            }
        }
    }
}
for(var m=2;m<=7;m++){
    price[m].onclick=function(){
        for(var n=2;n<=7;n++){
            if(this==price[n]){
                price[n].style.background="#333";
                price[n].style.color="white";
            }else{
                price[n].style.background="white";
                price[n].style.color="#333";
            }
        }
    }
}
for(var k=8;k<=12;k++){
    price[k].onclick=function(){
        for(var l=8;l<=12;l++){
            if(this==price[l]){
                price[l].style.background="#333";
                price[l].style.color="white";
            }else{
                price[l].style.background="white";
                price[l].style.color="#333";
            }
        }
    }
}
