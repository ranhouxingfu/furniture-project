/**
 * Created by zhongyuan on 2016/3/27.
 */
window.onload=function() {
    getlisting();
    gettotalPrice();
    toSuccess();
}
    var firstNav = document.getElementById("first-nav");
    var secondNav = document.getElementById("second-nav");
    var cart = document.getElementById("cart");
    var city=new Array();//创建一个二维数组,和省份相对应
    city[0]=["成都","达州","绵阳","德阳"];
    city[1]=["一环","二环","三环","四环"];
    city[2]=["无锡","扬州","海门","镇江"];
    //获得省份下拉框的对象
    var sltProvince=document.getElementsByClassName('z-province')[0];
    //获得城市下拉框的对象
    var sltCity=document.getElementsByClassName('z-city')[0];
    var mykuaiDi=document.getElementsByClassName("z-kuaiDi")[0];//获取快递节点
    var mykuaidiDiv=mykuaiDi.getElementsByTagName("div");
    var mychange=document.getElementsByClassName("z-change1");//选择确认或者取消按钮
    var zhuangtai=false;//设置按钮初始状态
    var myName=document.getElementsByClassName("z-name");//获取姓名节点
    var mytelNum=document.getElementsByClassName("z-telNum");//获取电话号码节点
    var myLocation1=document.getElementsByClassName("z-location1");//获取地址节点
    var newName=document.getElementsByClassName("z-newName");//获取新增收货人姓名节点
    var newContact=document.getElementsByClassName("z-contact");//获取新增地址节点
    var myprovince=document.getElementsByClassName("z-province");//新增省份
    var mycity=document.getElementsByClassName("z-city");//新增市
    var xiangXi=document.getElementsByClassName("z-xiangXi");//填写详细地址
    var yes=document.getElementsByClassName("z-yes");
    var mypay=document.getElementsByClassName("z-payMathod");//获取支付方式最大的节点
    var mypayMethod=mypay[0].getElementsByTagName("span");//获取第一级支付节点
    var mypay1=document.getElementsByClassName("z-payMathod1");//获取二级支付节点
    var  mypayMethod1=mypay1[0].getElementsByTagName("span");
    //alert(mypayMethod1.length)
    var mypayMethod2=document.getElementsByClassName("z-payMathod2");//获取三级支付节点z-payThird
    var mypaylast=document.getElementsByClassName("z-paylast");
    var goPay=document.getElementsByClassName("z-goPay")[0];
    var kuaidiWay;//获取快递方式
    var payimgSrc;//获取在线最终支付方式的图片名字
    //导航
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
    //alert(myprovince[0].value
    /*=========匹配姓名========*/
    newName[0].onblur=function(){
        var nametishi=document.getElementsByClassName("z-nametishi")[0];
        var uValue=newName[0].value;
        var partten=/^[\u4400-\u9fa5]+$/;
        ///^[A-Za-z0-9\u4e00-\u9fa5]+$/
        if(partten.test(uValue)==true){
            nametishi.style.visibility="hidden";
        }else{
            nametishi.style.visibility="visible";
        }
    }
    /*======判断手机号码是否输入正确=======*/
    newContact[0].onblur=function(){
        var numtishi=document.getElementsByClassName("z-teltishi")[0];//输入手机时候的提示框
        var telTrue=document.getElementsByClassName("z-telTrue")[0];//正确提示框
        var uValue=newContact[0].value;
        var partten=/0?(13|14|15|18)[0-9]{9}/;//正则表达式,匹配手机号码
        //var f1=false;
        if(partten.test(uValue)==true){
            numtishi.style.visibility="hidden";
        }else{
            //alert("请输入正确的号码");
            numtishi.style.visibility="visible";
        }
    }
    /*=======省市二级联动========*/
    sltProvince.onchange=function(){
               //得到对应省份的城市数组
        var provinceCity=city[sltProvince.selectedIndex - 1];//sltProvince.selectedIndex表示省份的索引值
        //alert(sltProvince.selectedIndex )
               //清空城市下拉框，仅留提示选项
        sltCity.length=1;
        //将城市数组中的值填充到城市下拉框中
        for(var i=0;i<provinceCity.length;i++){
            sltCity[i+1]=new Option(provinceCity[i],provinceCity[i]);
        }
    }
    /*========是否设置为默认地址========*/
    function makeDefault(){
        var myname=newName[0].value;//收货人姓名
        var mynumber=newContact[0].value;//电话号码
        var mylocal=xiangXi[0].value;//自己填写的地址信息
        var mylocation=myprovince[0].value+mycity[0].value+mylocal;//地址
        if(myname!=""&&mynumber!=""&&mylocal!=""){
            myName[0].innerHTML=myname;
            mytelNum[0].innerHTML=mynumber;
            myLocation1[0].innerHTML=myprovince[0].value+mycity[0].value;//字符串拼接
            myLocation1[1].innerHTML=mylocation;
        }else if(myname==""||mynumber==""||mylocal==""){
            alert("信息未填写完整！");
        }

    }
    //makeDefault();
/*=====选中复选框=====*/
    function xuanZhong(){
        if(yes[0].checked==true){
            makeDefault();
        }
    }
    /*=======选择确认或者取消=======*/
    for(var i=0;i<mychange.length;i++){
        mychange[i].onclick=function(){
            for(j=0;j<mychange.length;j++){
                if(this==mychange[j]){
                    mychange[j].style.background="pink";
                }else{
                    mychange[j].style.background="#DDDEE2";
                }
            }
                makeDefault();
        }
    }
    /*=====选择快递函数=======*/
        for(var i=0;i<mykuaidiDiv.length;i++){
            mykuaidiDiv[i].onclick=function(){
                kuaidiWay=this;
                for(var j=0;j<mykuaidiDiv.length;j++){
                    if(this==mykuaidiDiv[j]){
                        mykuaidiDiv[j].style.background="#DDDEE2";
                    }else{
                        //this.style.border="#BEBEBF";
                        mykuaidiDiv[j].style.background="white";
                    }
                }
            }
        }
    /*========选择支付方式=======*/
    for(var k=0;k<mypayMethod.length;k++){
        mypayMethod[k].onclick=function(){
            //alert(mypayMethod.length);
            for(var j=1;j>=0;j--){
                if(this==mypayMethod[j]){
                    mypayMethod[j].style.color="red";
                    mypay1[0].style.display="block";
                    mypay[0].style.overflow="visible";
                }else{
                    mypayMethod[j].style.color="black";
                    mypay1[0].style.display="none";
                    mypayMethod2[0].style.display="none";
                    mypay[0].style.overflow="hidden";
                }
            }
        }
    }
    for(var i=0;i<mypayMethod1.length;i++){
        mypayMethod1[i].onclick=function(){
            //alert(mypayMethod.length);
            for(var j=2;j>=0;j--){
                if(this==mypayMethod1[j]){
                    mypayMethod1[j].style.color="red";
                    mypayMethod2[0].style.display="block";
                    mypay1[0].style.overflow="visible";
                }else{
                    mypayMethod1[j].style.color="black";
                    mypayMethod2[0].style.display="none";
                    mypay1[0].style.overflow="hidden";
                }
            }
        }
    }
    for(var i=0;i<mypaylast.length;i++){
        mypaylast[i].onclick=function(){
            for(var j=0;j<mypaylast.length;j++){
                if(this==mypaylast[j]){
                    var s=document.getElementsByClassName("z-img1")[j].src;
                    //alert(s.substring(s.lastIndexOf("/")+1));
                     payimgSrc=s.substring(s.lastIndexOf("/")+1);//获取到图片路径
                    mypaylast[j].style.background="#F5F6F7";
                }else{
                    mypaylast[j].style.background="white";
                }
            }
        }
    }


/*=======读取数据库信息======*/
function getlisting(){//订单清单
    var lisTable=document.getElementsByClassName("z-goods");//获取清单表格
    //console.log(mydelivery)
    var list=1;
    /*=====第一步：获取ajax对象======*/
    if(window.XMLHttpRequest){
        var httprequest=new XMLHttpRequest();//dom
    }else{
        var httprequest=new ActiveXObject("Microsoft.XMLHTTP");//ie
    }
    /*======第二步：打开链接======*/
    httprequest.open("get","/getlist.do?name="+list,true);
    /*====第三步：当请求得到相应的时候所用的方法=======*/
    httprequest.onreadystatechange=function(){
        var zhuangtai=httprequest.status;
        var zhuangtai1=httprequest.readyState;//状态
        var respText=httprequest.responseText;//响应文本
        var z_imgSrc = "../images/";
        if(zhuangtai==200&&zhuangtai1==4){
            var resptext=JSON.parse(respText);//转换成JSON格式
            for(var j=0;j<resptext.length;j++){
                var img = resptext[j].p_adverImg;//产品路径
                var price = resptext[j].p_price;//产品价格
                var name = resptext[j].p_name;//产品名称
                var Number=resptext[j].c_number;//产品数量
                var color=resptext[j].c_color;//购物车中的产品颜色
                var mood=resptext[j].c_mood;//购物车中的产品木色
                lisTable[0].innerHTML+="<tr><td><div class='z-imgDiv'><img src='"+z_imgSrc+img +"'></div><div class='z-textDiv'><p class='z-goodsname'>"+name+"</p><p class='z-kids'>颜色:</p><div class='z-kids '>"+color+"</div><br><p class='z-kids'>木色:</p><div class='z-kids '>"+mood+"</div></div></td><td><span class='z-price'>"+price+"</span></td><td> <div class='z-number'>"+Number+"</div></div></td><td> <div class='z-price1'><span>"+Number*price+"</span></div></td></tr>";
            }
        }
    }
    httprequest.send(null);
}
/*====获取总价====*/
function gettotalPrice() {
    var payPrice=document.getElementsByClassName("z-payPrice")[0];//获取应该支付价格的节点
    /*=====第一步：获取ajax对象======*/
    if (window.XMLHttpRequest) {
        var httprequest = new XMLHttpRequest();//dom
    } else {
        var httprequest = new ActiveXObject("Microsoft.XMLHTTP");//ie
    }
    /*======第二步：打开链接======*/
    httprequest.open("get", "/getTotal.do?y=" + 1, true);
    /*====第三步：当请求得到相应的时候所用的方法=======*/
    httprequest.onreadystatechange = function () {
        var zhuangtai = httprequest.status;
        var zhuangtai1 = httprequest.readyState;//状态
        var respText = httprequest.responseText;//响应文本
        if (zhuangtai == 200 && zhuangtai1 == 4) {
            payPrice.innerHTML="￥"+httprequest.responseText;
        }
    }
    httprequest.send(null);
}
/*=======ajax======*/
goPay.onclick=function(){
    //console.log(44444)
    var mydelivery=kuaidiWay.innerHTML;//快递方式
    var lisTable=document.getElementsByClassName("z-goods");//获取清单表格
    var myname=newName[0].value;//收货人姓名
    var mynumber=newContact[0].value;//电话号码
    var mylocal=xiangXi[0].value;//自己填写的地址信息
    var mylocation=myprovince[0].value+mycity[0].value+mylocal;//地址
    /*=====第一步：获取ajax对象======*/
    if(window.XMLHttpRequest){
        var httprequest=new XMLHttpRequest();//dom
    }else{
        var httprequest=new ActiveXObject("Microsoft.XMLHTTP");//ie
    }
    if(myname!=""&&mynumber!=""&&mylocal!=""){
        /*======第二步：打开链接======*/
        httprequest.open("get","/get.do?name="+myname+"&number="+mynumber+"&location="+mylocation+"&delivery="+mydelivery+"&payimgSrc="+payimgSrc,true);
        /*====第三步：当请求得到相应的时候所用的方法=======*/
        httprequest.onreadystatechange=function(){
            var zhuangtai=httprequest.status;
            var zhuangtai1=httprequest.readyState;//状态
            var respText=httprequest.responseText;//响应文本
            if(zhuangtai==200&&zhuangtai1==4){
                var resptext=JSON.parse(respText);//转换成JSON格式
            }
        }
    }else if(myname==""||mynumber==""||mylocal==""){
        alert("信息未填写完整！");
    }
    httprequest.send(null);
}