const elements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('show');
		}
	});
});

elements.forEach(el => observer.observe(el));
