window.onload = function () {
    myajax();
    toSuccess();
    var notOnline = document.getElementById("notOnline").value;
    if(notOnline==1){
        myLoginOpen();
    }
}
    var firstNav = document.getElementById("first-nav");
    var secondNav = document.getElementById("second-nav");
    var cart = document.getElementById("cart");
    var goPay=document.getElementsByClassName("z-go")[0];//用来触发ajax更新数据库的数据
    //    导航
    //var a=1;
//var numArray=[];
//var num2Array=[];
    function nav() {
        if (document.body.scrollTop > 0) {
            cart.className = "cart cartChange";
            firstNav.style.display = "none";
            secondNav.style.display = "block";
        } else if (document.body.scrollTop == 0) {
            cart.className = "cart";
            firstNav.style.display = "block";
            secondNav.style.display = "none";
        }
    }

    setInterval(nav, 50);
//    /*=======ajax, 动态获取数据==========*/
  function myajax() {
      var cartTable = document.getElementsByClassName("z-cartTable");
      var id = "1";//获取数据库图片路径
      var z_imgSrc = "../images/";
      /*=====第一步：获取ajax对象======*/
      if (window.XMLHttpRequest) {
          var httprequest = new XMLHttpRequest();//dom
      } else {
          var httprequest = new ActiveXObject("Microsoft.XMLHTTP");//ie
      }
      httprequest.open("get", "/jiazai.do?name=" + id, true);
      httprequest.onreadystatechange = function () {
          var zhuangtai = httprequest.status;
          var zhuangtai1 = httprequest.readyState;//状态
          var respText = httprequest.responseText;//响应文本
          if (zhuangtai == 200 && zhuangtai1 == 4) {
              var resptext = JSON.parse(respText);//转换成JSON格式
              for (var i = 0; i < resptext.length; i++) {
                  var productId = resptext[i].c_productId//产品id
                  var img = resptext[i].p_adverImg;//产品路径
                  var price = resptext[i].p_price;//产品价格
                  var name = resptext[i].p_name;//产品名称
                  var Number=resptext[i].c_number;//产品数量
                  var color=resptext[i].c_color;//购物车中的产品颜色
                  var mood=resptext[i].c_mood;//购物车中的产品木色
                  cartTable[0].innerHTML+= '<tr class="z-tr"><td class="z-checkbox">'+'<input class="z-check" type="checkbox"/>' + '<td class="z-goods"><div class="z-imgDiv"><img class="z-getImg" src="' + z_imgSrc + img + '"></div><div class="z-textDiv"><p>' + name + '</p><p class="z-kids">颜色:</p><div class="z-change">'+color+'</div><br><p class="z-kids">木色:</p><div class="z-chang">'+mood+'</div></div></td><td class="z-price"><span class="z-subprice">' + price + '</span></td><td class="z-count"><div class="z-num"><span class="z-reduce">-</span><input class="z-count-input" type="text" value="'+Number+'"/><span class="z-add">+</span></div><span class="z-collection">收藏</span></td><td class="z-sub"><span class="z-subtotal">' + price*Number + '</span><a class="z-delete" href="/deleteFromCart.do?id='+productId+'">删除</a></td>'
                  '</tr>'
              }
          }
          /*=====获取所有的class属性======*/
          if (!document.getElementsByClassName)
              document.getElementsByClassName = function (cls) {
                  var ret = [];
                  var els = document.getElementsByTagName('*');
                  for (var i = 0, len = els.length; i < len; i++) {
                      if (els[i].className === cls
                          || els[i].className.indexOf(cls) >= 0
                          || els[i].className.indexOf(' ' + cls) >= 0
                          || els[i].className.indexOf(' ' + cls + ' ') >= 0) {
                          ret.push(els[i]);
                      }
                  }
                  return ret;
              }
          var cartTr = cartTable[0].getElementsByTagName("tr");//获取行
          console.log(cartTr.length)
          var check = document.getElementsByClassName("z-check");//选择每一行
          var deleteAll = document.getElementsByClassName(" z-deleteAll")[0];//全部删除
          var priceTotal = document.getElementsByClassName("z-priceTotal");//总价
          var selectedTotal = document.getElementsByClassName("z-selectedTotal");//总件数
          var checkall = document.getElementsByClassName("z-check-all");//全选按钮
          var myfoot = document.getElementsByClassName("z-foot");
          var colorchange=document.getElementsByClassName("z-change");//获取颜色div节点
          var zhuangtai = false;//收藏按钮的状态
              // 计算单行价格
              function getSubtotal(tr) {
                  var cells = tr.cells;
                  var price = cells[2]; //单价表格
                  var subprice = price.getElementsByTagName("span")[0];//单价
                  var subtotal = tr.getElementsByClassName("z-subtotal");//小计
                  var countInput = tr.getElementsByTagName('input')[1]; //数目input
                  var span = tr.getElementsByTagName('span')[1]; //-号
                  //写入HTML
                  subtotal[0].innerHTML = parseInt(countInput.value) * parseInt(subprice.innerHTML);
              }

              // 更新总数和总价格，已选浮层
              function getTotal() {
                  var selected = 0, price = 0, html = '';
                  for (var i = 1; i < cartTr.length; i++) {
                      if (cartTr[i].getElementsByTagName('input')[0].checked) {
                          cartTr[i].className = 'on';
                          var num = cartTr[i].getElementsByClassName("z-count-input");
                          selected += parseInt(num[0].value);
                          //console.log(selected);
                          price += parseInt(cartTr[i].getElementsByClassName('z-subtotal')[0].innerHTML);
                      }
                      else {
                          cartTr[i].className = 'z-tr';
                      }
                  }
                  selectedTotal[0].innerHTML = selected; // 已选数目
                  priceTotal[0].innerHTML = price; // 总价
                  if (selected == 0) {
                      myfoot.className = 'z-foot';
                  }
              }

              // 点击选择框
              for (var i = 0; i < check.length; i++) {
                  check[i].onclick = function () {
                      if (this.className.indexOf('z-check-all') >= 0) { //如果是全选，则把所有的选择框选中
                          for (var j = 0; j < check.length; j++) {
                              check[j].checked = true;
                          }
                      } else if (!this.checked) { //只要有一个未勾选，则取消全选框的选中状态
                          for (var i = 0; i < checkall.length; i++) {
                              checkall[i].checked = false;
                          }
                      }
                      getTotal();//选完更新总计
                  }
              }
              //为每行元素添加事件
              for (var i = 1; i < cartTr.length; i++) {
                  //将点击事件绑定到tr元素
                  cartTr[i].onclick = function (e) {
                      var e = e || window.event;
                      var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
                      var cls = el.className; //触发元素的class
                      //通过判断触发元素的class确定用户点击了哪个元素
                      switch (cls) {
                          case 'z-add'://点击了加号
                              var num = this.getElementsByClassName("z-count-input");
                              num[0].setAttribute("value", parseInt(num[0].value) + 1);
                              getSubtotal(this);
                              break;
                          case 'z-reduce'://点击减号
                              var num1 = this.getElementsByClassName("z-count-input");
                              if (parseInt(num1[0].value) > 1) {
                                  num1[0].setAttribute("value", parseInt(num1[0].value) - 1);
                                  getSubtotal(this);
                              }
                              break;
                          case 'z-delete': //点击了删除
                              var conf = confirm('确定删除此商品吗？');
                              if (conf) {
                                  this.parentNode.removeChild(this);
                              }
                              break;
                          case 'z-collection':
                              if (zhuangtai == false) {
                                  this.getElementsByClassName("z-collection")[0].style.background = 'pink';
                                  zhuangtai = true;
                              } else {
                                  this.getElementsByClassName("z-collection")[0].style.background = '#F0F0F0';
                                  zhuangtai = false;
                              }
                              break;
                      }
                      getTotal();
                  }
                  // 给数目输入框绑定keyup事件
                  cartTr[i].getElementsByTagName('input')[1].onkeyup = function () {
                      var val = parseInt(this.value);
                      var mynum=this.parentNode.getElementsByClassName("z-count-input");
                      //console.log(val);
                      if(isNaN(val) || val <=0){
                          val = 1;
                      }
                      if(this.value != val){
                          this.value = val;
                      }
                      //console.log(this.parentNode.parentNode.parentNode);
                      mynum[0].setAttribute("value",parseInt(mynum[0].value));
                      getSubtotal(this.parentNode.parentNode.parentNode);//更新小计
                      getTotal();//更新总数
                  }

                  // 点击全部删除
                  deleteAll.onclick = function () {
                      if (selectedTotal.innerHTML != 0) {
                          var conf = confirm('确定删除所选商品吗？');
                          if (conf) {
                              for (var i = 0; i < cartTr.length; i++) {
                                  //console.log(i)
                                  // 如果被选中，就删除相应的行
                                  if (cartTr[i].getElementsByTagName('input')[0].checked) {
                                      cartTr[i].parentNode.removeChild(cartTr[i]);//删除节点
                                      i--;//回退下标位置
                                  }
                              }
                          }
                      } else {
                          alert('请选择商品！');
                      }
                      getTotal(); //更新总数
                  }
                  checkall[0].checked=true;
                  checkall[0].onclick();
              }
          }
          httprequest.send(null);
      }
    goPay.onclick=function(){
        var tr=document.getElementsByClassName("on");//获取行
        var trXuhao=tr.length;
        var numArrary="";//字符串拼接
        //console.log(trXuhao);
        var priceTotalNode=document.getElementsByClassName("z-priceTotal")[0];//获取购物车总价的节点
        var priceTotal=priceTotalNode.innerHTML;//获取里面的值
        //alert(priceTotal);
        for(var i=0;i<trXuhao;i++){
            var num = tr[i].getElementsByClassName("z-count-input")[0].value;
            numArrary=numArrary+num;//将每行的value值通过字符串拼接传到dao层
            console.log(numArrary);
        }
        /*=====第一步：获取ajax对象======*/
        if (window.XMLHttpRequest) {
            var httprequest = new XMLHttpRequest();//dom
        } else {
            var httprequest = new ActiveXObject("Microsoft.XMLHTTP");//ie
        }
        httprequest.open("get", "/update.do?name="+numArrary+"&trXuhao="+ trXuhao+"&priceTotal="+priceTotal, true);
        httprequest.onreadystatechange = function () {
            var zhuangtai = httprequest.status;
            var zhuangtai1 = httprequest.readyState;//状态
            var respText = httprequest.responseText;//响应文本
            if (zhuangtai == 200 && zhuangtai1 == 4) {
                var resptext=JSON.parse(respText);//转换成json对象
            }
        }
        httprequest.send(null);
    }


