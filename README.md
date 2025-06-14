# Jogo Tetris em JavaScript 🎮

Este é um clone clássico do jogo Tetris, desenvolvido puramente com **HTML, CSS e JavaScript**. O projeto utiliza a API Canvas do HTML5 para renderizar o jogo, a pontuação, o nível e a visualização da próxima peça.

\<br\>

-----

## ✨ Funcionalidades

  - **Movimentação e Rotação:** Controle total sobre as peças (tetrominós).
  - **Detecção de Colisão:** As peças param ao colidir com outras peças ou com o fundo do cenário.
  - **Limpeza de Linhas:** Linhas completas são eliminadas e o cenário é atualizado.
  - **Sistema de Pontuação:** Ganhe pontos por cada linha limpa. A pontuação aumenta exponencialmente com mais linhas limpas de uma só vez.
  - **Aumento de Nível:** O nível aumenta com base na pontuação, tornando o jogo progressivamente mais rápido e desafiador.
  - **Próxima Peça:** Um painel lateral mostra qual será a próxima peça a cair.
  - **Game Over:** O jogo termina quando uma nova peça não tem espaço para entrar no cenário.

-----

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web padrões, sem a necessidade de frameworks ou bibliotecas externas.

  - **HTML5**
  - **CSS3**
  - **JavaScript (ES6+)**
  - **HTML5 Canvas** para a renderização do jogo.

-----

## 🚀 Como Executar o Projeto

Como este é um projeto front-end puro, não há necessidade de um processo de *build* ou instalação de dependências.

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/enzosantos3/JogoTetris.git
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd SEU-REPOSITORIO
    ```

3.  **Abra o arquivo `index.html`** diretamente no seu navegador de preferência (Google Chrome, Firefox, etc.).

Alternativamente, você pode usar um servidor local, como a extensão **Live Server** para o VS Code, para evitar possíveis problemas de CORS ao carregar arquivos localmente.

-----

## 🕹️ Controles

Os controles do jogo são simples e baseados nas setas do teclado.

  - `←` : Mover a peça para a esquerda.
  - `→` : Mover a peça para a direita.
  - `↓` : Acelerar a queda da peça.
  - `↑` : Girar a peça no sentido horário.

-----
