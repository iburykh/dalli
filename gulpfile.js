const { src, dest } = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const del = require('del');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const groupMedia = require('gulp-group-css-media-queries');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const webp = require('imagemin-webp');
const uglify = require('gulp-uglify-es').default;
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const webpcss = require('gulp-webpcss');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const strip = require('gulp-strip-comments');
const htmlbeautify = require('gulp-html-beautify');
const groupConcat = require('gulp-group-concat');

// const imageminPngquant  = require('imagemin-pngquant');
// const ttf2woff = require("gulp-ttf2woff");

//todo !!! если не исполльзуется webP -  убрать webpcss в css и команду webpImages !!!

//* paths
let project_folder = "dist";
let src_folder = "src";
let fs = require('fs');
let path = {
	src: {
		html: src_folder + "/*.html",
		css: src_folder + "/assets/scss/*.scss",
		jsMain: src_folder + "/assets/js/**/*.js",
		js: src_folder + "/assets/js/*.js",
		img: src_folder + "/assets/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
		imgWebp: src_folder + "/assets/img/**/*.{jpg,jpeg,png}",
		fonts: src_folder + "/assets/fonts/*.ttf",
		resources: src_folder + "/assets/resources/**",
		favicon: src_folder + "/assets/favicon/**",
		svg: src_folder + "/assets/img/svg/*.svg"
	},
	build: {
		html: project_folder + "/",
		css: project_folder + "/assets/css/",
		js: project_folder + "/assets/js/",
		img: project_folder + "/assets/img/",
		fonts: project_folder + "/assets/fonts/",
		resources: project_folder + "/assets/",
		favicon: project_folder + "/assets/favicon/"
	},
	watch: {
		html: src_folder + "/**/*.html",
		css: src_folder + "/assets/scss/**/*.scss",
		js: src_folder + "/assets/js/**/*.js",
	},

	clean: "./" + project_folder + "/"
}

//* svg sprite

const svgSprites = () => {
	return src(path.src.svg)
	  .pipe(
		svgmin({
		  js2svg: {
			pretty: true,
		  },
		})
	  )
	  .pipe(svgSprite({
		mode: {
		  stack: {
			sprite: "../sprite.svg"
		  }
		},
	  }))
	  .pipe(dest(path.build.img));
};

//* html

const html = () => {
	return src(path.src.html)
		.pipe(plumber(
			notify.onError({
			title: "Html",
			message: "Error: <%= error.message %>"
			})
		))
        .pipe(fileinclude())
		.pipe(htmlbeautify())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
};

const htmlProd = () => {
	return src(path.src.html)
        .pipe(fileinclude())
		.pipe(strip())
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest(path.build.html))
};

//* css

const css = () => {
    return src(path.src.css)
		.pipe(plumber(
			notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(webpcss({})) //убрать если не исполльзуется webP
		.pipe(groupMedia())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
};

const cssProd = () => {
    return src(path.src.css)
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(webpcss({})) // убрать если не исполльзуется webP
		.pipe(groupMedia())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(cleanCss())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
};

const cssBackend = () => {
    return src(path.src.css)
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(webpcss({})) // убрать если не исполльзуется webP
		.pipe(groupMedia())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
};

//* scripts

const scripts = () => {

	src(path.src.jsMain)
		.pipe(plumber(
			notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(groupConcat({
			'vendor.min.js': src_folder + "/assets/js/vendor/*.js"
		}))
		.pipe(strip())
		.pipe(dest(path.build.js))
	src(path.src.js)
		.pipe(dest(path.build.js))
	return src(path.src.jsMain)
		.pipe(plumber(
			notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(groupConcat({
			'main.min.js': src_folder + "/assets/js/functions/*.js"
		}))
		.pipe(strip())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

const scriptsProd = () => {
	src(path.src.jsMain)
		.pipe(groupConcat({
			'vendor.min.js': src_folder + "/assets/js/vendor/*.js"
		}))
		.pipe(strip())
		.pipe(uglify())
		.pipe(dest(path.build.js))
	src(path.src.js)
		.pipe(dest(path.build.js))
	return src(path.src.jsMain)
		.pipe(groupConcat({
			'main.min.js': src_folder + "/js/functions/*.js"
		}))
		.pipe(strip())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(dest(path.build.js))
}

const scriptsBackend = () => {
	src(path.src.jsMain)
		.pipe(groupConcat({
			'vendor.min.js': src_folder + "/assets/js/vendor/*.js"
		}))
		.pipe(uglify())
		.pipe(strip())
		.pipe(dest(path.build.js))
	src(path.src.js)
		.pipe(dest(path.build.js))
	return src(path.src.jsMain)
		.pipe(groupConcat({
			'main.min.js': src_folder + "/js/functions/*.js"
		}))
		.pipe(strip())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(dest(path.build.js))
}

//* images

const img = () => {
	return src(path.src.img)
		.pipe(newer(path.build.img))
		.pipe(dest(path.build.img))
}

const imgProd = () => {
	return src(path.src.img)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}), //optimizationLevel - это кол-во проходов, диапазон 0-7
			imagemin.svgo({plugins: [{removeViewBox: true}]})
		]))
		.pipe(dest(path.build.img))
}

const webpImages = () => {
	return src(path.src.imgWebp)
		.pipe(newer(path.build.img))
		.pipe(
			imagemin([
				webp({
					quality: 95
				})
			])
		)
		.pipe(
			rename({
				extname: ".webp"
			})
		)
		.pipe(dest(path.build.img))
};

//* fonts

// === woff2 ===

const fonts = () => {
	return src(path.src.fonts)
		.pipe(plumber())
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));
};

// === woff ===

// const fonts = () => {
// 	src(path.src.fonts)
// 		.pipe(plumber())
// 		.pipe(ttf2woff())
// 		.pipe(dest(path.build.fonts));
// 	return src(path.src.fonts)
// 		.pipe(ttf2woff2())
// 		.pipe(dest(path.build.fonts));
// };

const otf = () => {
	return src([src_folder + '/assets/fonts/*.otf'])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(src_folder + '/assets/fonts/'));
};

const cb = () => {};

const fontsConnect = () => {
	let file_content = fs.readFileSync(src_folder + '/assets/scss/global/fonts.scss');
	if (file_content == '') {
		fs.writeFile(src_folder + '/assets/scss/global/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(src_folder + '/assets/scss/global/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
};

const resources = () => {
	return src(path.src.resources)
		.pipe(plumber())
		.pipe(dest(path.build.resources))
}

const favicon = () => {
	return src(path.src.favicon)
		.pipe(plumber())
		.pipe(dest(path.build.favicon))
}


const watchFiles = () => {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		notify: false
	})
    gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.src.img], img);
	gulp.watch([path.src.imgWebp], webpImages);
	gulp.watch([path.src.fonts], fonts);
	gulp.watch([path.src.resources], resources);
	gulp.watch([path.watch.js], scripts);
	gulp.watch([path.src.favicon], favicon);
	gulp.watch([path.src.svg], svgSprites);
};

const clean = () => {
	return del(path.clean);
};


exports.default =  gulp.series(clean, gulp.parallel(html, scripts, fonts, img, webpImages, resources, favicon, svgSprites), css, watchFiles);
exports.prod =  gulp.series(clean, gulp.parallel(htmlProd, scriptsProd, fonts, imgProd, webpImages, resources, favicon, svgSprites), cssProd);
exports.backend =  gulp.series(clean, gulp.parallel(html, scriptsBackend, fonts, imgProd, resources, favicon, svgSprites), cssBackend);

//* Options
exports.fontsConnect =  fontsConnect;
exports.otf =  otf;
exports.clean =  clean;