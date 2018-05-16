// handlebars context
// 查询数据库结果


// 条件搜索结果
var searchContext = {
  products: []
}

// 分级
var classifyContext = {
  categorys: []
} 

// 查询数据库
function queryData(){  
  $.get('http://api.open.longmaosoft.com:3000/leancloud/Product', function(products){
    products.forEach((product) =>{
      // 产品名称 
      var productTitle = product.title
      // 产品标签
      var productTags = product.tags;
      // 产品描述
      var productDescription = product.description;     
      // 产品图片描述
      var productImage = product.image;
      var productImageUrl;      
      
      // 一级分类
      var category = product.category;
      // 二级分类
      var cate_a = product.cate_a;

      if (productImage) {
        productImageUrl = productImage.url;
      } else {
        productImageUrl = 'favicon.ico';
      }
      
      // 产品详情
      var details = product.details;
      // 详情图片个数
      var detailsImgArrLength = product.detailsImgArrLength;
      // 获取图片详情
      var detailsImgArr = [];
      var detailsImgArrUrl = [];

      for(var i = 0; i < detailsImgArrLength; i++){
        if(product['detailsImgArr' + i]){
          detailsImgArr.push(product['detailsImgArr' + i]);
          detailsImgArrUrl.push(product['detailsImgArr' + i].url);  
        }        
      }

      // 产品详情图片描述
      var detailsTextArr = product.detailsTextArr;

      var detailsAll = []
      for(var i = 0; i < detailsImgArrUrl.length; i++){
        var obj = {};
        obj.detailsImgArrUrl = detailsImgArrUrl[i];
        obj.detailsTextArr = detailsTextArr[i];
        detailsAll.push(obj);
      }

      // 数据样例图片个数
      var exampleImgArrLength =product.exampleImgArrLength;
      var exampleImgArr = [];
      var exampleImageUrl = [];
          
      for(var i = 0; i < exampleImgArrLength; i++){
        if(product['exampleImgArr' + i]){
          exampleImgArr.push(product['exampleImgArr' + i]);                  
          if(product['exampleImgArr' + i].url){
            exampleImageUrl.push(product['exampleImgArr' + i].url)  
          }  
        }
        
      }
      // 数据样例图片描述
      var exampleTextArr = product.exampleTextArr;  
      var exampleAll = []
      for(var i = 0; i < exampleImageUrl.length; i++){
        var obj = {}
        obj.exampleImageUrl = exampleImageUrl[i];
        obj.exampleTextArr = exampleTextArr[i];
        exampleAll.push(obj);
      };

      context.products.push({
        // 产品图片
        productImageUrl,
        // 产品名称
        productTitle,
        // 产品标签
        productTags,
        // 产品描述
        productDescription,
        // 一级分类
        category,
        // 二级分类
        cate_a
      });
    });

    // 一级分类
    context.products.forEach((product, index) => {      
      if(product.category){
        var categoryArr = product.category.split(',');  
        categoryArr.forEach((item, index) => {          
          if(!inArr(item, classifyContext.categorys)){
            console.log(item)
            classifyContext.categorys.push({
              type: item,
              properties: []
            })
          }
        })
      }
    })
    
    function inArr(item, categorys){
      for(var i = 0; i < categorys.length; i++){
        if(categorys[i].type == item){
          return true;
        }
      }      
    }

    // 二级分类
    // 产品
    for(var i = 0; i < context.products.length; i++){
      if(context.products[i].category){
        // 每个产品一级分类个数
        var classOneArr = context.products[i].category.split(',');
        
        for(var j = 0; j < classOneArr.length; j++){
          for(var k = 0; k < classifyContext.categorys.length; k++){
            // 如果产品中的一级分类与classifyContext.categorys[k].type相等
            if(classOneArr[j] == classifyContext.categorys[k].type){
              // 记录产品的二级分类
              var cateAArr = context.products[i].cate_a.split(',');
              for(var l = 0; l < cateAArr.length; l++){
                // 二级分类和已有的作对比
                if(!isInArr(cateAArr[l], classifyContext.categorys[k].properties)){
                  classifyContext.categorys[k].properties.push({
                    type: cateAArr[l]
                  })
                }
              }              
            }
          }
        }

      }
    }

    function isInArr(classTwo, properties){      
      for(var i = 0; i < properties.length; i++){
        if(properties[i].type == classTwo){
          return true;
        }
      }
    }

    jsoncontext = JSON.stringify(context);
    classList = JSON.stringify(classifyContext);
    sessionStorage.setItem('detailsContextList', jsoncontext);
    sessionStorage.setItem('detailsClassList', classList); 

    parseData();
  });
}

var context = JSON.parse(sessionStorage.getItem('detailsContextList'));
var classList = JSON.parse(sessionStorage.getItem('detailsClassList'));

if(context && context.products && context.products.length != 0){
    $('.loading').css('display', 'none');
    console.log(context);
    var result = [];
    for(var i=0,len=context.products.length;i<len;i+=10){
       result.push(context.products.slice(i,i+10));
    }
    var pageNum = result.length;
    var pageContext = {};
    pageContext.products = result[0];

    var source = $("#products-list").html();
    var template = Handlebars.compile(source);
    
    var html = template(pageContext);
    $('.service_wrap').html(html);
      
    var source2 = $("#classify-list").html();
    var template2 = Handlebars.compile(source2);
    var html2 = template2(classList);
    $('#classify-wrap').html(html2);

    Page({
      num:pageNum,          //页码数
      startnum:1,       //指定页码
      elem:$('#servicePagination'),   //指定的元素
      callback:function(n){ //回调函数
        
        pageContext.products = result[n - 1];
        var html = template(pageContext);
        $('.service_wrap').html(html);
        $('.pagination li').on('click', function(e){
          window.scrollTo(0,0);
        })
      }
    });  

    // 产品页
    $('.service_wrap').on('click', '.service_item_wrap',function(e){
      e.stopPropagation();
      e.preventDefault();
      var len = context.products.length;
      var index;
      for(var i = 0; i < len; i++){
        if(context.products[i].productTitle == $(this).find('h3').text()){
          index = i;
         ;
        }
      }
      console.log(index)
      var indexDetailDom = $('.detail')[index];
      window.location.href = 'servicedetails.html#' + index;
    })   
}else {
  context = {
    products: [],
    details: []
  };  
  queryData();
}
function parseData(){
  $('.loading').css('display', 'none'); 
    
    var result = [];
    for(var i=0,len=context.products.length;i<len;i+=10){
       result.push(context.products.slice(i,i+10));
    }
    var pageNum = result.length;
    var pageContext = {};
    pageContext.products = result[0];

    var source = $("#products-list").html();
    var template = Handlebars.compile(source);
    
    var html = template(pageContext);
    $('.service_wrap').html(html);
  
    var source2 = $("#classify-list").html();
    var template2 = Handlebars.compile(source2);
    var html2 = template2(classifyContext);
    $('#classify-wrap').html(html2);

    $(".properties").on('click', function(e){
      if(e.target.tagName === 'LI'){
        var text = $(e.target).text();
        $(".properties li").css({
          'color': 'rgba(0, 0, 0, 1)'
        })
        $(e.target).css({
          'color': 'red'
        })
      
        searchContext.products = [];
        for(var i = 0; i < context.products.length; i++){
          if(context.products[i].cate_a){
            var classTwo = context.products[i].cate_a.split(',');
            for(var j = 0; j < classTwo.length; j++){
              if(classTwo[j] === text){
                searchContext.products.push(context.products[i]);
              }
            }  
          }
        }

        // 如果有搜索结果
        if(searchContext.products.length){      
          var result = [];
          for(var i=0,len=searchContext.products.length;i<len;i+=10){
             result.push(searchContext.products.slice(i,i+10));
          }
          var pageNum = result.length;
          var pageContext = {};
          pageContext.products = result[0];

          var source = $("#products-list").html();
          var template = Handlebars.compile(source);
          
          var html = template(pageContext);
          $('.service_wrap').html(html);
          
          Page({
            num:pageNum,          //页码数
            startnum:1,       //指定页码
            elem:$('#servicePagination'),   //指定的元素
            callback:function(n){ //回调函数
              
              pageContext.products = result[n - 1];
              var html = template(pageContext);
              $('.service_wrap').html(html);
              $('.pagination li').on('click', function(e){
                window.scrollTo(0,0);
              })
            }
          });  
        }else{
          var html = "<div style='width: 1200px; margin: 0 auto; height: 50px; text-align:center; font-size: 20px'>抱歉，暂无  <span style='color: #FF5300;'>"+ keyword +"</span>  相关内容</div>"
          $('.service_wrap').html(html);
        }    
      }
    })

    Page({
      num:pageNum,          //页码数
      startnum:1,       //指定页码
      elem:$('#servicePagination'),   //指定的元素
      callback:function(n){ //回调函数
        
        pageContext.products = result[n - 1];
        var html = template(pageContext);
        $('.service_wrap').html(html);
        $('.pagination li').on('click', function(e){
          window.scrollTo(0,0);
        })
      }
    });
    
    // 产品页
    $('.service_wrap').on('click', '.service_item_wrap',function(e){
      e.stopPropagation();
      e.preventDefault();
      var len = context.products.length;
      var index;
      for(var i = 0; i < len; i++){
        if(context.products[i].productTitle == $(this).find('h3').text()){
          index = i;
        }
      }
      var indexDetailDom = $('.detail')[index];
      window.location.href = 'servicedetails.html#' + index;
    })
}
// 搜索操作
$('.search_input').on('keyup', function(e){
  e.stopPropagation();
  e.preventDefault();
  $(".properties li").css({
    'color': 'rgba(0, 0, 0, 1)'
  })
  if(e.type == 'keyup' && e.keyCode == '13'){
    searchResult()
  }
})
$('.search_input').on('input', function(e){
  searchResult();
})
$(".search_text").on('click', function(e){
  searchResult();
})

$(".properties").on('click', function(e){
  if(e.target.tagName === 'LI'){
    var text = $(e.target).text();
    $(".properties li").css({
      'color': 'rgba(0, 0, 0, 1)'
    })
    $(e.target).css({
      'color': 'red'
    })

  
    searchContext.products = [];

    for(var i = 0; i < context.products.length; i++){
      if(context.products[i].cate_a){
        var classTwo = context.products[i].cate_a.split(',');
        for(var j = 0; j < classTwo.length; j++){
          if(classTwo[j] === text){
            searchContext.products.push(context.products[i]);
          }
        }  
      }
    }


    // 如果有搜索结果
    if(searchContext.products.length){      
      var result = [];
      for(var i=0,len=searchContext.products.length;i<len;i+=10){
         result.push(searchContext.products.slice(i,i+10));
      }
      var pageNum = result.length;
      var pageContext = {};
      pageContext.products = result[0];

      var source = $("#products-list").html();
      var template = Handlebars.compile(source);
      
      var html = template(pageContext);
      $('.service_wrap').html(html);
      
      Page({
        num:pageNum,          //页码数
        startnum:1,       //指定页码
        elem:$('#servicePagination'),   //指定的元素
        callback:function(n){ //回调函数
          
          pageContext.products = result[n - 1];
          var html = template(pageContext);
          $('.service_wrap').html(html);
          $('.pagination li').on('click', function(e){
            window.scrollTo(0,0);
          })
        }
      });  
    }else{
      var html = "<div style='width: 1200px; margin: 0 auto; height: 50px; text-align:center; font-size: 20px'>抱歉，暂无  <span style='color: #FF5300;'>"+ keyword +"</span>  相关内容</div>"
      $('.service_wrap').html(html);
    }

    
  }
})

function searchResult(){
  var keyword = $.trim($('.search_input').val());
  if(keyword != ''){
    var len = context.products.length;
    searchContext.products = [];

    for(var i = 0; i < len; i++){
      var wordIndex = context.products[i].productTitle.indexOf(keyword);
      if(wordIndex != -1){
        searchContext.products.push(context.products[i]);
      }
    }

    // 如果有搜索结果
    if(searchContext.products.length){
      
      var result = [];
      for(var i=0,len=searchContext.products.length;i<len;i+=10){
         result.push(searchContext.products.slice(i,i+10));
      }
      var pageNum = result.length;
      var pageContext = {};
      pageContext.products = result[0];

      var source = $("#products-list").html();
      var template = Handlebars.compile(source);
      
      var html = template(pageContext);
      $('.service_wrap').html(html);
      
      Page({
        num:pageNum,          //页码数
        startnum:1,       //指定页码
        elem:$('#servicePagination'),   //指定的元素
        callback:function(n){ //回调函数
          
          pageContext.products = result[n - 1];
          var html = template(pageContext);
          $('.service_wrap').html(html);
          $('.pagination li').on('click', function(e){
            window.scrollTo(0,0);
          })
        }
      });  
    }else{
      var html = "<div style='width: 1200px; margin: 0 auto; height: 50px; text-align:center; font-size: 20px'>抱歉，暂无  <span style='color: #FF5300;'>"+ keyword +"</span>  相关内容</div>"
      $('.service_wrap').html(html);
    }
  }else{
      // console.log('======')
      // 如果没有输入查询条件默认全返回
      var source = $("#products-list").html();
      var template = Handlebars.compile(source);
      var html = template(context);
      $('.service_wrap').html(html); 
  }
}

