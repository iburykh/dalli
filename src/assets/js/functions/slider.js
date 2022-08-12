
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
			el: ".tariff__bullet",
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

	const miniSlider = new Swiper('.slider-mini', {
		grabCursor: true,
		spaceBetween: 32,
		slidesPerGroup: 1,
		centeredSlides: true,
		initialSlide: 1,
		slidesPerView: 'auto'
	});

	const advantagesSlider = new Swiper('.swiper-advantages', {
		grabCursor: true,
		spaceBetween: 32,
		slidesPerGroup: 1,
		initialSlide: 0,
		slidesPerView: 'auto'
	});

	const clientsSlider = new Swiper('.swiper-clients', {
		slidesPerView: "auto",
		grid: {
			rows: 2,
		},
		spaceBetween: 32,
		pagination: {
			el: ".clients__bullets",
			type: 'bullets',
			clickable: true,
		},

	});
});