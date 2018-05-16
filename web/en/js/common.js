window.onscroll = function(e){
	var cont = document.getElementsByClassName('cont');
	if(window.scrollY > 200){
		cont[0].style.backgroundColor = 'rgba(10, 10, 10, 0.7)';
	}else{
		cont[0].style.backgroundColor = 'rgba(10, 10, 10, 0.7)';
	}
}

// $("#CN").on('click', function(e){
//   var path = window.location.href.split('/');
//   path[path.length - 2] = 'cn';
//   var locations = path.join("/");
  
//   window.location.href = locations;
// })

// $("#EN").on('click', function(e){
//   var path = window.location.href.split('/');
//   path[path.length - 2] = 'en';
//   var locations = path.join("/");

//   window.location.href= locations; 
// })
