<!-- filepath: p:\xampp\htdocs\www\Projeto\src\Views\pages\0_template.php -->
<?php
/**
 * Template Base para Criação de Páginas
 *
 * Este arquivo serve como modelo para criar novas páginas no projeto.
 * Siga as instruções abaixo para criar uma nova página:
 *
 * 1. **Copie este arquivo**:
 *    - Faça uma cópia deste arquivo e renomeie-o para o nome da nova página.
 *      Exemplo: Para criar uma página "Sobre", renomeie para `about.php`.
 *
 * 2. **Edite o Conteúdo**:
 *    - Substitua o conteúdo da variável `$content` pelo HTML da nova página.
 *    - Exemplo:
 *      $content = '
 *      <div class="row">
 *        <h1>Sobre Nós</h1>
 *        <p>Bem-vindo à página Sobre Nós!</p>
 *      </div>
 *      ';
 *
 * 3. **Inclua o Layout Base**:
 *    - Certifique-se de que a linha abaixo está presente no final do arquivo:
 *      include '../src/Views/layouts/layout.php';
 *
 * 4. **Teste a Página**:
 *    - Acesse a nova página no navegador usando a URL correspondente.
 *      Exemplo: http://localhost/Projeto/src/Views/pages/about.php
 *
 * Observação:
 * - Este template utiliza o layout base localizado em `src/Views/layouts/layout.php`.
 * - O layout base já inclui o menu, navbar e rodapé, garantindo consistência em todas as páginas.
 */

// Exemplo de conteúdo para a página
$content = '
<div class="row">
  <h1>Bem-vindo à Página Inicial</h1>
</div>
';

// Inclui o layout base
include '../src/Views/layouts/layout.php';
?>