async function carregaDadosProdutos() {
  const response = await fetch('./src/data/db.json');
  const produtosLista = await response.json();

  return produtosLista;
}

async function renderizarProdutos(_produtos) {
  const container = document.getElementById("teste");
  container.innerHTML = "";
  
  if(_produtos.length == 0) {
    container.innerHTML = "<p>Nenhum produto encontrado :( </p>";
    return;
  }
    
  for (let produto of _produtos) {
    let card = await criaElementoProduto(produto);    
    container.appendChild(card);
  }
}

async function criaElementoProduto(_produto) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${_produto.imagem ? _produto.imagem : './src/img/loading.gif'}" alt="${_produto.nome}" />
    <b>${_produto.nome}</b>
    <p>R$ ${_produto.preco.toFixed(2)}</p>
    <button>Comprar</button>
  `;

  return card;
}

function buscaProduto(_produtos){
   const input = document.getElementById("searchInput");
   
   input.addEventListener("input", (event) => {
    const campoBusca = event.target.value.toLowerCase();

    const filtrados = _produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(campoBusca)
    );

    renderizarProdutos(filtrados);
  });
}

async function carregaProdutos() {
  const produtos = await carregaDadosProdutos();

  renderizarProdutos(produtos);
  buscaProduto(produtos);
  
  return produtos;
}

carregaProdutos();