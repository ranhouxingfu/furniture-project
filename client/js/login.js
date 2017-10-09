/**
 * Created by Administrator on 2016/3/28.
 */
function myClass(className){
    var className=document.getElementsByClassName(className)[0];
    return className;
}
var myCover=myClass("k-cover");//覆盖层
var loginBox=myClass("k-loginBox");//登录
var signBox=myClass("k-registerBox");//注册
loginBox.style.webkitTransition="all 1s ease";
myCover.style.webkitTransition="all 1s ease";
signBox.style.webkitTransition="all 1s ease";
function myLoginOpen(){//点击登录时
    loginBox.style.top="69px";
    myCover.style.display="block";
}
function switchSign(){//登录界面切换注册
    loginBox.style.top="-500px";
    signBox.style.top="69px";
}
function mySignOpen(){//点击注册时
    signBox.style.top="69px";
    myCover.style.display="block";
}
function switchLogin(){//注册切换登录
    signBox.style.top="-500px";
    loginBox.style.top="69px";
}
function myClose(){//关闭时
    loginBox.style.top="-500px";
    myCover.style.display="none";
    signBox.style.top="-500px";
}

//登录成功或失败跳转页面ajax
function toSuccess(){
    var myLogin=document.getElementsByClassName("k-myLogin")[0];
    var mySign=document.getElementsByClassName("k-mySign")[0];
    var myLoginUser=document.getElementsByClassName("k-myLoginUser")[0];
    var myLogout=document.getElementsByClassName("k-myLogout")[0];
    myAjax("get","/isLogin.do",true,"x="+1,function(){
        var data=http.responseText;
        if(http.readyState==4&&http.status==200){
            if(data!=null&&data!=undefined){
                myLogin.style.display="none";
                mySign.style.display="none";
                myLoginUser.style.display="block";
                myLogout.style.display="block";
                myLoginUser.innerHTML="<a href='/selectUserInfo.do'>"+data+" |</a>";
                myLogout.innerHTML="<a href='/loginout.do'>退出</a>";
                myClose();

            }else{
                myLogin.style.display="block";
                mySign.style.display="block";
                myLoginUser.style.display="none";
                myLogout.style.display="none";
            }
        }
    });
}

//登录验证
function myLoginAjax(){
    var loginUsername=document.getElementsByClassName("k-login-tel")[0].value;
    var loginPassword=document.getElementsByClassName("k-login-password")[0].value;
    var loginUserAndPass=document.getElementsByClassName("k-loginUserAndPass")[0];
    myAjax("get","/login.do",true,"username="+loginUsername+"&&password="+loginPassword,function(){
        if(http.readyState==4&&http.status==200){
            var data=JSON.parse(http.responseText);
            if(data.length>=1){
                loginUserAndPass.innerHTML="";
                var loginBox=document.getElementsByClassName("k-loginBox")[0];
                var mycover=document.getElementsByClassName("k-cover")[0];
                loginBox.style.top="-500px";
                mycover.style.display="none";
            }else{
                if(loginUsername==""){
                    loginUserAndPass.innerHTML="用户名不能为空！";
                    loginUserAndPass.style.color="red";
                }else if(loginPassword==""){
                    loginUserAndPass.innerHTML="密码不能为空！";
                    loginUserAndPass.style.color="red";
                }else{
                    loginUserAndPass.innerHTML="用户名或密码输入错误！";
                    loginUserAndPass.style.color="red";
                }
            }
        }
    });
}
function rLoginUser(){
    var loginUsername=document.getElementsByClassName("k-login-tel")[0].value;
    var loginUserAndPass=document.getElementsByClassName("k-loginUserAndPass")[0];
    if(loginUsername!=""){
        loginUserAndPass.innerHTML="";
    }
}
function rLoginPass(){
    var loginPassword=document.getElementsByClassName("k-login-password")[0].value;
    var loginUserAndPass=document.getElementsByClassName("k-loginUserAndPass")[0];
    if(loginPassword!=""){
        loginUserAndPass.innerHTML="";
    }
}
//注册验证用户名
function mySignUserAjax(){
    var signUsername=document.getElementsByClassName("k-register-tel")[0].value;
    var UserPrompt=document.getElementsByClassName("k-signUserPrompt")[0];
    myAjax("post","/zhuce.do",true,"signUsername="+signUsername,function(){
        if(http.readyState==4&&http.status==200){
            var data=JSON.parse(http.responseText);
            if(data.length>=1){
                UserPrompt.innerHTML="用户名已存在";
                UserPrompt.style.color="red";
            }else if(data.length<1){
                if(signUsername==""){
                    UserPrompt.innerHTML="用户名不能为空!";
                    UserPrompt.style.color="red";
                }else{
                    UserPrompt.innerHTML="可以注册";
                    UserPrompt.style.color="green";
                }
            }
        }
    });
}
//注册验证密码
function mySignRPassAjax(){
    var signPassword=document.getElementsByClassName("k-register-password")[0].value;
    var signRPassword=document.getElementsByClassName("k-register-rPassword")[0].value;
    var passwordPrompt=document.getElementsByClassName("k-signPasswordPrompt")[0];
    if(signRPassword!=signPassword){
        passwordPrompt.innerHTML="两次输入的密码不一致！";
        passwordPrompt.style.color="red";
    }else{
        passwordPrompt.innerHTML="";
    }
}
//注册时点击注册添加数据到数据库
function addData(){
    var signUsername=document.getElementsByClassName("k-register-tel")[0].value;
    var signPassword=document.getElementsByClassName("k-register-password")[0].value;
    var signRPassword=document.getElementsByClassName("k-register-rPassword")[0].value;
    var UserPrompt=document.getElementsByClassName("k-signUserPrompt")[0];
    var passwordPrompt=document.getElementsByClassName("k-signPasswordPrompt")[0];
    mySignUserAjax();//调用用户名输入框失去焦点时触发的ajax事件
    if(signUsername!=""&&signPassword!=""&&signRPassword!=""){
        if(signPassword==signRPassword){
            if(UserPrompt.innerHTML=="可以注册"){
                UserPrompt.innerHTML="";
                myAjax("post","/sign.do",true,"signUsername="+signUsername+"&&signPassword="+signPassword,function(){
                    if(http.readyState==4&&http.status==200){}
                });
                UserPrompt.innerHTML="";
                var registerBox=document.getElementsByClassName("k-registerBox")[0];
                var mycover=document.getElementsByClassName("k-cover")[0];
                //alert("注册成功！");
                registerBox.style.top="-500px";
                mycover.style.display="none";
            }
            else if(UserPrompt.innerHTML==""){
                signUsername="";
                signPassword="";
                signRPassword="";
            }
            passwordPrompt.innerHTML="";
        }else{
            passwordPrompt.innerHTML="两次输入的密码不一致！";
            passwordPrompt.style.color="red";
        }
    }
    else{
        if(signUsername==""){
            UserPrompt.innerHTML="用户名不能为空！";
            UserPrompt.style.color="red";
        }else if(signRPassword==""){
            passwordPrompt.innerHTML="密码不能为空！";
            passwordPrompt.style.color="red";
        }
    }
}
