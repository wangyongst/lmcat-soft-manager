(function(){
  $('.contact-send').on('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    
    var enDemand = AV.Object.extend('enDemand');
    var name = $('#name').val();
    var phone = $('#phone').val();
    var address = $('#address').val();  
    var email = $('#email').val();
    var require = $('#require').val();

    var endemand = new enDemand();

    endemand.set('customName', name);
    endemand.set('customTel', phone);
    endemand.set('companyAdress', address);
    endemand.set('customEmail', email);
    endemand.set('customDemand', require);  

    endemand.save().then(function(){
      $('#name').val('');
      $('#phone').val('');
      $('#address').val('');  
      $('#email').val('');
      $('#require').val('');
      alert('send success！！！');
    }, function(err){
      console.log(err);
    })
  })  
}())
  