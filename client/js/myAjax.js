/**
 * Created by Administrator on 2016/3/18.
 */
//第一步:获取ajax对象
var http;
function myAjax(method,url,type,param,callback){

    if(window.XMLHttpRequest){
        http=new XMLHttpRequest();//DOM
    }else{
        http=new ActiveXObject("Microsoft.XMLHTTP");// IE
    }
    if(method=="get"){
        http.open(method,url+"?"+param,type);
        http.send(null)
    }else if(method=="post"){
        http.open(method,url,type);
        http.setRequestHeader("content-type","application/x-www-form-urlencoded")
        http.send(param)
    }
    http.onreadystatechange=callback
}




