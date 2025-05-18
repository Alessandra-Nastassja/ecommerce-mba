async function carregaDadosProdutos() {
  const response = await fetch('./src/data/db.json');
  const produtosLista = await response.json();

  return produtosLista;
}

async function renderizarProdutos(produtos) {
  const container = document.getElementById("teste");
  container.innerHTML = "";
  
  if(produtos.length == 0) {
    container.innerHTML = "<p>Nenhum produto encontrado :( </p>";
    return;
  }
    
  for (let produto of produtos) {
    let card = await criaElementoProduto(produto);    
    container.appendChild(card);
  }
}

async function criaElementoProduto(produto) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${produto.imagem ? produto.imagem : './src/img/loading.gif'}" alt="${produto.nome}" />
    <b>${produto.nome}</b>
    <p>R$ ${produto.preco.toFixed(2)}</p>
    <button>Comprar</button>
  `;

  return card;
}

async function carregaProdutos() {
  const produtos = await carregaDadosProdutos();
  renderizarProdutos(produtos);
  
  return produtos;
}

carregaProdutos();