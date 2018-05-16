// 动画
var height = window.innerHeight;  
if(height > 1000){
  $('.app-find-content-left').addClass('animate1');
  $(".app-find-content-right").addClass('animate2');
  $(window).scroll((e) => {
    var scrollTop = $(window).scrollTop();
  
    if(scrollTop > 320){
      $('.app-task-left').addClass('animate1');
      $(".app-task-right").addClass('animate2');   
    }
    if(scrollTop > 920){
      $('.app-invitation-left').addClass('animate1');
      $(".app-invitation-right").addClass('animate2');
    }
    if(scrollTop > 1750){
      $('.app-organization-left').addClass('animate1');
      $(".app-organization-right").addClass('animate2');
    }
    if(scrollTop > 2500){
      $('.app-flow-header').addClass('animate3')
    }
    if(scrollTop > 2700){
      $('.app-flow-content span:nth-child(1)').addClass('animate4');
      $('.app-flow-content span:nth-child(2)').addClass('animate5');
      $('.app-flow-content span:nth-child(3)').addClass('animate6');
      $('.app-flow-content span:nth-child(4)').addClass('animate7');
      $('.app-flow-content span:nth-child(5)').addClass('animate8');
      $('.app-flow-content span:nth-child(6)').addClass('animate9');
      $('.app-flow-content span:nth-child(7)').addClass('animate10');
      $('.app-flow-content span:nth-child(8)').addClass('animate11');
      $('.app-flow-content span:nth-child(9)').addClass('animate12');
    }
  })
}else{
  $(window).scroll((e) => {
    var scrollTop = $(window).scrollTop();

    if(scrollTop > 320){
      $('.app-find-content-left').addClass('animate1');
      $(".app-find-content-right").addClass('animate2');
    }
    if(scrollTop > 820){
      $('.app-task-left').addClass('animate1');
      $(".app-task-right").addClass('animate2');    
    }
    if(scrollTop > 1600){
      $('.app-invitation-left').addClass('animate1');
      $(".app-invitation-right").addClass('animate2');
    }
    if(scrollTop > 2300){
      $('.app-organization-left').addClass('animate1');
      $(".app-organization-right").addClass('animate2');
    }
    if(scrollTop > 2900){
      $('.app-flow-header').addClass('animate3')
    }
    if(scrollTop > 3100){
      $('.app-flow-content span:nth-child(1)').addClass('animate4');
      $('.app-flow-content span:nth-child(2)').addClass('animate5');
      $('.app-flow-content span:nth-child(3)').addClass('animate6');
      $('.app-flow-content span:nth-child(4)').addClass('animate7');
      $('.app-flow-content span:nth-child(5)').addClass('animate8');
      $('.app-flow-content span:nth-child(6)').addClass('animate9');
      $('.app-flow-content span:nth-child(7)').addClass('animate10');
      $('.app-flow-content span:nth-child(8)').addClass('animate11');
      $('.app-flow-content span:nth-child(9)').addClass('animate12');
     

    }
  })  
}
