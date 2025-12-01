// CARROSSEL PROMOÇÕES

fetch('/public/data/promocoes.json')
  .then(res => res.json())
  .then(data => {
    const carousel = document.getElementById('carouselPromocoes');
    if (!carousel) return console.error("#carouselPromocoes não encontrado");

    const imgs = data.imagens.map(imgData => {
      const img = document.createElement('img');
      img.src = imgData.src;
      img.alt = imgData.alt || '';
      carousel.appendChild(img);
      return img;
    });

    if (!imgs.length) return;

    let current = 0;

    function atualizarClasses() {
      const total = imgs.length;
      imgs.forEach(img => img.className = '');
      imgs[current].classList.add('center');
      if (total > 1) imgs[(current + 1) % total].classList.add('right');
      if (total > 2) imgs[(current - 1 + total) % total].classList.add('left');
    }

    atualizarClasses();

    setInterval(() => {
      current = (current + 1) % imgs.length;
      atualizarClasses();
    }, 3000);
  })
  .catch(err => console.error('Erro ao carregar imagens (Promoções):', err));



// CARROSSEL PACOTES

fetch('/public/data/pacotes.json')
  .then(res => res.json())
  .then(data => {
    const carousel = document.getElementById('carouselPacotes');
    if (!carousel) return console.error("#carouselPacotes não encontrado");

    const imgs = data.imagens.map(imgData => {
      const img = document.createElement('img');
      img.src = imgData.src;
      img.alt = imgData.alt || '';
      carousel.appendChild(img);
      return img;
    });

    if (!imgs.length) return;

    let current = 0;

    function atualizarClasses() {
      const total = imgs.length;
      imgs.forEach(img => img.className = '');
      imgs[current].classList.add('center');
      if (total > 1) imgs[(current + 1) % total].classList.add('right');
      if (total > 2) imgs[(current - 1 + total) % total].classList.add('left');
    }

    atualizarClasses();

    setInterval(() => {
      current = (current + 1) % imgs.length;
      atualizarClasses();
    }, 3000);
  })
  .catch(err => console.error('Erro ao carregar imagens (Pacotes):', err));
