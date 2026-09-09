==================================================
 CANTINAS CARVALHO
 Sistema de pedidos on-line para a cantina do
 SENAI Vila Mariana
==================================================

Site publicado:
https://luizvictoralmeida.github.io/cantina/


--------------------------------------------------
SOBRE O PROJETO
--------------------------------------------------
A Cantinas Carvalho é uma plataforma front-end criada
para agilizar os intervalos na cantina do SENAI Vila
Mariana. O site permite consultar o cardápio completo,
montar um pedido em um carrinho de compras e finalizar
a compra com uma tela de confirmação, tudo direto pelo
celular ou computador, sem necessidade de instalar
nada.

Este é o primeiro projeto em grupo desenvolvido pelos
integrantes listados abaixo.


--------------------------------------------------
EQUIPE
--------------------------------------------------
- Luiz Victor        - Back-End
- João Bispo         - Analista de Documentação
- Pedro Anastacio    - Design Gráfico
- Kaique             - SGBD (Banco de Dados)
- Guilherme          - Front-End


--------------------------------------------------
PÁGINAS DO SITE
--------------------------------------------------
- index.html      Página inicial (Home), com destaque
                   para os itens mais pedidos
- cardapio.html    Cardápio completo, organizado por
                   categoria (lanches, salgados,
                   bebidas, doces, refeições)
- carrinho.html    Carrinho de compras e finalização
                   do pedido
- sobre.html       Informações sobre a cantina
                   (horário, localização, pagamento)


--------------------------------------------------
FUNCIONALIDADES
--------------------------------------------------
- Cardápio organizado por categoria, nome e
  preço de cada item
- Carrinho de compras: adicionar, ajustar quantidade e
  remover itens, com total calculado automaticamente
- Botão flutuante no cardápio para ir direto ao
  carrinho, com contador de itens em tempo real
- Tela de confirmação do pedido (com número do pedido,
  resumo dos itens, retirada e forma de pagamento)
- Menu adaptado para celular (menu hamburguer)
- Carrinho salvo no navegador durante a sessão
  (localStorage) — sem necessidade de servidor/banco de
  dados para funcionar


--------------------------------------------------
TECNOLOGIAS UTILIZADAS
--------------------------------------------------
- HTML5
- CSS3 (layout responsivo, sem frameworks)
- JavaScript puro (sem bibliotecas externas)
- LocalStorage (armazenamento do carrinho no navegador)
- GitHub Pages (hospedagem do site)


--------------------------------------------------
ESTRUTURA DE ARQUIVOS
--------------------------------------------------
index.html          Página inicial
cardapio.html       Cardápio
carrinho.html       Carrinho e finalização do pedido
sobre.html          Sobre a cantina
script.js           Lógica do carrinho, menu mobile e
                    modal de confirmação
logoCantina.png     Logo da Cantinas Carvalho
coxinha.jpg         Foto: Coxinha de Frango
prato-executivo.jpg Foto: Prato Feito Executivo
suco-laranja.jfif   Foto: Suco Natural


--------------------------------------------------
COMO ACESSAR
--------------------------------------------------
On-line (recomendado):
  Acesse https://luizvictoralmeida.github.io/cantina/
  em qualquer navegador, celular ou computador.

Localmente:
  Basta abrir o arquivo "index.html" em um navegador.
  Não é necessário instalar nada nem configurar
  servidor: todo o projeto roda direto no navegador.


--------------------------------------------------
OBSERVAÇÕES
--------------------------------------------------
- O carrinho é reiniciado automaticamente sempre que a
  página inicial (Home) é carregada, para evitar que
  restem itens de uma visita ou teste anterior.
- Projeto desenvolvido para fins acadêmicos, como
  primeira entrega em grupo no SENAI Vila Mariana.
