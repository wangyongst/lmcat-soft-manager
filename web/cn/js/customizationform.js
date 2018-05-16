

// 表单验证
// 表单判断
// 姓名
$(".name input").blur(function(){
  if($(".name input").val() == ''){
    $('.name input').css('border-color', 'red');    
  }
});

$('.name input').focus(function(){
  $('.custom-name').css('border-color', 'rgba(110, 110, 110, 0.6)');  
})

// 公司名
$(".company-name input").blur(function(){
  if($(".company-name input").val() == ''){
    $('.company-name input').css('border-color', 'red');    
  }
});

$('.company-name input').focus(function(){
  $('.company-name input').css('border-color', 'rgba(110, 110, 110, 0.6)');  
})

// 公司地址
$(".company-address input").blur(function(){
  if($(".company-address input").val() == ''){
    $('.company-address input').css('border-color', 'red');    
  }
});

$('.company-address input').focus(function(){
  $('.company-address input').css('border-color', 'rgba(110, 110, 110, 0.6)');  
})
// 电话

$(".company-tel input").blur(function(){
  if($(".company-tel input").val() == ''){
    $('.company-tel input').css('border-color', 'red');    
  }else if($(".company-tel input").val() != '' &&  !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test($('.company-tel input').val()) &&  !(/^1[34578]\d{9}$/.test($('.company-tel input').val()))){
    $('.tel-text').text('请输入正确的联系方式')
    $('.company-tel input').css('border-color', 'red');   
  }
});

$('.company-tel input').focus(function(){
  $('.company-tel input').css('border-color', 'rgba(110, 110, 110, 0.6)');
   $('.tel-text').text('')
})

// 需求
$(".requirement-des textarea").blur(function(){
  if($(".requirement-des textarea").val() == ''){
    $('.requirement-des textarea').css('border-color', 'red');
  }
});
$('.requirement-des textarea').focus(function(){
  $('.requirement-des textarea').css('border-color', 'rgba(110, 110, 110, 0.6)');
}) 





$('.customization-type span').on('click', function(e){
  $(".customization-type span").removeClass('span-active');
  $(this).addClass('span-active');
})
$('.data-type span').on('click', function(e){
  $(".data-type span").removeClass('span-active');
  $(this).addClass('span-active');
})

$('.submit').on('click', function(e){
  e.stopPropagation();
  e.preventDefault();
  
  var Customization = AV.Object.extend('Customization');
  
  // 
  if($.trim($('.name input').val()) == '' || $.trim($(".companyName input").val()) || $.trim($(".companyAddress input").val()) || $.trim($(".companyTel input").val()) || $.trim($(".requirementDes textarea").val())){
    alert('请输入所有必填项');
    return;
  }

  // 定制类型
  var customizationType =  $('.customization-type .span-active').text();
  var dataType = $('.data-type .span-active').text();
  var name = $('.name input').val();
  var companyName = $(".companyName input").val();
  var companyAddress = $(".companyAddress input").val();
  var companyTel = $(".companyTel input").val();
  var requirementDes = $(".requirementDes textarea").val();
  
  var accessory = document.getElementById('file')
  
  var files = accessory.files;

  var customization = new Customization();
  customization.set('customizationType', customizationType);
  customization.set('dataType', dataType);
  customization.set('name', name);
  customization.set('companyName', companyName);
  customization.set('companyAddress', companyAddress);
  customization.set('customTel', companyTel);  
  customization.set('requirementDes', requirementDes);

  for(var i = 0; i < files.length; i++){
    customization.set('files' + i, new AV.File(files[i].name, files[i]));
  }

  customization.save().then(function(){
     alert('提交成功');
    // 重置表单
    $('.name input').val('');
    $('.company-name input').val('');
    $('.company-address input').val('');
    $('.company-tel input').val('');
    $('.requirement-des textarea').val('');
    $(".customization-type span").removeClass('span-active');    
    $(".data-type span").removeClass('span-active');
    $(".first").addClass('span-active');
    var obj = document.getElementById('file')
    obj.select(); 
    document.selection.clear()
   
  }, function(err){
    
    console.log(err);

    alert('提交失败');
  })
});