/**
 * Created by Administrator on 2016/3/24.
 */

function id(id){
    var a=document.getElementById(id);
    return a;
}
function cla(cla){
    var b=document.getElementsByClassName(cla);
    return b;
}
function name(name){
    var c=document.getElementsByName(name);
    return c;
}
var cart =id("cart");
// 第二导航js函数
//中间部分的函数////////////////////////////////////////
var i=0;
var left=cla("leftInfo");
var right=cla("q-rightInfo");
//改变个人信息， 密码修改， 历史订单， 我的收藏的层级关系的函数模板显示各个模块
function change(obj){
    for(i=0;i<left.length;i++){
        //alert(left.length);
        if(left[i]==obj){
            right[i].style.display="block";
            var rightOrder=id("rightOrder");
            if(rightOrder.style.display="block"){
                TransactionOrderAjax();
            }
        }
        else{
            right[i].style.display="none";
        }
    }
}
//当页面加载完成的时候执行ajax函数
//获取input输入框的值,判断其值是否为空值？
function yanzheng(str){
    var inputName=name("name")[0].value;
    var inputPhone=name("phone")[0].value;
    var inputEmail=name("Email")[0].value;
    var infoTips=id("infoTips");
    if(inputName!=""||inputPhone!=""||inputEmail!=""){
        infoTips.style.display="none";
        //checkName(str);
    }
   else{
        infoTips.style.display="block";
        infoTips.style.color="orange";
    }
}
///个人信息界面正则验证、、、、、、、、、、、、
var checkName1=cla("i")[0];
var checkPhone1=cla("i")[1];
var checkEmail1=cla("i")[2];
var checkNameState=false;
var checkPhoneState=false;
var checkEmailState=false;

//验证姓名
function checkName(str) {
    //验证中文用户名的范式
    var re = /^[\u4e00-\u9fa5 ]{2,5}$/;
    if (re.test(str.value)) {
        checkName1.innerHTML="ok";
        checkName1.style.marginLeft="50px";
        checkNameState=true;
        //alert("ok")
    } else {
        checkName1.innerHTML="请中文输入长度小于5";
    }
}
//手机号验证、、、、、、、、、、、、、
function checkMobile(str) {
    ///0?(13|14|15|18)[0-9]{9}/;//正则表达式,匹配手机号码
    var re = /0?(13|14|15|18)[0-9]{9}/;
    if (re.test(str.value)) {
        checkPhone1.innerHTML="ok";
        checkPhone1.style.marginLeft="50px";
        checkPhoneState=true;
    } else {
        checkPhone1.innerHTML="11位手机号";
    }
}
//验证邮箱
//验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
//第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
//第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
function checkEmail(str){
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if(re.test(str.value)){
        checkEmail1.innerHTML="ok";
        checkEmail1.style.marginLeft="50px";
        checkEmailState=true;
    }else{
        checkEmail1.innerHTML="格式错误";
    }
}
function personInfoJoinAjax() {
    var inputName=name("name")[0].value;
    var inputPhone=name("phone")[0].value;
    var inputEmail=name("Email")[0].value;
    if (window.XMLHttpRequest){
        var httprequest = new XMLHttpRequest();
    }
    else{
        var httprequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(checkNameState==true&&checkPhoneState==true&&checkEmailState==true){
        httprequest.open("get", "/personInfoJoin.do?name="+inputName+"&mobilephone="+inputPhone+"&Email="+inputEmail, true);
        httprequest.onreadystatechange =function() {
            if (httprequest.readyState==4&& httprequest.status==200) {
                console.log(httprequest.responseText);
                //alert("保存成功");
            }
        }
        httprequest.send(null);
    }
    else{
        alert("请重新填写");
    }
}
window.onload=function(){
    var inputName=name("name")[0].value;
    var inputPhone=name("phone")[0].value;
    var inputEmail=name("Email")[0].value;
    if(window.XMLHttpRequest){
        var httprequest = new XMLHttpRequest();
    }
    else{
        var httprequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(checkNameState==true&&checkPhoneState==true&&checkEmailState==true){
        httprequest.open("get", "/personInfoJoin.do?name="+inputName+"&mobilephone="+inputPhone+"&Email="+inputEmail, true);
        httprequest.onreadystatechange=function() {
            if (httprequest.readyState==4&& httprequest.status==200) {
                console.log(httprequest.responseText);
                //alert("修改成功");
            }
        }
        httprequest.send(null);

    }
    var nameValue=document.getElementById("nameInput");
    var tips=document.getElementById("infoTips");
    if(nameValue.value!=""){
        tips.style.opacity=0;
        console.log(nameValue);
    }else{
        tips.style.opacity=1;
    }
    toSuccess();

}
 //修改密码界面的函数设置/////////////////////////////////

//输入原密码验证是否正确的ajax函数判断
var tips1=cla("tips")[0];//提示原密码是否正确
var tips2=cla("tips")[1];//提示新密码
var tips3=cla("tips")[2];//提示重复新密码是否一致
name("newPwd")[0].setAttribute("disabled",true);
name("reNewPwd")[0].setAttribute("disabled",true);
function modifyPwdAjax(){
    var shuruPwd=name("pwd")[0].value;
    tips1.innerHTML="";
    if(window.XMLHttpRequest){
        var httprequest= new XMLHttpRequest();
    }
    else{
        var httprequest =new ActiveXObject("Microsoft.XMLHTTP");
    }
    httprequest.open("get","/checkPwd.do?pass="+shuruPwd,true);
    httprequest.onreadystatechange=function(){
        var xywb=httprequest.responseText;
        var zhuangTai=httprequest.readyState;
        var zhuangTai1=httprequest.status;
        if(zhuangTai==4&&zhuangTai1==200){
            var b=JSON.parse(xywb);
            console.log(b.length);
            if(shuruPwd.length!=0){
                if(b.length>=1){
                    console.log(b);
                    console.log(tips1.value);
                    tips1.innerHTML="密码正确";
                    tips1.style.color="green";
                    name("newPwd")[0].removeAttribute("disabled");
                }
                else{
                    tips1.innerHTML="密码错误";
                    tips1.style.color="red";
                }
            }
            else{
                tips1.innerHTML="原密码不能为空";
                tips1.style.color="orange";
            }
        }
    };
//                第四步:发送数据
    httprequest.send(null);
};
//输入新密码的函数、、、、、、、、、、、、、、、、、、、、、
function inputNew(){
    var newPwd=name("newPwd")[0].value;
    if(newPwd.length==0){
        console.log(newPwd);
        tips2.innerHTML="密码不能为空";
        tips2.style.color="orange";
    }
    else{
        tips2.innerHTML="";//当输入新密码之后解放确认密码框的输入状态
        name("reNewPwd")[0].removeAttribute("disabled");
    }
}
//验证两次输入的新密码是否正确的函数
function sureNewPwd(){
    var newPwd=name("newPwd")[0].value;
    var reNewPwd=name("reNewPwd")[0].value;
    tips3.innerHTML="";
    if(newPwd.length!=0){
        if(newPwd==reNewPwd){
            tips1.innerHTML="";
            tips2.innerHTML="";
            tips3.innerHTML="正确";
            tips3.style.color="green";
        }
        else {
            tips3.innerHTML="不一致";
            tips3.style.color="red";
        }
    }
    else{
        tips3.innerHTML="新密码不能为空";
        tips3.style.color="orange";
    }
}
//修改确认一致之后的执行的提交密码到服务器的设置
function pwdModifyBtnAjax(){
    var reNewPwd=name("reNewPwd")[0].value;
   ////    第一步:获取ajax对象
    if(window.XMLHttpRequest){
        var httprequest= new XMLHttpRequest();
    }
    else{
        var httprequest =new ActiveXObject("Microsoft.XMLHTTP");
    }
    //////第二步;打开连接
    if(tips3.innerHTML=="正确"){
        httprequest.open("get","/updatePwd.do?newPass="+reNewPwd,true);
        //第三步:当请求得到响应的时候所使用的方法
        httprequest.onreadystatechange=function(){
           if(httprequest.readyState==4&&httprequest.status==200){
               alert("修改成功！");
           }
        }
        httprequest.send(null);
    }
}
//////////成交订单界面的函数////////////////////////////////////

function TransactionOrderAjax() {
    var doneOrderTable = cla("z-goods");
    var list=1;
     /*=====第一步：获取ajax对象======*/
    if (window.XMLHttpRequest) {
        var httprequest = new XMLHttpRequest();//dom
    } else {
        var httprequest = new ActiveXObject("Microsoft.XMLHTTP");//ie
    }
    httprequest.open("get","/getDoneOrder.do?DoneOrderList="+list,true);
    httprequest.onreadystatechange = function () {
        var zhuangtai = httprequest.status;
        var zhuangtai1 = httprequest.readyState;//状态
        var respText = httprequest.responseText;//响应文本
        var z_imgSrc = "../images/";
        if (zhuangtai == 200 && zhuangtai1 == 4) {
            doneOrderTable[0].innerHTML="";
            var resptext = JSON.parse(respText);//转换成JSON格式
            for (var i = 0; i < resptext.length; i++) {
                var img = resptext[i].p_adverImg;//产品路径
                var price = resptext[i].p_price;//产品价格
                var name = resptext[i].p_name;//产品名称
                var Number = resptext[i].c_number;//产品数量
                var color = resptext[i].c_color;//购物车中的产品颜色
                var mood = resptext[i].c_mood;//购物车中的产品木色
                doneOrderTable[0].innerHTML += "<tr class='z-trs'>" +
                "<td><div class='z-imgDiv'><img src='" + z_imgSrc + img + "'></div><div class='z-textDiv'><p class='z-goodsname'>" + name + "</p><p class='z-kids'>颜色:</p><div class='z-kids '>" + color + "</div><br><p class='z-kids'>木色:</p><div class='z-kids '>" + mood + "</div></div></td>" +
                "<td><span class='z-price'>" + price + "</span></td>" +
                "<td><div class='z-number'>" + Number + "</div></div></td>" +
                "<td><div class='z-price1'><span>" + Number*price +"</span></div></td>" +
                "</tr>";
            }
        }
    }
    httprequest.send(null);
}