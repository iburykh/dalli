
window.addEventListener('DOMContentLoaded', function() {
    const mainSlider = new Swiper('.swiper', {
		grabCursor: true,
		spaceBetween: 32,
		slidesPerGroup: 1,
		initialSlide: 0,
		slidesPerView: 'auto',
		touchRatio: 2,
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
		slidesPerView: 'auto',
		touchRatio: 2,
	});

	const miniSlider = new Swiper('.slider-mini', {
		grabCursor: true,
		spaceBetween: 32,
		slidesPerGroup: 1,
		centeredSlides: true,
		initialSlide: 1,
		slidesPerView: 'auto',
		touchRatio: 2,
	});

	const advantagesSlider = new Swiper('.swiper-advantages', {
		grabCursor: true,
		spaceBetween: 32,
		slidesPerGroup: 1,
		initialSlide: 0,
		slidesPerView: 'auto',
		touchRatio: 2,
	});

	const clientsSlider = new Swiper('.swiper-clients', {
		slidesPerView: "auto",
		breakpoints: {
			577: {
				spaceBetween: 32,
				grid: {
					rows: 2,
				},
			}
		},
		spaceBetween: 20,
		pagination: {
			el: ".clients__bullets",
			type: 'bullets',
			clickable: true,
		},
		touchRatio: 2,
	});
});