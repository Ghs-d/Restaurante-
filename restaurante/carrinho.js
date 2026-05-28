const botoes = document.querySelectorAll('.adicionar');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalElemento = document.getElementById('total');
const botaoComprar = document.getElementById('comprar');
const mensagem = document.getElementById('mensagem');

let total = 0;

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const card = botao.parentElement;
        const nome = card.querySelector('h3').textContent;
        const precoTexto = card.querySelector('.preco').textContent;

        // Converte o texto para número (float)
        const preco = parseFloat(
            precoTexto
                .replace('R$', '')
                .replace(',', '.')
                .trim()
        );

        total += preco;
        totalElemento.textContent = total.toFixed(2);

        const item = document.createElement('li');

        //  spans e o ícone de lixeira
        item.innerHTML = `
            <span class="item-nome">${nome}</span> 
            <span class="item-preco">${precoTexto}</span>
            <button class="remover" title="Remover do carrinho">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        listaCarrinho.appendChild(item);

        // remover o item da lista
        const botaoRemover = item.querySelector('.remover');
        botaoRemover.addEventListener('click', () => {
            item.remove();
            total -= preco;

            
            if (total < 0) total = 0;

            totalElemento.textContent = total.toFixed(2);
        });
    });
});

botaoComprar.addEventListener('click', () => {
    if (total === 0) {
        mensagem.textContent = 'Adicione produtos ao carrinho!';
        mensagem.style.color = '#e74c3c'; // Vermelho mais elegante
        return;
    }

    mensagem.textContent = 'Pedido finalizado com sucesso!';
    mensagem.style.color = '#25D366'; 


    listaCarrinho.innerHTML = '';
    total = 0;
    totalElemento.textContent = '0.00';
});