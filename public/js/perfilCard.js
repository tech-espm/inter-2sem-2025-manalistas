let pessoas = [];

fetch('/public/data/pessoas.json')
  .then(response => response.json())
  .then(data => {
    pessoas = data;
  })
  .catch(err => console.error("Erro ao carregar pessoas.json", err));

function abrirPerfil(id) {
  const pessoa = pessoas.find(p => p.id === id);
  if (!pessoa) return;

  const card = document.getElementById("perfil-card");
  card.style.display = "flex";

  document.getElementById("card-img").src = `/public/img/perfis/${pessoa.img}`;
  document.getElementById("card-img").alt = pessoa.nome;
  document.getElementById("card-nome").textContent = pessoa.nome.toUpperCase();
  document.getElementById("card-frase").textContent = pessoa.frase;
  document.getElementById("card-descricao").textContent = pessoa.descricao.join("\n");
  document.getElementById("card-linkedin").href = pessoa.linkedin;
  document.getElementById("card-github").href = pessoa.github;
}

function fecharPerfil() {
  document.getElementById("perfil-card").style.display = "none";
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const card = document.getElementById("perfil-card");
    if (card.style.display === 'flex') fecharPerfil();
  }
});
