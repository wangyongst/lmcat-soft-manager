// 动画
$(window).scroll((e) => {
  var scrollTop = $(window).scrollTop();
  
  console.log(scrollTop);

  if(scrollTop > 200){
    $('.type-text').addClass('animate3');
  }
  if(scrollTop > 490){
    $('.guarantee-text').addClass('animate3');
  }
  if(scrollTop > 920){
    $('.delivery-text').addClass('animate3');
  }
})