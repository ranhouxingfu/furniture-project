/**
 * Created by john on 2016/4/1.
 */
var BtnBox =document.getElementsByClassName("BtnBox")[0];
var style= document.getElementById("x-pro-style");
var styleButtonList = style.getElementsByTagName("button");

var kind = document.getElementById("x-pro-kind");
var kindButtonList = kind.getElementsByTagName("button");

var price = document.getElementById("x-pro-price");
var priceButtonList = price.getElementsByTagName("button");

var styleChoose="";//风格选择
var kindChoose="";//类型选择
var priceChoose="";//价格选择

function chooseStyle(){
    for(var i=0;i<styleButtonList.length;i++){
        styleButtonList[i].onclick=function(){
            for(var j=0;j<styleButtonList.length;j++){
                styleButtonList[j].style.background="#fff";
                styleButtonList[j].style.color="#000";
            }
            this.style.background="#000";
            this.style.color="#fff";
            var postValue= this.innerText;
            styleChoose=postValue;
            console.log(styleChoose);
            AJAX();
            BtnBox.style.display="none";
        }
    }
    for(var i=0;i<kindButtonList.length;i++){
        kindButtonList[i].onclick=function(){
            for(var j=0;j<kindButtonList.length;j++){
                kindButtonList[j].style.background="#fff";
                kindButtonList[j].style.color="#000";
            }
            this.style.background="#000";
            this.style.color="#fff";
            var postValue= this.innerText;
            kindChoose=postValue;
            console.log(kindChoose);
            AJAX();
            BtnBox.style.display="none";
        }
    }
    for(var i=0;i<priceButtonList.length;i++){
        priceButtonList[i].onclick=function(){
            for(var j=0;j<priceButtonList.length;j++){
                priceButtonList[j].style.background="#fff";
                priceButtonList[j].style.color="#000";
            }
            this.style.background="#000";
            this.style.color="#fff";
            var postValue= this.innerText;
            priceChoose=postValue;
            console.log(priceChoose);
            AJAX();
            BtnBox.style.display="none";
        }
    }

}

function AJAX(){
    myAjax("get","/getChoose.do",true,"styleChoose="+styleChoose+"&&kindChoose="+kindChoose+"&&priceChoose="+priceChoose,
        function (){
            if(http.readyState==4&&http.status==200){
                var dataList=JSON.parse(http.responseText);
                console.log(dataList);
                productBox.innerHTML="";
                var a="../images/";
                for(var i=0;i<dataList.length;i++){
                    productBox.innerHTML+="<a href='/productDetails.do?id="+dataList[i].pro_id+"'>"+
                        "<div class='picture"+(i+1)+"'style=' background:url("+a+dataList[i].p_adverImg+");background-size:100% 100%;background-position:center;'>"+
                        "<h3>"+dataList[i].p_name+"</h3>"+
                        "<p>"+dataList[i].p_nameWord+"</p>"+
                        "<div class='pictureOne'></div>"+
                        "</div>"+
                        "</a>";
                }
            }
        })
}
