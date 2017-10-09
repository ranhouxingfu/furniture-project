/**
 * Created by john on 2016/3/31.
 */
var mysql = require("./../node_modules/mysql");
//创建数据库连接公用方法
function mysqlConnecton(){
    var mydb = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"xiangjiaProject"
    })
    return mydb;
}

//产品加入购物车,将接受的数据包括用户id,产品id,颜色，木色，数量写入购物车表
exports.addToCart = function(req,resp){
    //var userId = req.body.userId//用户id
    var productId = req.body.productId;//产品id
    var color=req.body.color;//产品颜色
    var mood=req.body.mood;//产品木色
    var number=req.body.number;//产品数量
    var userNow;//当前登录的账号
    if(req.session.name!=null&&req.session.name!=undefined){
        userNow=req.session.name;
    }
    var db = mysqlConnecton();
    db.connect();
    //db.query("select * from t_cart where c_productId=?",[productId],function(err,data){
        //if(data[0].c_number>0) {
        //    var lnumber = data[0].c_number + parseInt(number);
        //    db.query("update t_cart set c_number=? where c_productId=?",[lnumber,1],function(err,data) {
        //        resp.redirect("productDetails.do?id=" + productId);
        //    })
        //}
            db.query("insert into t_cart(c_userId,c_productId,c_color,c_mood,c_number) values (?,?,?,?,?)",[userNow,productId,color,mood,number],function(err,data){
                resp.redirect("productDetails.do?id="+productId);
            })
    //})
    db.end();
}



