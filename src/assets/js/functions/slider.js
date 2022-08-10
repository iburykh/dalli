
window.addEventListener('DOMContentLoaded', function() {
    const mainSlider = new Swiper('.swiper', {
		grabCursor: true,
		spaceBetween: 32,
		slidesPerGroup: 1,
		initialSlide: 0,
		slidesPerView: 'auto'
	});

	const tableSlider = new Swiper('.slider-table', {
		pagination: {
			el: ".swiper-pagination",
			type: 'bullets',
			clickable: true,
		  },
		grabCursor: true,
		spaceBetween: 32,
		slidesPerGroup: 1,
		centeredSlides: true,
		initialSlide: 1,
		slidesPerView: 'auto'
	});
});