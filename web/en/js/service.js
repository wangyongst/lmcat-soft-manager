(function(){  
  // 总数
  var productsContext = {
    products: []
  }
  // 选择的结果
  let selectContext = {
    products: []
  }
  // 查询数据库
  function queryData(){
    var APP_ID = 'OdA0zYQd63FL4XIXa0Kza5ex-MdYXbMMI';
    var APP_KEY = 'dhRKpG5H3ncGIPQOJUOdIU4D';
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });

    var query = new AV.Query('enProduct');
    query.include('owner');
    query.include('image');
    query.ascending('num_id');
    query.find().then(function (products) {
      products.forEach(function(product) {
        // 标题 
        var productTitle = product.get('title');
        var objectId = product.get('objectid');
        // 编号
        var num_id = product.get('num_id');
        // 一级分类
        var classOne = product.get('category');
        // 二级分类
        var classTwo = product.get('cate_a');
        // 描述
        var productDescription = product.get('description');       
        // 产品图片
        var productImage = product.get('image');
        var productImageUrl;
        if (productImage) {
          productImageUrl = productImage.get('url');
        } else {
          productImageUrl = 'favicon.ico';
        }
        // 详情介绍
        var details = product.get('details');
        // 详情图片个数
        var detailsImgArrLength = product.get('detailsImgArrLength');
        // 获取图片详情
        var detailsImgArr = [];
        var detailsImgArrUrl = [];

        for(var i = 0; i < detailsImgArrLength; i++){
          detailsImgArr.push(product.get('detailsImgArr' + i));
          detailsImgArrUrl.push(product.get('detailsImgArr' + i).get('url'));
        }
        // 产品详情图片描述
        var detailsTextArr = product.get('detailsTextArr');
        // 数据样例图片个数
        var exampleImgArrLength =product.get('exampleImgArrLength');
        var exampleImgArr = [];
        var exampleImageUrl = [];
        for(var i = 0; i < exampleImgArrLength; i++){
          if(product.get('exampleImgArr' + i)){
            exampleImgArr.push(product.get('exampleImgArr' + i));
            exampleImageUrl.push(product.get('exampleImgArr' + i).get('url'))  
          }              
        }
        // 数据样例图片描述
        var exampleTextArr = product.get('exampleTextArr');
        productsContext.products.push({
          num_id,
          classOne,
          classTwo,
          // 产品图片
          productImageUrl,
          // 产品名称
          productTitle,        
          // 产品描述
          productDescription,                 
          // 产品详情
          details,
          // 产品详情图片
          detailsImgArrUrl,
          // 产品详情描述
          detailsTextArr,
          // 数据样例详情
          exampleImageUrl,
          // 数据样例详情描述
          exampleTextArr
        })
      });    
      // use handlebars to update html
      var source = $("#en-products-list").html();
      var template = Handlebars.compile(source);
      var html = template(productsContext);

      $('.service-productions ul').html(html);    
    }).catch(function(error) {
      console.log(error);
    }); 
  }

  queryData();
  // 产品页
  $('.service-productions ul').on('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    let index = 0;
    if(e.target.tagName == 'BUTTON'){      
      index = $('.service-productions ul li').index($(e.target).parent().parent());      
      window.location.href = 'servicedetails.html#' + index;
    }    
  })

  $('.search_text').on('click', (e) => {
    e.stopPropagation();
    e.preventDefault();

    let keyWord = $.trim($('.search_input').val()).toLowerCase();
    if(keyWord){
      productsContext.products.forEach((product, i) => {
        if(product.productTitle.toLowerCase().indexOf(keyWord) != -1){
          selectContext.products.push(product);
        }
      })
      if(selectContext.products.length != 0){
        var source = $("#en-products-list").html();
        var template = Handlebars.compile(source);
        var html = template(selectContext);

        $('.service-productions ul').html(html);    
      }
    }else{
      var source = $("#en-products-list").html();
      var template = Handlebars.compile(source);
      var html = template(productsContext);

      $('.service-productions ul').html(html);    
    }
    
  });
}())


