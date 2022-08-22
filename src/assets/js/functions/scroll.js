window.noZensmooth = true;

let links = document.querySelectorAll('.scroll');

links.forEach(link => {
	link.addEventListener('click', function(event) {
		event.preventDefault();

		let hash = this.getAttribute('href').replace('#', '');
		let toBlock = document.querySelector('.' + hash);

		var defaultDuration = 500; // ms
		var edgeOffset = -1; // px
		zenscroll.setup(defaultDuration, edgeOffset)
		zenscroll.to(toBlock);
	});
});