
queryData();
var jobsList = [];

// 查询数据库
function queryData(){
  $.get('http://api.open.longmaosoft.com:3000/leancloud/Jobs', function(jobs){
    jobs.forEach((job) => {
      // 职位类别 
      var job_class = job.class;
      // 职位描述
      var job_description = job.job_description;      
      var job_post = job.job_post;
      var job_require = job.job_require;
      var job_skill = job.job_skill;
      var job_time = job.job_time;      
      var job_title = job.job_title;
      
      jobsList.push({
        job_class: job_class,
        job_description: job_description,
        job_post: job_post,
        job_require: job_require,
        job_skill: job_skill,
        job_time: formatDateTime(new Date(job_time)),
        job_title: job_title
      })
    })
    appendHtml();    
    jsoncontext = JSON.stringify(jobsList);
    sessionStorage.setItem('jobsList', jsoncontext); 
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

// 添加html
function appendHtml(){
  jobsList.forEach( (item, index) => {
    
    console.log(item);
    var num;
    var range;
    item.job_description.split('\n').map((item, index) =>{
      if(item.indexOf('招聘人数') != -1){
        
        num = item.split('：')[1];
        num = num.slice(0, num.length - 2);
        if(!num){
          num = 1;
        }        
      }

      if(item.indexOf('薪资范围') != -1){
        range = item.split('：')[1];
      }
    });

    var  ele = $("<li><span>"+ item.job_title +"</span><span>"+ num +"</span><span>北京</span><span>"+ range +"</span><span>"+ item.job_time +"</span></li>");

    $('.join-content-right-jobslist ul').append(ele);  
  
  })  

  $('.join-content-right-jobslist ul li span').css({
    'cursor': 'pointer'
  })
  // 
  $('.join-content-right-jobslist ul li').on('mouseover', (e) => {
    $('.join-content-right-jobslist ul li').css({
      'background-color': 'rgba(255, 255, 255, 1)'
    })

    $(e.target).parent().css({
      'background-color': 'rgba(100,100,100, 0.6)'
    })
  })
  $('.join-content-right-jobslist ul li').on('mouseout', (e) => {
    $('.join-content-right-jobslist ul li').css({
      'background-color': 'rgba(255, 255, 255, 1)'
    })    
  })
}

// 左侧切换栏
$('.join-content-left ul').on('click', (e) => {
  
  var index = $(e.target).data('index');     
  if(!index && index != 0) return;  
  if(index == '2'){
    $('.join_banner img').attr('src', 'http://p02hchp62.bkt.clouddn.com/pc/images/join-30-100.png') 
    $('.join-content-left').css({
      'height': '1860px'
    });
  }else if(index == '1'){
    $('.join_banner img').attr('src', 'http://p02hchp62.bkt.clouddn.com/pc/images/contact_banner2.png') 
    $('.join-content-left').css({
      'height': '939px'
    });
  }else if(index == '0'){
    $('.join_banner img').attr('src', 'http://p02hchp62.bkt.clouddn.com/pc/images/contact_banner2.png') 
    $('.join-content-left').css({
      'height': '700px'
    });

  }

  

  $(".join-content-left ul li").removeClass('join-content-left-active');

  $(e.target).addClass('join-content-left-active')
 
  $(".join-content-right-level-one").css({
    'display': 'none'
  });   

  $(".join-content-right-level-two").css({
    'display': 'none'
  })
  $(".join-content-right-share").css({
    'display': 'none'
  })

  $($(".join-content-right-level-one")[index]).css({
    'display': 'block'
  });
  
})

$(".join-content-right-jobslist ul").on('click', (e) => {
  var I = $('.join-content-right-jobslist ul li').index($(e.target.parentElement));
  if(!I) return;

  $(".join-content-right-level-one").css({
    'display': 'none'
  })

  $(".join-content-right-level-two").css({
    'display': 'block'
  })
  $(".join-content-right-share").css({
    'display': 'block'
  })

  var job = jobsList[I - 1];
  job.job_description_details  = [];
  job.job_description.split('\n').forEach(function(item, index){
    if(item){
      job.job_description_details.push(item.split('：'));      
    }    
  });  

  var source = $('#jobsdetails-list').html();
  var template = Handlebars.compile(source);
  var html = template(job);
  
  $('.join-content-right-jobsdetails').html(html);  
  $('.join-content-left').height($('.join-content-right').height())  
})


