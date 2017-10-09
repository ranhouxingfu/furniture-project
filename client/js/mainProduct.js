/**
 * Created by mh on 2016/3/24.
 */
//alert(scrollY);

window.onload=function(){
    toSuccess();
    var rightWord= document.getElementById("rightWord");
    rightWord.style.opacity=1;
    rightWord.style.transition="all 2s linear";

    setInterval(chuxian,10);//定时器随时监听滚动条时间
    function chuxian(){
        //alert(111)
        var myfold=document.getElementsByClassName("fold");
        //alert(myfold.length)
        //var t =document.body.scrollTop;
        //alert(111)
        if(document.body.scrollTop==0){
            myfold[0].style.opacity=0;
            myfold[0].style.left="200px";
            myfold[0].style.webkitTransition="1s ease-in all";
        }else if(document.body.scrollTop>100){
            myfold[0].style.opacity=1;
            myfold[0].style.left="300px";
            myfold[0].style.webkitTransition="1s ease-in all";
        }
    }

}