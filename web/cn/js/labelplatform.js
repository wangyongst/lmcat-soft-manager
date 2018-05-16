$('.tabs-header ul').on('click', (e) => {
  var index = $('.tabs-header ul li').index(e.target);

  console.log(index);

  $('.tabs-header ul li').css({
    'background-color': '',
    'color': '#212121',
  })
  $('.tabs-body ul li').css({
    'display': 'none',
  })

  $(e.target).css({
    'background-color': 'rgba(10, 10, 10, 0.7)',
    'color': '#fff'
  })
  
  $($('.tabs-body ul li')[index]).fadeIn();

})

// 动画
$(window).scroll((e) => {
  var scrollTop = $(window).scrollTop();
  
  console.log(scrollTop);
  if(scrollTop > 100){
    $('.labelplatform-content-module2-title').addClass('animate2');
  }
  if(scrollTop > 120){
    $('.labelplatform-content-module2-content').addClass('animate2');
  }
  if(scrollTop > 610){
    $('.labelplatform-content-module3-title').addClass('animate2');
  }

  if(scrollTop > 630){
    $('.labelplatform-content-module3-content ul li:nth-child(1)').addClass('animate3')
    $('.labelplatform-content-module3-content ul li:nth-child(2)').addClass('animate4')
    $('.labelplatform-content-module3-content ul li:nth-child(3)').addClass('animate5')
    $('.labelplatform-content-module3-content ul li:nth-child(4)').addClass('animate6')
    $('.labelplatform-content-module3-content ul li:nth-child(5)').addClass('animate7')
    $('.labelplatform-content-module3-content ul li:nth-child(6)').addClass('animate8')
    $('.labelplatform-content-module3-content ul li:nth-child(7)').addClass('animate9')
  }
})