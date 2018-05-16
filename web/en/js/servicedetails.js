// 
let productsContext = {
  products: [],
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
      // 时间
      var releaseTime = (product.createdAt.getMonth() + 1) + '/' + product.createdAt.getDate() + '/' +  product.createdAt.getFullYear();
     
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

      // 解析产品详情
      // 描述
      var indexDescription = details.indexOf('Product Description:');
      // 优势
      var indexAdvantage = details.indexOf('Product advantage:');
      // 应用
      var indexApplication = details.indexOf('Product application:');
      var description = '';      
      var advantage = '';      
      var application = '';

      if(indexDescription != -1 && indexAdvantage != -1){
        description = details.substring(indexDescription + 'Product Description:'.length, indexAdvantage);
      }
      if(indexAdvantage != -1 && indexApplication != -1){
        advantage = details.substring(indexAdvantage + 'Product advantage:'.length, indexApplication);
      }
      if(indexApplication != -1){
        application = details.substring(indexApplication + 'Product application:'.length);
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
        // 提交时间
        releaseTime,
        // 产品详情
        details,
        description,
        advantage,
        application,
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
    var source = $("#detail_item").html();
    var template = Handlebars.compile(source);    
    var html = template(productsContext);    
    $('.details').html(html);    


    parseData();
  }).catch(function(error) {
    console.log(error);
  }); 
}

queryData();

function parseData(){
  // 具体产品索引
  var index = window.location.href.split('#')[1]; 
  // 如果没有锚点，默认为第一个
  if(typeof index == 'undefined'){
    index = 0;
  }

  var indexDetailDom = $('.detail')[index];
  $(indexDetailDom).fadeIn();

  $('.detail_middle span').removeClass('introduce_example_active');
  $('.detail_introduce_btn').addClass('introduce_example_active');
  
  
  // 详情介绍&数据样例
  $('.detail_introduce_btn').on('click',function(e){
    e.stopPropagation();
    e.preventDefault(); 

    $('.detail_middle span').removeClass('introduce_example_active');
    $('.detail_introduce_btn').addClass('introduce_example_active');

    $('.detail_introduce').fadeIn();
    $('.detail_example').fadeOut();
  })

  $('.detail_example_btn').on('click', function(e){
    e.stopPropagation();
    e.preventDefault();

    $('.detail_middle span').removeClass('introduce_example_active');
    $('.detail_example_btn').addClass('introduce_example_active');

    $('.detail_introduce').fadeOut();
    $('.detail_example').fadeIn();
  })

  $('.learn-more').on('click', (e) => {    
    $('.details').css({
      'display': 'none',
    })
    $('.info_region').css({
      'display': 'block',
    });
  });
}

// 表单取消
$('.btn-close').on('click', (e) => {
  $('.details').css({
    'display': 'block',
  })
  $('.info_region').css({
    'display': 'none',
  });
})

// 表单判断
// 姓名
$(".custom-name").blur(function(){
  if($(".custom-name").val() == ''){
    $('.custom-name').css('border-color', 'red');
    $('.custom-name-text').fadeIn();
  }
});

$('.custom-name').focus(function(){
  $('.custom-name').css('border-color', '#cccccc');
  $('.custom-name-text').fadeOut();
})
// 公司名
$(".company-name").blur(function(){
  if($(".company-name").val() == ''){
    $('.company-name').css('border-color', 'red');
    $('.company-name-text').fadeIn();
  }
});

$('.company-name').focus(function(){
  $('.company-name').css('border-color', '#cccccc');
  $('.company-name-text').fadeOut();
})
// 公司地址
$(".company-address").blur(function(){
  if($(".company-address").val() == ''){
    $('.company-address').css('border-color', 'red');
    $('.company-address-text').fadeIn();
  }
});

$('.company-address').focus(function(){
  $('.company-address').css('border-color', '#cccccc');
  $('.company-address-text').fadeOut();
})
// 电话

$(".custom-tel").blur(function(){
  if($(".custom-tel").val() == ''){
    $('.custom-tel').css('border-color', 'red');
    $('.custom-tel-text').fadeIn();
  }else if($(".custom-tel").val() != '' &&  !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test($('.custom-tel').val()) &&  !(/^1[34578]\d{9}$/.test($('.custom-tel').val()))){
    $('.custom-tel-text').text('Please input your correct contact')
    $('.custom-tel').css('border-color', 'red');
    $('.custom-tel-text').fadeIn();
  }
});

$('.custom-tel').focus(function(){
  $('.custom-tel').css('border-color', '#cccccc');
  $('.custom-tel-text').text('Please input your contact')
  $('.custom-tel-text').fadeOut();
})
// 邮箱
$(".custom-email").blur(function(){
  if($(".custom-email").val() == ''){
    $('.custom-email').css('border-color', 'red');
    $('.custom-email-text').fadeIn();   
  }else if($(".custom-email").val() != '' && !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test($(".custom-email").val())){
    $('.custom-email').css('border-color', 'red');
    $('.custom-email-text').text('Please input your correct email');
    $('.custom-email-text').fadeIn();   
  }
});

$('.custom-email').focus(function(){
  $('.custom-email').css('border-color', '#cccccc');
  $('.custom-email-text').text('Please input your email');
  $('.custom-email-text').fadeOut();
}) 
// 需求
$(".custom-demand").blur(function(){
  if($(".custom-demand").val() == ''){
    $('.custom-demand').css('border-color', 'red');
  }
});
$('.custom-demand').focus(function(){
  $('.custom-demand').css('border-color', '#cccccc');
}) 


$('.tip-panel').on('scroll', function(e){
  e.stopPropagation();
  e.preventDefault();
  return false;
})
// 需求提交
$('.btn-submit').on('click', function(e){
  e.stopPropagation();
  e.preventDefault();
  
  var enDemand = AV.Object.extend('enDemand');
  
  if($('.custom-name').val() == ''){
    alert('Please input your name');
    return;
  }

  if($('.company-name').val() == ''){
    alert('Please input your company')
  }

  if( $('.company-address').val() == ''){
    alert('Please input your address');
    return;
  }
  if($('.custom-tel').val() == ''){
    alert('Please input your phone')
  }
  if($('.custom-email').val() == ''){
    alert('Please input your email');
    return;
  }
  if($('.custom-demand').val() == ''){
    alert('Please input your requirement');
    return;
  }
  // 姓名
  var customName = $('.custom-name').val();
  // 公司名称
  var companyName = $('.company-name').val();
  // 公司地址
  var companyAdress = $('.company-address').val();
  // 电话
  var customTel = $('.custom-tel').val();
  // 邮箱
  var customEmail = $('.custom-email').val();
  // 需求
  var customDemand = $('.custom-demand').val();

  var endemand = new enDemand();
  endemand.set('customName', customName);
  endemand.set('companyName', companyName);
  endemand.set('companyAdress', companyAdress);
  endemand.set('customTel', customTel);
  endemand.set('customEmail', customEmail);
  endemand.set('customDemand', customDemand);

  endemand.save().then(function(){
    // 重置表单
    $('.custom-name').val('');
    $('.company-name').val('');
    $('.company-address').val('');
    $('.custom-tel').val('');
    $('.custom-email').val('');
    $('.custom-demand').val('');
    
    layer.alert('send success');
    setTimeout(() => {
      $('.details').css({
        'display': 'block',
      });
      $('.info_region').css({
        'display': 'none',
      });
    }, 1000);
    
  }, function(err){    
    layer.alert('send failure');    
  })
});

