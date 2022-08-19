const dark = document.querySelectorAll('.dark');
const light = document.querySelectorAll('.light');
const header = document.querySelector('.header');
const link = header.querySelectorAll('.menu__link');

const promo = document.querySelector('.promo');
const about = document.querySelector('.about');
const tariff = document.querySelector('.tariff');
const connect = document.querySelector('.connect');
const footer = document.querySelector('.footer');

window.addEventListener("scroll", () => {
	let windowScrollY = window.scrollY;

	let promoTop = promo.getBoundingClientRect().top + scrollY;
	let promoBottom = promo.getBoundingClientRect().bottom + scrollY;
	
	if (windowScrollY >= promoTop && windowScrollY <= promoBottom) {
		header.classList.remove('header-light');
		link.forEach(elem => {
			elem.classList.remove('active');
			link[0].classList.add('active');
		});
	} else {
		header.classList.add('header-light');
		link.forEach(elem => {
			elem.classList.remove('active');
		});
	}
	let aboutTop = about.getBoundingClientRect().top + scrollY;
	let aboutBottom = about.getBoundingClientRect().bottom + scrollY;
	
	if (windowScrollY >= aboutTop && windowScrollY <= aboutBottom) {
		link.forEach(elem => {
			elem.classList.remove('active');
			link[1].classList.add('active');
		});
	}

	let tariffTop = tariff.getBoundingClientRect().top + scrollY;
	let tariffBottom = tariff.getBoundingClientRect().bottom + scrollY;
	
	if (windowScrollY >= tariffTop && windowScrollY <= tariffBottom) {
		link.forEach(elem => {
			elem.classList.remove('active');
			link[2].classList.add('active');
		});
	}

	let connectTop = connect.getBoundingClientRect().top + scrollY;
	let connectBottom = connect.getBoundingClientRect().bottom + scrollY;
	
	if (windowScrollY >= connectTop && windowScrollY <= connectBottom) {
		link.forEach(elem => {
			elem.classList.remove('active');
			link[3].classList.add('active');
		});
	}
	
	if ((window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
		link.forEach(elem => {
			elem.classList.remove('active');
			link[4].classList.add('active');
		});
	}
});