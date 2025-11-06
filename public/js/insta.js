fetch('/public/data/instagram.json')
  .then(res => res.json())
  .then(data => {
    const inner = document.querySelector('#instagramCarousel .carousel-inner');
    const posts = data.posts;

    for (let i = 0; i < posts.length; i += 2) {
      const item = document.createElement('div');
      item.classList.add('carousel-item');
      if (i === 0) item.classList.add('active');

      item.innerHTML = `
        <div class="row">
          <div class="col-sm-6 text-center">
            <a href="${posts[i].url}" target="_blank">
              <img src="${posts[i].img}" class="carousel-img" alt="Post Instagram ${i+1}">
            </a>
          </div>
          ${posts[i+1] ? `
          <div class="col-sm-6 text-center">
            <a href="${posts[i+1].url}" target="_blank">
              <img src="${posts[i+1].img}" class="carousel-img" alt="Post Instagram ${i+2}">
            </a>
          </div>` : ''}
        </div>
      `;

      inner.appendChild(item);
    }
    
    new bootstrap.Carousel('#instagramCarousel', {
      interval: 4000,
      ride: 'carousel',
      wrap: true
    });
  })
  .catch(err => console.error('Erro ao carregar posts:', err));
