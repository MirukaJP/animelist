var searchbar = document.getElementById('js-search');
window.onscroll = function(){
	console.log('Scroll');
	console.log(searchbar);
	var p = searchbar.offsetTop;
	var y = window.pageYOffset;
	if(y > p) {
		searchbar.classList.add('is-sticky');
		console.log(y +':'+ p);
	} else {
		searchbar.classList.remove('is-sticky');
		console.log(y +':'+ p);
	}
};