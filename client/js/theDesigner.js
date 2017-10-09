/**
 * Created by mh on 2016/3/24.
 */
var oDesign = document.getElementsByClassName("design")[0];
var oNav1 = document.getElementsByClassName("m-nav1");
var oNav2 = document.getElementsByClassName("m-nav2");
var oNav3 = document.getElementsByClassName("m-nav3");

window.onload=function(){
    toSuccess();
}

setInterval(mNav, 50);
//tTimeout(mNav,500);
function mNav() {
    if (document.body.scrollTop < 50) {
        for (var i = 0; i < oNav1.length; i++) {
            oNav1[i].style.opacity = 0;
            oNav1[i].style.marginTop = "85px";
            oNav1[i].style.webkitTransition = "1s ease-in all";
            oNav2[i].style.opacity = 0;
            oNav2[i].style.marginTop = "85px";
            oNav2[i].style.webkitTransition = "1s ease-in all";
            oNav3[i].style.opacity = 0;
            oNav3[i].style.marginTop = "85px";
            oNav3[i].style.webkitTransition = "1s ease-in all";
        }
        oDesign.style.opacity = 0;
        oDesign.style.marginTop = "100px";
        oDesign.style.webkitTransition = "1s ease-in all";
    }
    else if (document.body.scrollTop > 50 && document.body.scrollTop < 240) {
        for (var i = 0; i < oNav1.length; i++) {
            oNav1[i].style.opacity = 1;
            oNav1[i].style.marginTop = "35px";
            oNav1[i].style.webkitTransition = "all 1s linear"
        }
        oDesign.style.opacity = 1;
        oDesign.style.marginTop = "50px";
        oDesign.style.webkitTransition = "1s ease-in all";
    }
    else if(document.body.scrollTop > 240 && document.body.scrollTop < 380){
        for (var i = 0; i < oNav1.length; i++) {
            oNav2[i].style.opacity = 1;
            oNav2[i].style.marginTop = "35px";
            oNav2[i].style.webkitTransition = "all 1s linear"
        }
    }
    else if(document.body.scrollTop > 380 && document.body.scrollTop < 520){
        for (var i = 0; i < oNav1.length; i++) {
            oNav3[i].style.opacity = 1;
            oNav3[i].style.marginTop = "35px";
            oNav3[i].style.webkitTransition = "all 1s linear"
        }
    }

}
