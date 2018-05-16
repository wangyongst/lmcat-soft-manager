// 轮播图

$("#container").PageSwitch({
  direction : "horizontal"
});  
var height = window.innerHeight;  
// 全屏
$('.index_wrap').height(height);
$('.intro_section0').css('margin-top', (height - 420) / 2);
$('.intro_section1').css('margin-top', (height - 200) / 2);
$('.free-btn').css('margin-top', 50);

// 客户评价
$("#evaluate").PageSwitch({
  selectors : {
    sections : ".evaluate-sections",
    section : ".evaluate-section",
    page : ".evaluate-pages",
    active : ".evaluate-active",
  },
  direction : "horizontal",
}); 

// 服务客户
$("#custom").PageSwitch({
  selectors : {
    sections : ".custom-sections",
    section : ".custom-section",
    page : ".custom-pages",
    active : ".custom-active",
  },
  direction : "horizontal",
}); 



// 动画
$(window).scroll((e) => {
  var scrollTop = $(window).scrollTop();
  if(scrollTop > 150){
    $('.index_server_title').addClass('animate2');
  }
  if(scrollTop > 250){
    
    $('.index_server_details ul li:nth-child(1)').addClass('animate2');
    $('.index_server_details ul li:nth-child(2)').addClass('animate3');
    $('.index_server_details ul li:nth-child(3)').addClass('animate4');
    $('.index_server_details ul li:nth-child(4)').addClass('animate5');

  }
  if(scrollTop > 850){
    $('.index-solutions-header').addClass('animate2');
  }
  if(scrollTop > 950){
     $('.index-solutions-body ul li:nth-child(1)').addClass('animate2');
     $('.index-solutions-body ul li:nth-child(2)').addClass('animate3');
     $('.index-solutions-body ul li:nth-child(3)').addClass('animate4');
  }
  if(scrollTop > 1390){
    $('.index-advantage-header').addClass('animate2');    
  }
  if(scrollTop > 1490){
    $('.index-advantage-body ul li:nth-child(1)').addClass('animate6');
    $('.index-advantage-body ul li:nth-child(2)').addClass('animate7');
    $('.index-advantage-body ul li:nth-child(3)').addClass('animate8');
    $('.index-advantage-body ul li:nth-child(4)').addClass('animate9');
    $('.index-advantage-body ul li:nth-child(5)').addClass('animate10');
    $('.index-advantage-body ul li:nth-child(6)').addClass('animate11');

  }
  if(scrollTop > 2150){
    $('.index-promoter-header').addClass('animate2')
  }
  if(scrollTop > 2300){
    $('.index-promoter-body ul li:nth-child(1)').addClass('animate12');
    $('.index-promoter-body ul li:nth-child(2)').addClass('animate13');
  }  
})

var mediaList = {
  lists: []
}
queryData();

// 查询数据库
function queryData(){
  
  $.get('http://api.open.longmaosoft.com:3000/leancloud/News', function(news){
    news.forEach((New) => {
       // 职位类别 
      var from = New.from;
      // 职位描述
      var text = New.text;            
      var title = New.title;
      var writer = New.writer;
      var ID = New.ID;            
      var newstime = New.newstime;      

      mediaList.lists.push({
        from: from,
        ID: ID,
        text: text,
        title: title,
        writer: writer,
        newstime: formatDateTime(new Date(newstime)),                            
      })           
    }); 
    var source = $('#media-list').html();
    var template = Handlebars.compile(source);
    var html = template(mediaList);
    $('.index-team-text').html(html)
    // 绑定事件
    bindEvent();    
  })
}
// 格式化日期
function formatDateTime(date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    return y + '-' + m + '-' + d;  
};      

function bindEvent(){
  $('.index-team-text ul').on('click', (e) => {          
    var I = $('.index-team-text  ul li').index($(e.target.parentElement));
    console.log(I);
    window.location.href = './contact.html#3'+ I;
  })
}