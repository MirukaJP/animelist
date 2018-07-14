/*
１：ページ内リンクを取得　=> pageLink
２：pageLinkをクリックしたら、
３：クリックした要素のhrefの値を取得 => linkDest
４：IDがlinkDestの要素のY座標を取得 => destY
５：現在のY座標を取得 => yOffset
６：スクロールの速度を設定 => duration
７：現在地からdestYまでスクロールする
*/
pageScroll();
function pageScroll() {
	var pageLink = document.querySelectorAll('a[href^="#"]');
//	console.log('Set!' + pageLink);
	
	pageLink.forEach(function (link) {
//		console.log(link.textContent);
		link.onclick = scrollFunc;
	});
}

function scrollFunc(event){
	event.preventDefault();
	
	var linkTarget = this.getAttribute('href');
//	console.log('Click!' + linkTarget);
	
	var targetObj = document.querySelector(linkTarget);
	var currentY = window.pageYOffset;
	var dest = targetObj.getBoundingClientRect();
	var destY = dest.top + window.pageYOffset;
	var distance = dest.top;
	
	var i = 0;
	var begin = new Date() - 0;
	var duration = 300;
	var interval = 10;
	var times = duration / interval; // 30
	var step = distance / times;
	
	var timer= setInterval(function() {
		var current = new Date() - begin;
		if (current > duration) {
			clearInterval(timer);
			current = duration;
		}
		
		var yOffset = window.pageYOffset;
		var yPoint = yOffset + step;
		window.scrollTo(0, yPoint);
//		console.log('currentY:' + currentY + ' / distance:' + distance + ' / destY:' + destY + ' / times:' + times + ' / step:' + step + ' / yOffset:' + yOffset +' / yPoint:' + yPoint);
	}, interval);
}