var tv = new Vue ({
	el: '#tvanime',
	data: {
		show: false,
		expandElm: null,
		newStories: [
			{
				"id": 1,
				"title": "ジェットコースター殺人事件",
				"importance": 3,
				"date": "1996/1/8",
				"tags": ""
			},
			{
				"id": 2,
				"title": "社長令嬢誘拐事件",
				"importance": "2",
				"date": "9999/99/99",
				"tags": ""
			},
			{
				"id": 3,
				"title": "アイドル密室殺人事件",
				"importance": "1",
				"date": "9999/99/99",
				"tags": ""
			},
			{
				"id": 9999,
				"title": "大都会暗号マップ事件",
				"importance": "0",
				"date": "9999/99/99",
				"tags": ""
			},
		]
	},
	methods: {
		expand: function(event) {
			var elm = event.currentTarget;
			console.log(elm);
			elm.classList.add('is-shown');
			this.expandElm = elm;
			document.getElementById('top').classList.add('is-crop');
			this.show = true;
		},
		unexpand: function(event) {
			var elm = this.expandElm;
			console.log(elm);
			elm.classList.remove('is-shown');
			this.expandElm = null;
			document.getElementById('top').classList.remove('is-crop');
			this.show = false;
		}
	}
});