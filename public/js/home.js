
document.addEventListener('DOMContentLoaded', () => {
  const inner = document.querySelector('#depoimentosCarousel .carousel-inner');
  
  fetch('/public/data/depoimentos.json')
    .then(res => res.json())
    .then(data => {
      data.depoimentos.forEach((dep, i) => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (i === 0) item.classList.add('active');

        item.innerHTML = `
          <div class="depo-carousel-card mx-auto">
            <h4>${dep.nome}</h4>
            <p>${dep.texto}</p>
            ${dep.descr ? `<p>${dep.descr}</p>` : ''}
          </div>
        `;

        inner.appendChild(item);
      });

      new bootstrap.Carousel('#depoimentosCarousel', {
        interval: 4000,
        ride: 'carousel',
        wrap: true
      });
    })
    .catch(err => console.error('Erro ao carregar depoimentos:', err));
});
