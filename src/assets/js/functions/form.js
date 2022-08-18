
const forms = document.querySelectorAll('form');

if (forms.length > 0) {
	forms.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();
			let form = e.currentTarget;
			formRemoveError(form);
			let valid = validInput(form);
			if (valid === 0) {
				formRemoveError(form);
				form.style.display = 'none';
				form.reset();
				let ok = document.querySelector('.request-ok');
				ok.style.display = 'block';
				ok.classList.add('fadeIn');
				setTimeout(() => {
					ok.style.display = 'none';
					form.style.display = 'block';
					form.classList.add('fadeIn');
				}, 5000);

			}
		});
	});
}