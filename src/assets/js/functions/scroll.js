window.noZensmooth = true;

let links = document.querySelectorAll('.scroll');

links.forEach(link => {
	link.addEventListener('click', function(event) {
		event.preventDefault();

		let hash = this.getAttribute('href').replace('#', '');
		let toBlock = document.querySelector('.' + hash);

		zenscroll.to(toBlock);
	});
});