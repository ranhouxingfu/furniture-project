/**
 * Created by john on 2016/3/29.
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

//获取主打产品信息
exports.getMainInfo = function(req,resp){
    var mainProductId=req.query.id;
    var db = mysqlConnecton();
    db.connect();
    db.query("SELECT * FROM t_product t1 JOIN t_productimg t2 ON t1.pro_id=t2.p_productId WHERE t1.pro_id=?",[mainProductId],function(err,data){
        resp.render("mainProduct", {productId:data[0].pro_id,//产品id
                                    name: data[0].p_name,//产品名字
                                    nameWord: data[0].p_nameWord,//产品名字描述
                                    discribe: data[0].p_describe,//产品描述
                                    price:data[0].p_price,//产品价格
                                    imageBig:data[0].p_imagesfile,//大图
                                    imageLeftone:data[1].p_imagesfile,//图左1
                                    imageLefttwo:data[2].p_imagesfile,//图左2
                                    imageMid:data[3].p_imagesfile,//图中
                                    imageRight:data[4].p_imagesfile,//图右
                                    imageListone:data[5].p_imagesfile,//小图1
                                    imageListtwo:data[6].p_imagesfile,//小图2
                                    imageListthree:data[7].p_imagesfile,//小图3
                                    imageListfour:data[8].p_imagesfile//小图4
        });
    })
    db.end();
}


//获取产品详情信息
exports.getDetailsInfo = function(req,resp){
    var productId=req.query.id;
    var db = mysqlConnecton();
    db.connect();
    db.query("SELECT * FROM t_product t1 JOIN t_productimg t2 ON t1.pro_id=t2.p_productId WHERE t1.pro_id=?",[productId],function(err,data){
        resp.render("productDetails", {productId:data[0].pro_id,//产品id
                                    name: data[0].p_name,//产品名称
                                    code:data[0].p_code,//产品货号
                                    nameWord: data[0].p_nameWord,//产品名称描述
                                    discribe: data[0].p_describe,//产品描述
                                    price:data[0].p_price,//产品价格
                                    time:data[0].p_time,//制作周期
                                    place:data[0].p_place,//产品产地
                                    volume:data[0].p_volume, //产品体积
                                    size:data[0].p_size, //产品尺寸
                                    weight:data[0].p_weight, //产品重量
                                    material:data[0].p_material,//产品材质
                                    parts:data[0].p_parts,//产品配件
                                    color1:data[0].p_color1,//颜色1
                                    color2:data[0].p_color2,//颜色2
                                    mood1:data[0].p_mood1,//木色1
                                    mood2:data[0].p_mood2,//木色2
                                    imageBig:data[0].p_imagesfile,//大图
                                    detailSmall1:data[0].p_imagesfile,//小图1
                                    detailSmall2:data[9].p_imagesfile,//小图2
                                    detailSmall3:data[10].p_imagesfile,//小图3
                                    detailSmall4:data[11].p_imagesfile,//小图4
                                    detailBig1:data[12].p_imagesfile,//中间大图
                                    detailBig2:data[13].p_imagesfile,//底部大图
        });
    })
    db.end();
}

//获取第一页
exports.getFirst = function(req,resp){
    var db = mysqlConnecton();
    db.connect();
    db.query("select * from t_product",[], function (err,data) {
        resp.send(data);
    })
    db.end();
}
//创建分页
exports.getPage=function(req,resp){
    var db = mysqlConnecton();
    db.query("select count(*) as mycount from t_product",[],function(err,data){
        resp.send(data);
    })
    db.end();
}
//点击页码加载产品
exports.getImage=function(req,resp){
    var nowPageNum=parseInt(req.query.nowPageNum);
    var nowPage=parseInt(req.query.nowPage);
    //console.log(nowPage);
    var db=mysqlConnecton();
    db.connect();
    db.query("select * from t_product limit ?,?",[(nowPageNum-1)*nowPage,nowPage],function(err,data){
        resp.send(data);
    });
    db.end();
};

//产品分类筛选
exports.choose = function(req,resp){
    var style=req.query.styleChoose;//风格
    var kind=req.query.kindChoose;//类型
    var price=req.query.priceChoose;
    var pricefrom = parseInt(price.substring(0,price.length-2));
    var price1=0;
    var price2=0;
    var i=0;
    if(pricefrom=="5000"){
        i=1;
    }else{
        priceArray=price.split("-");
        price1=parseInt(priceArray[0]);//价格1
        price2=parseInt(priceArray[1]);//价格2
        i=2;
    }

    var db = mysqlConnecton();
    db.connect();
    var sql = "select * from t_product where 1=1 ";
    var array = [];
    if(style==""||style==undefined||style==null){
        style=null;
    }else{
        sql+="and p_style=? ";
        array.push(style);
    }
    if(kind==""||kind==undefined||kind==null){
        kind=null;
    }else{
        sql+="and p_kind=?";
        array.push(kind);
    }
    if(i==2){
        if(price==""||price==undefined||price==null){
            price1=null;
            price2=null;
        }else{
            sql+="and p_price between ? and ?";
            array.push(price1);
            array.push(price2);
        }
    }else if(i==1){
        if(price==""||price==undefined||price==null){
            pricefrom=null;
        }else{
            sql+="and p_price>?";
            array.push(pricefrom);
        }
    }

    db.query(sql,array,function(err,data){
        resp.send(data);
    })
    db.end();
};


//个人中心加载用户已存在的信息
exports.selectInfo=function(req,resp){
    if(req.session.name!=null&&req.session.name!=undefined) {
        var userName = req.session.name;
        var db = mysqlConnecton();
        db.connect();
        db.query("select * from t_user where userName=?", [userName], function (err, data) {
            resp.render("q-personalCenter", {
                username: data[0].username,//用户ID
                userName: data[0].NAME,//真实姓名
                userPhone: data[0].mobilephone,//电话
                userEmail: data[0].Email,//邮箱
            });
        })
        db.end();
    }else{
        resp.render("q-personalCenter",{
                                        userName:"",//真实姓名
                                        userPhone:"",//电话
                                        userEmail:""//邮箱
        });
    }

}


//点击结算时判断是否已登录,已登录则跳转订单支付页，未登录则出现登录弹窗
exports.isOnline=function(req,resp){
    req.session.address= "orderPayment.html";
    if(req.session.name!=null&&req.session.name!=undefined){
        resp.redirect("page/orderPayment.html");
    }else{
        resp.render("shoppingCart",{notOnline:1});
    }
}

//删除购物车表中的数据
exports.deleteFromCart=function(req,resp){
    var id= parseInt(req.query.id);
    var db = mysqlConnecton();
    db.connect();
    db.query("delete from t_cart where c_productId=?",[id],function(err,data){
        resp.redirect("page/shoppingCart.html");
    })

}


//首页点击购物车判断是否已登录，已登录跳转购物车页面，未登录则出现登录弹窗
exports.isOnlineCart=function(req,resp){
    //req.session.address= "orderPayment.html";
    //if(req.session.name!=null&&req.session.name!=undefined){
        resp.redirect("page/shoppingCart.html");
    //}else{
    //    resp.redirect("index.html");
    //}
}