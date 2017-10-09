/**
 * Created by Administrator on 2016/3/29.
 */
var mysql=require("./../node_modules/mysql");//获取数据库
//数据库封装函数
function db(){//创建数据库连接
    var mydb=mysql.createConnection({
        host:"localhost",
        port:"3306",
        user:"root",
        password:"root",
        database:"xiangjiaProject"
    });
    return mydb;
}
//登录验证
exports.mylogin=function(req,resp,next){
    var username=req.query.username;
    //console.log(username);
    var password=req.query.password;
    var mydata=db();
    mydata.connect();
    var sql="select * from t_user where username=? and pass=?";
    var sqlArray=[];
    sqlArray.push(username);
    sqlArray.push(password);
    mydata.query(sql,sqlArray,function(err,data){
        resp.send(data);
    });
    mydata.end();
}
//登录session
exports.denglu=function(req,resp,next){
    var username=req.query.name;
    var password=req.query.password;
    //console.log(username+password);
    var mydata=db();
    mydata.connect();
    var sql="select username from t_user where username=? and pass=?";
    var sqlArray=[];
    sqlArray.push(username);
    sqlArray.push(password);
    //sqlArray.push(password);
    mydata.query(sql,sqlArray,function(err,data){
        //console.log(data);
        if(data.length>=1){
            req.session.name=username;
            //resp.render("index.html",{name:username});
            resp.redirect("index.html");
        }
    });
    mydata.end();
}
exports.isLogin=function(req,resp){
    var x=req.query.x;
    console.log(x);
    if(x==1){
        if(req.session.name!=null&&req.session.name!=undefined){
            resp.send(req.session.name);
        }else{
            console.log(req.session.name);
        }
    }
}
exports.loginout=function(req,resp){
    req.session.name=null;
    resp.redirect("index.html");
}
//注册验证用户名
exports.mysign=function(req,resp){
    //console.log(req.body.signUsername);
    var signUsername=req.body.signUsername;
    var mydata=db();
    mydata.connect();
    mydata.query("SELECT username FROM t_user WHERE username=?",[signUsername],function(err,data){
        //console.log(data);
        resp.send(data);
    });
    mydata.end();
}
//点击注册时添加数据
exports.myzhuce=function(req,resp){
    var signUsername=req.body.signUsername;
    var signPassword=req.body.signPassword;
    var mydata=db();
    mydata.connect();
    var sql="insert into t_user values (?,?,?,?,?,?)";
    var myarray=[];
    myarray.push(null);
    myarray.push(signUsername);
    myarray.push(signPassword);
    myarray.push(null);
    myarray.push(null);
    myarray.push(null);
    mydata.query(sql,myarray,function(err,data){
        //console.log(data);
    });
    mydata.end();
}