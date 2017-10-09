/**
 * Created by zhongyuan on 2016/3/28.
 */
var mysql=require("./../node_modules/mysql");//加载数据库
//console.log(55555)
var mydb
function mydatabase(){
    mydb=mysql.createConnection({//创建数据库连接
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"xiangjiaProject"
    })
    mydb.connect();
}
exports.goods=function(req,resp){//从产品表和购物车表读取数据
    var id=req.query.name;
    var userNow;//当前登录的账号
    if(req.session.name!=null&&req.session.name!=undefined){
        userNow=req.session.name;
    }
    mydatabase();
    mydb.query("select * from (t_product join t_cart on pro_id=c_productId) where c_userId=?",[userNow],function(err,data){
        resp.send(data);
    })
    mydb.end();
}
exports.updateGoods=function(req,resp){//购物车更新数据库
    var num=req.query.name;
    var id=parseInt(req.query.trXuhao);
    var priceTotal=req.query.priceTotal;
    //console.log(priceTotal);
    req.session.totalPrice=priceTotal;
    console.log(req.session.totalPrice);
    resp.render("oderPayment",{priceTotal:priceTotal});
    var numarray=[];
    numarray[0]="";
    mydatabase();
    for(var i=0;i<id;i++){
        var a=num.substr(i,1);
        numarray.push(a);
        //console.log(a)
    }
    for(var j=1;j<=id;j++){
        mydb.query("update t_cart set c_number=? where c_productId=?", [parseInt(numarray[j]), j], function (err, data) {
        });
    }
    //mydb.query("insert into p_listing(p_priceTotal) values(?)",[priceTotal],function(err,data){
    //    //console.log(data);
    //});
    //mydb.end();
}
exports.address=function(req,resp){
    var payname=req.query.name;
    var telNum=req.query.number;
    var location=req.query.location;
    var payimgSrc=req.query.payimgSrc;
    var delivery=req.query.delivery;
    mydatabase();
    mydb.query("insert into p_listing(p_username,p_telnum ,p_location,p_kuaidi,p_payimgSrc) values(?,?,?,?,?)",[payname,telNum,location,delivery,payimgSrc],function(err,data){
    });
    mydb.end();
}
exports.getListing=function(req,resp){
    var listname=req.query.name;
    mydatabase();
    mydb.query("select * from (t_product join t_cart on pro_id=c_productId)",[],function(err,data){
        resp.send(data);
    });
    mydb.end();
}
exports.getTotal=function(req,resp){
    var y=req.query.y;
    //console.log(y);
    //console.log(req.session.totalPrice);
    if(y==1){

        if(req.session.totalPrice!=null&&req.session.totalPrice!=undefined){
            resp.send(req.session.totalPrice);
            //console.log(req.session.totalPrice);
        }
    }
}