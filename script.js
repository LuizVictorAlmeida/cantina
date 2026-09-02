// --- FUNÇÕES DE ARMAZENAMENTO (LOCALSTORAGE) ---
function getCart() {
    return JSON.parse(localStorage.getItem('cantina_carrinho')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cantina_carrinho', JSON.stringify(cart));
    updateCartBadge();
}

// --- ATUALIZA A INSÍGNIA (CONTADOR DO MENU) ---
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const cart = getCart();
        const totalCount = cart.reduce((sum, item) => sum + item.qtd, 0);
        badge.textContent = totalCount;
    }
}

// --- MENU MOBILE (HAMBURGUER) ---
function initMenuMobile() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener('click', () => {
        const aberto = nav.classList.toggle('nav-aberto');
        toggleBtn.classList.toggle('aberto', aberto);
        toggleBtn.setAttribute('aria-expanded', aberto);
    });

    // Fecha o menu automaticamente ao tocar em um link (evita ficar aberto na próxima página)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-aberto');
            toggleBtn.classList.remove('aberto');
            toggleBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// --- LÓGICA DO CARDÁPIO: ADICIONAR ITEM ---
function initCardapio() {
    const addButtons = document.querySelectorAll('.add-btn');
    if (addButtons.length === 0) return;

    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const itemEl = e.target.closest('.item');
            const name = itemEl.querySelector('.item-name').innerText;
            const priceText = itemEl.querySelector('.item-price').innerText;

            // Converte "R$ 10,00" para o número 10.00
            const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());

            let cart = getCart();
            const existingIndex = cart.findIndex(item => item.name === name);

            if (existingIndex > -1) {
                cart[existingIndex].qtd += 1;
            } else {
                cart.push({ name, price, qtd: 1 });
            }

            saveCart(cart);

            // Animação/Feedback visual no botão
            const textoOriginal = button.innerText; // Guarda se era "+" ou "Adicionar"
            button.innerText = '✓';
            button.style.backgroundColor = '#2E7D32';
            button.style.color = '#FFF';
            setTimeout(() => {
                button.innerText = textoOriginal; // Restaura o texto correto
                button.style.backgroundColor = '';
                button.style.color = '';
            }, 800);
        });
    });
}

// --- LÓGICA DO CARRINHO: RENDERIZAR E ATUALIZAR ---
function renderCart() {
    // Antes o seletor era só '.item-list', mas essa classe também é usada
    // dentro de cada categoria do cardápio (Lanches, Salgados, etc). Por isso,
    // quando essa função rodava na página do cardápio, ela apagava o conteúdo
    // da primeira categoria e colocava os itens do carrinho no lugar.
    // Agora o seletor busca o '.item-list' só dentro da '.cart-section',
    // que só existe na página carrinho.html.
    const cartContainer = document.querySelector('.cart-section .item-list');
    const subtotalEl = document.querySelector('.summary-row span:last-child');
    const totalEl = document.querySelector('.summary-total span:last-child');
    const cartCountHeader = document.querySelector('.section-header span:last-child');

    if (!cartContainer) return; // Se não estiver na página de carrinho, ignora

    const cart = getCart();
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="padding: 1.5rem; text-align: center; color: var(--marrom-caramelo);">Seu carrinho está vazio.</p>';
        if (subtotalEl) subtotalEl.textContent = 'R$ 0,00';
        if (totalEl) totalEl.textContent = 'R$ 0,00';
        if (cartCountHeader) cartCountHeader.textContent = '0 itens';
        return;
    }

    let totalSum = 0;
    let totalItemCount = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qtd;
        totalSum += itemTotal;
        totalItemCount += item.qtd;

        const itemHTML = `
            <div class="cart-item">
                <div class="item-details">
                    <div class="item-title">${item.name}</div>
                    <div class="item-unit-price">R$ ${item.price.toFixed(2).replace('.', ',')} un.</div>
                </div>
                <div class="item-qty-controls">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    <span class="qty-value">${item.qtd}</span>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                </div>
                <div class="item-total">R$ ${itemTotal.toFixed(2).replace('.', ',')}</div>
                <button class="remove-btn" onclick="removeItem(${index})" title="Remover item">&times;</button>
            </div>
        `;
        cartContainer.innerHTML += itemHTML;
    });

    if (subtotalEl) subtotalEl.textContent = `R$ ${totalSum.toFixed(2).replace('.', ',')}`;
    if (totalEl) totalEl.textContent = `R$ ${totalSum.toFixed(2).replace('.', ',')}`;
    if (cartCountHeader) cartCountHeader.textContent = `${totalItemCount} itens`;
}

// Alterar quantidade (+ ou -)
function changeQty(index, delta) {
    let cart = getCart();
    cart[index].qtd += delta;

    if (cart[index].qtd <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    renderCart();
}

// Remover um item
function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

// --- FINALIZAR PEDIDO ---
function initCheckout() {
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (!checkoutBtn) return;

    checkoutBtn.addEventListener('click', () => {
        const cart = getCart();
        if (cart.length === 0) {
            const aviso = document.getElementById('avisoCarrinhoVazio');
            if (aviso) {
                aviso.classList.add('mostrar');
                setTimeout(() => aviso.classList.remove('mostrar'), 3000);
            }
            return;
        }

        const retiradaEl = document.getElementById('tipo-retirada');
        const pagamentoEl = document.getElementById('forma-pagamento');
        const observacaoEl = document.getElementById('observacao');

        // Usa o texto visível da opção selecionada (não o value técnico)
        const retirada = retiradaEl ? retiradaEl.options[retiradaEl.selectedIndex].text : 'Não informado';
        const pagamento = pagamentoEl ? pagamentoEl.options[pagamentoEl.selectedIndex].text : 'Não informado';
        const observacao = observacaoEl ? observacaoEl.value.trim() : '';

        const total = cart.reduce((soma, item) => soma + (item.price * item.qtd), 0);

        mostrarModalPedido(cart, retirada, pagamento, observacao, total);

        // Limpa o carrinho
        localStorage.removeItem('cantina_carrinho');
        saveCart([]);
        renderCart();
    });
}

// --- MODAL DE CONFIRMAÇÃO DO PEDIDO ---
function mostrarModalPedido(cart, retirada, pagamento, observacao, total) {
    const modal = document.getElementById('modalPedido');
    if (!modal) return;

    // Número de pedido fictício, só para dar um toque mais real à confirmação
    const numeroPedido = '#' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('modalNumeroPedido').textContent = numeroPedido;

    const resumoEl = document.getElementById('modalResumoItens');
    resumoEl.innerHTML = cart.map(item => `
        <div class="modal-resumo-item">
            <span>${item.qtd}x ${item.name}</span>
            <span>R$ ${(item.price * item.qtd).toFixed(2).replace('.', ',')}</span>
        </div>
    `).join('');

    document.getElementById('modalRetirada').textContent = retirada;
    document.getElementById('modalPagamento').textContent = pagamento;
    document.getElementById('modalTotalPedido').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    const obsEl = document.getElementById('modalObservacao');
    if (observacao) {
        obsEl.textContent = `Obs: ${observacao}`;
        obsEl.style.display = 'block';
    } else {
        obsEl.style.display = 'none';
    }

    modal.classList.add('ativo');
}

function fecharModalPedido() {
    const modal = document.getElementById('modalPedido');
    if (modal) modal.classList.remove('ativo');
}

function initModalPedido() {
    const modal = document.getElementById('modalPedido');
    if (!modal) return;

    const fecharBtn = document.getElementById('fecharModal');
    const novoPedidoBtn = document.getElementById('btnNovoPedido');

    if (fecharBtn) fecharBtn.addEventListener('click', fecharModalPedido);

    if (novoPedidoBtn) {
        novoPedidoBtn.addEventListener('click', () => {
            window.location.href = 'cardapio.html';
        });
    }

    // Fecha ao clicar na área escura ao redor do card
    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModalPedido();
    });

    // Fecha com a tecla Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') fecharModalPedido();
    });
}
console.log("Botões encontrados:", document.querySelectorAll('.add-btn').length);

// --- INICIALIZAÇÃO GERAL ---
// Este bloco roda assim que o HTML da página termina de carregar.
// Ele "liga" todas as funcionalidades acima, chamando cada função na página certa.
document.addEventListener('DOMContentLoaded', () => {
    // A seção ".hero" só existe na página inicial (index.html). Então, sempre
    // que a pessoa "entra no site" pela home, o carrinho é zerado - ou seja,
    // ela nunca vai ver itens de uma visita/teste anterior.
    if (document.querySelector('.hero')) {
        localStorage.removeItem('cantina_carrinho');
    }

    initMenuMobile();  // Ativa o botão hamburguer (em todas as páginas)
    updateCartBadge(); // Atualiza o número do carrinho no menu (em todas as páginas)
    initCardapio();    // Ativa os botões "Adicionar" (index.html e cardapio.html)
    renderCart();       // Desenha os itens reais do carrinho (carrinho.html)
    initCheckout();     // Ativa o botão "Finalizar Pedido" (carrinho.html)
    initModalPedido();  // Ativa a modal de confirmação do pedido (carrinho.html)
});