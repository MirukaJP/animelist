var gulp = require('gulp');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var svgSprites = require('gulp-svg-sprites');
var cheerio = require('gulp-cheerio');
var svgmin = require('gulp-svgmin');
var temp = require('gulp-template');
var path = require('path');

// SVG Sprite
gulp.task('dripiconSprite', function () {
	return gulp
		.src('src/images/dripicons-svg/*.svg')
		.pipe(svgmin(function (file) {
			var prefix = path.basename(file.relative, path.extname(file.relative));
			return {
				plugins: [{
					cleanupIDs: {
						prefix: prefix + '-'
						//					,minify: true
					}
			}]
			}
		}))
		.pipe(svgstore({
			inlineSvg: true
		}))
		//	.pipe(cheerio({
		//		run: function($) {
		//			$('[fill]').removeAttr('fill');
		//			$('[stroke]').removeAttr('stroke');
		//			$('svg').attr('style','display:none');
		//		},
		//		parserOptions: {xmlMode: true}
		//	}))
		.pipe(rename('dripicons-sprite.svg'))
		.pipe(gulp.dest('src/images/'));
});


// SVG Min
gulp.task('dripicon-min', function () {
	gulp.src('src/images/dripicons-svg/*.svg')
		.pipe(svgmin())
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(cheerio({
			run: function ($, file) {
				// 不要なタグを削除
				$('style,title,defs').remove();
				// symbolタグ以外のid属性を削除
				$('[id]:not(symbol)').removeAttr('id');
				// Illustratorで付与される「st」または「cls」ではじまるclass属性を削除
				$('[class^="st"],[class^="cls"]').removeAttr('class');
				// svgタグ以外のstyle属性を削除
				$('[style]:not(svg)').removeAttr('style');
				// data-name属性を削除
				$('[data-name]').removeAttr('data-name');
				// fill属性を削除
				$('[fill]').removeAttr('fill');
				// svgタグにdisplay:noneを付与（読み込み時、スプライト全体を非表示にするため）
				$('svg').attr({
					style: 'display:none'
				});

				// _base.htmlに渡すid
				var symbols = $('svg > symbol').map(function () {
					return {
						id: $(this).attr('id')
					};
				}).get();

				// _base.htmlを基に、_sample.htmlをルートに生成
				gulp.src('./src/images/svg/_base.html')
					.pipe(temp({
						inlineSvg: $('svg'),
						symbols: symbols
					}))
					.pipe(rename('_sample.html'))
					.pipe(gulp.dest('./'));
			},
			parserOptions: {
				xmlMode: true
			}
		}))
		.pipe(rename('dripicons-sprites.svg'))
		.pipe(gulp.dest('dist/images/dripicons-svg/'));
});
