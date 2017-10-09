/**
 * Created by john on 2016/3/29.
 */
var mysql = require("./../node_modules/mysql");
//�������ݿ����ӹ��÷���
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

//��ȡ�����Ʒ��Ϣ
exports.getMainInfo = function(req,resp){
    var mainProductId=req.query.id;
    var db = mysqlConnecton();
    db.connect();
    db.query("SELECT * FROM t_product t1 JOIN t_productimg t2 ON t1.pro_id=t2.p_productId WHERE t1.pro_id=?",[mainProductId],function(err,data){
        resp.render("mainProduct", {productId:data[0].pro_id,//��Ʒid
                                    name: data[0].p_name,//��Ʒ����
                                    nameWord: data[0].p_nameWord,//��Ʒ��������
                                    discribe: data[0].p_describe,//��Ʒ����
                                    price:data[0].p_price,//��Ʒ�۸�
                                    imageBig:data[0].p_imagesfile,//��ͼ
                                    imageLeftone:data[1].p_imagesfile,//ͼ��1
                                    imageLefttwo:data[2].p_imagesfile,//ͼ��2
                                    imageMid:data[3].p_imagesfile,//ͼ��
                                    imageRight:data[4].p_imagesfile,//ͼ��
                                    imageListone:data[5].p_imagesfile,//Сͼ1
                                    imageListtwo:data[6].p_imagesfile,//Сͼ2
                                    imageListthree:data[7].p_imagesfile,//Сͼ3
                                    imageListfour:data[8].p_imagesfile//Сͼ4
        });
    })
    db.end();
}


//��ȡ��Ʒ������Ϣ
exports.getDetailsInfo = function(req,resp){
    var productId=req.query.id;
    var db = mysqlConnecton();
    db.connect();
    db.query("SELECT * FROM t_product t1 JOIN t_productimg t2 ON t1.pro_id=t2.p_productId WHERE t1.pro_id=?",[productId],function(err,data){
        resp.render("productDetails", {productId:data[0].pro_id,//��Ʒid
                                    name: data[0].p_name,//��Ʒ����
                                    code:data[0].p_code,//��Ʒ����
                                    nameWord: data[0].p_nameWord,//��Ʒ��������
                                    discribe: data[0].p_describe,//��Ʒ����
                                    price:data[0].p_price,//��Ʒ�۸�
                                    time:data[0].p_time,//��������
                                    place:data[0].p_place,//��Ʒ����
                                    volume:data[0].p_volume, //��Ʒ���
                                    size:data[0].p_size, //��Ʒ�ߴ�
                                    weight:data[0].p_weight, //��Ʒ����
                                    material:data[0].p_material,//��Ʒ����
                                    parts:data[0].p_parts,//��Ʒ���
                                    color1:data[0].p_color1,//��ɫ1
                                    color2:data[0].p_color2,//��ɫ2
                                    mood1:data[0].p_mood1,//ľɫ1
                                    mood2:data[0].p_mood2,//ľɫ2
                                    imageBig:data[0].p_imagesfile,//��ͼ
                                    detailSmall1:data[0].p_imagesfile,//Сͼ1
                                    detailSmall2:data[9].p_imagesfile,//Сͼ2
                                    detailSmall3:data[10].p_imagesfile,//Сͼ3
                                    detailSmall4:data[11].p_imagesfile,//Сͼ4
                                    detailBig1:data[12].p_imagesfile,//�м��ͼ
                                    detailBig2:data[13].p_imagesfile,//�ײ���ͼ
        });
    })
    db.end();
}

//��ȡ��һҳ
exports.getFirst = function(req,resp){
    var db = mysqlConnecton();
    db.connect();
    db.query("select * from t_product",[], function (err,data) {
        resp.send(data);
    })
    db.end();
}
//������ҳ
exports.getPage=function(req,resp){
    var db = mysqlConnecton();
    db.query("select count(*) as mycount from t_product",[],function(err,data){
        resp.send(data);
    })
    db.end();
}
//���ҳ����ز�Ʒ
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

//��Ʒ����ɸѡ
exports.choose = function(req,resp){
    var style=req.query.styleChoose;//���
    var kind=req.query.kindChoose;//����
    var price=req.query.priceChoose;
    var pricefrom = parseInt(price.substring(0,price.length-2));
    var price1=0;
    var price2=0;
    var i=0;
    if(pricefrom=="5000"){
        i=1;
    }else{
        priceArray=price.split("-");
        price1=parseInt(priceArray[0]);//�۸�1
        price2=parseInt(priceArray[1]);//�۸�2
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


//�������ļ����û��Ѵ��ڵ���Ϣ
exports.selectInfo=function(req,resp){
    if(req.session.name!=null&&req.session.name!=undefined) {
        var userName = req.session.name;
        var db = mysqlConnecton();
        db.connect();
        db.query("select * from t_user where userName=?", [userName], function (err, data) {
            resp.render("q-personalCenter", {
                username: data[0].username,//�û�ID
                userName: data[0].NAME,//��ʵ����
                userPhone: data[0].mobilephone,//�绰
                userEmail: data[0].Email,//����
            });
        })
        db.end();
    }else{
        resp.render("q-personalCenter",{
                                        userName:"",//��ʵ����
                                        userPhone:"",//�绰
                                        userEmail:""//����
        });
    }

}


//�������ʱ�ж��Ƿ��ѵ�¼,�ѵ�¼����ת����֧��ҳ��δ��¼����ֵ�¼����
exports.isOnline=function(req,resp){
    req.session.address= "orderPayment.html";
    if(req.session.name!=null&&req.session.name!=undefined){
        resp.redirect("page/orderPayment.html");
    }else{
        resp.render("shoppingCart",{notOnline:1});
    }
}

//ɾ�����ﳵ���е�����
exports.deleteFromCart=function(req,resp){
    var id= parseInt(req.query.id);
    var db = mysqlConnecton();
    db.connect();
    db.query("delete from t_cart where c_productId=?",[id],function(err,data){
        resp.redirect("page/shoppingCart.html");
    })

}


//��ҳ������ﳵ�ж��Ƿ��ѵ�¼���ѵ�¼��ת���ﳵҳ�棬δ��¼����ֵ�¼����
exports.isOnlineCart=function(req,resp){
    //req.session.address= "orderPayment.html";
    //if(req.session.name!=null&&req.session.name!=undefined){
        resp.redirect("page/shoppingCart.html");
    //}else{
    //    resp.redirect("index.html");
    //}
}