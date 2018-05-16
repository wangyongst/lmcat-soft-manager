(function(){

  // 媒体列表      
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
      $('.media-text').html(html)

      var source2 = $('#media-list-4').html();
      var template2 = Handlebars.compile(source2);
      var html2 = template2(mediaList);
      $('.media-list-3').html(html2);             
      // 绑定事件
      bindEvent();
      changeHref();
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
    $('.media-text ul').on('click', (e) => {          
      var I = $('.media-text  ul li').index($(e.target.parentElement));
     
     console.log(I);

      var source = $('#media-list-details').html();
      var template = Handlebars.compile(source);
      var html = template(mediaList.lists[I]);
      
      $('.media-list-details-wrap').html(html);
      
      $(".contact-content").css({
        'display': 'none'
      })
    })

    $('.media-list-3 ul').on('click', (e) => {          
      var I = $('.media-list-3  ul li').index($(e.target.parentElement));
      
      var source = $('#media-list-details').html();
      var template = Handlebars.compile(source);
      var html = template(mediaList.lists[I]);
      
      $('.media-list-details-wrap').html(html);
      
      $(".contact-content").css({
        'display': 'none'
      })
      $('.media-list-2').css({
        'display': 'none'
      })
    })

    $(".media-text button").on('click', (e) => {          
      window.location.href = './contact.html#2';          
      changeHref();
    })
  }

  function changeHref(){
    var path = window.location.href.split('/').pop()
    
    if( path == 'contact.html#2'){
      $('.contact-content').css({
        'display': 'none'
      })

      $('.media-list-2').css({
        'display': 'block'
      })
    }else{
      $('.contact-content').css({
        'display': 'block'
      })
      $('.media-list-2').css({
        'display': 'none'
      })
    }
    
    var num = window.location.href.split('#')[1];

    if(num && num.length === 2 ){
      var I = Number(num.substr(1, 1));

      var source = $('#media-list-details').html();
      var template = Handlebars.compile(source);
      var html = template(mediaList.lists[I]);

      $('.media-list-details-wrap').html(html);
      
      $(".contact-content").css({
        'display': 'none'
      })
    }
  }

  changeHref();
})()