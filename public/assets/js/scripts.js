function createMenuItem(href, iconClass, text, subItems = [], currentPage) {
  const isActive = (href === currentPage) ? 'active' : '';
  const isSubmenu = subItems.length > 0;

  // Cria o elemento <li> do menu
  const menuItem = document.createElement('li');
  menuItem.className = `menu-item ${isActive}`; // Removido 'menu-toggle'

  // Cria o link do menu
  const link = document.createElement('a');
  link.className = 'menu-link';
  if (!isSubmenu) {
    link.href = href;
  } else {
    link.setAttribute('data-bs-toggle', 'collapse');
    const submenuId = `submenu-${text.toLowerCase().replace(/\s+/g, '-')}`;
    link.setAttribute('data-bs-target', `#${submenuId}`);
  }

  // Adiciona o ícone e o texto do menu
  link.innerHTML = `
      <i class="menu-icon tf-icons ${iconClass}"></i>
      <div data-i18n="${text}">${text}</div>
  `;

  // Adiciona a seta apenas se for um submenu
  if (isSubmenu) {
    const arrowIcon = document.createElement('i');
    arrowIcon.className = 'bx bx-chevron-down ms-auto';
    link.appendChild(arrowIcon);

    // Cria o submenu
    const submenu = document.createElement('ul');
    submenu.className = 'collapse';
    submenu.id = `submenu-${text.toLowerCase().replace(/\s+/g, '-')}`;

    subItems.forEach(subItem => {
      const subListItem = document.createElement('li');
      subListItem.className = 'menu-item';

      const subLink = document.createElement('a');
      subLink.className = 'menu-link';
      subLink.href = subItem.href;
      subLink.innerHTML = `<div data-i18n="${subItem.text}">${subItem.text}</div>`;

      subListItem.appendChild(subLink);
      submenu.appendChild(subListItem);
    });

    menuItem.appendChild(link);
    menuItem.appendChild(submenu);

    // Adiciona evento de clique para alternar a seta
    link.addEventListener('click', function () {
      arrowIcon.classList.toggle('bx-chevron-down');
      arrowIcon.classList.toggle('bx-chevron-up');
    });
  } else {
    menuItem.appendChild(link);
  }

  return menuItem;
}

function createMenuHeader(text) {
  const header = document.createElement('li');
  header.className = 'menu-header small text-uppercase';
  header.innerHTML = `<span class="menu-header-text">${text}</span>`;
  return header;
}

function substituirElementoNavbar_first() {
  const navbarFirst = document.getElementById('navbar_first');
  navbarFirst.innerHTML = '';

  const currentPage = window.location.pathname.split('/').pop();
  const idProfile = 1;

  // Item Home
  navbarFirst.appendChild(
      createMenuItem('home', 'bx bx-home-circle', 'Home', [], currentPage)
  );

  // Módulo 1 - Financeiro
  navbarFirst.appendChild(createMenuHeader('Financeiro'));
  navbarFirst.appendChild(
      createMenuItem('account', 'bx bx-collection', 'Contas', [], currentPage)
  );
  navbarFirst.appendChild(
      createMenuItem('#', 'bx bx-collection', 'Receber', [], currentPage)
  );
  navbarFirst.appendChild(
      createMenuItem('#', 'bx bx-collection', 'Pagar', [], currentPage)
  );
  navbarFirst.appendChild(
      createMenuItem('#', 'bx bx-collection', 'Transações', [], currentPage)
  );
  navbarFirst.appendChild(
      createMenuItem('#', 'bx bx-collection', 'Cartão de Credito', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Configuração', [], currentPage)
);


  // Módulo 2 - Listas com submenus
  navbarFirst.appendChild(createMenuHeader('Listas'));
  navbarFirst.appendChild(
      createMenuItem('javascript:void(0);', 'bx bx-dock-top', 'Metas Pessoais', [
          { href: '#', text: 'Itens' },
          { href: '#', text: 'Cadastrar' }
      ], currentPage)
  );
  navbarFirst.appendChild(
      createMenuItem('javascript:void(0);', 'bx bx-dock-top', 'Comprar', [
          { href: '#', text: 'Itens' },
          { href: '#', text: 'Cadastrar' }
      ], currentPage)
  );

  // Módulo 3 - Timer
  navbarFirst.appendChild(createMenuHeader('Timer'));
  navbarFirst.appendChild(
      createMenuItem('#', 'bx bx-collection', 'Pomodoro', [], currentPage)
  );
  navbarFirst.appendChild(
      createMenuItem('#', 'bx bx-collection', 'Cronometro', [], currentPage)
  );

  // Módulo 4 - Listas de itens relacionados a calendario
  navbarFirst.appendChild(createMenuHeader('Calendário'));
  navbarFirst.appendChild(
      createMenuItem('javascript:void(0);', 'bx bx-dock-top', 'Acompanhar', [
          { href: '#', text: 'Academia' },
          { href: '#', text: 'Controle de Marcações' },
          { href: '#', text: 'Alimentação' }
      ], currentPage)
  );
  navbarFirst.appendChild(
      createMenuItem('javascript:void(0);', 'bx bx-dock-top', 'Despertador', [
          { href: '#', text: 'Monitoramento Sono' },
          { href: '#', text: 'Listar Itens' },
          { href: '#', text: 'Incluir Itens' }
      ], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Acompanhar Menstruação', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Agenda', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Tarefas', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Lembretes', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Eventos', [], currentPage)
  );

  // Módulo 5 - Listas de itens relacionados a matematica
  navbarFirst.appendChild(createMenuHeader('Calculadora'));
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Básica', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Cientifica', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Financeira', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Conversores', [], currentPage)
  );
  

  // Módulo 6 - Listas de itens relacionados a Social
  navbarFirst.appendChild(createMenuHeader('Social'));
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Assistente Pessoal', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Enquetes', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Pesquisas', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'Sugestões', [], currentPage)
  );
  

  // Módulo 7 - Listas de itens relacionados a configurações
  navbarFirst.appendChild(createMenuHeader('Configurações'));
  navbarFirst.appendChild(
    createMenuItem('profile', 'bx bx-collection', 'Perfil', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('config-functions-system', 'bx bx-collection', 'Funcionalidades', [], currentPage)
  );
  navbarFirst.appendChild(
    createMenuItem('#', 'bx bx-collection', 'IA', [], currentPage)
  );
  

}

function substituirElementoNavbara_first() {
  var spanElement = document.getElementById('navbar_first');
  
  var novo = `
          <li class="menu-item active">
            <a href="home" class="menu-link">
              <i class="menu-icon tf-icons bx bx-home-circle"></i>
              <div data-i18n="Analytics">Home</div>
            </a>
          </li>

          <!-- ... (todo o restante do menu permanece igual) ... -->
          
          <div id="Modulo_2">
            <li class="menu-header small text-uppercase">
              <span class="menu-header-text">Listas</span>
            </li>
            <li class="menu-item">
              <a href="javascript:void(0);" class="menu-link" data-bs-toggle="collapse" data-bs-target="#submenu-metas">
                <i class="menu-icon tf-icons bx bx-dock-top"></i>
                <div data-i18n="Metas Pessoais">Metas Pessoais</div>
              </a>
              <ul class="collapse" id="submenu-metas">
                <li class="menu-item">
                  <a href="pages-account-settings-account.html" class="menu-link">
                    <div data-i18n="Itens">Itens</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="pages-account-settings-notifications.html" class="menu-link">
                    <div data-i18n="Cadastrar">Cadastrar</div>
                  </a>
                </li>
              </ul>
            </li>
            <!-- ... -->
  `;
  spanElement.innerHTML = novo;
}

function substituirElementoNavbar_two() {
    var elemento = document.getElementById('navbar_two');

    var novo = `
        <ul class="nav navbar-nav d-flex flex-row justify-content-around w-100">
            <li class="nav-item">
            <i class="menu-icon tf-icons bx bx-collection"></i>
            </li>
            <li class="nav-item">
            <i class="menu-icon tf-icons bx bx-collection"></i>
            </li>
            <li class="nav-item">
            <i class="bx bx-menu bx-sm"></i>
            </li>
            <li class="nav-item">
            <i class="menu-icon tf-icons bx bx-collection"></i>
            </li>
            <li class="nav-item">
            <i class="menu-icon tf-icons bx bx-collection"></i>
            </li>
        </ul>
    `;

    elemento.innerHTML = novo;
    
}
function substituirElementoFooter_nav() {
    var elemento = document.getElementById('footer_nav');
    var anoAtual = new Date().getFullYear();

    var novo = `
        <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column" >
            <div class="mb-2 mb-md-0">
            ©
            `+anoAtual+`
            , Desenvolvido por HallTech
            <a href="https://themeselection.com" target="_blank" class="footer-link fw-bolder"> | Tema</a>
            </div>
            <div>
            <a href="https://themeselection.com/license/" class="footer-link me-4" target="_blank">License</a>
            <a href="https://themeselection.com/" target="_blank" class="footer-link me-4">More Themes</a>

            <a
                href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                target="_blank"
                class="footer-link me-4"
                >Documentation</a
            >

            <a
                href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                target="_blank"
                class="footer-link me-4"
                >Support</a
            >
            </div>
        </div>
    `;

    elemento.innerHTML = novo;
    
}
function substituirElementoNavbar_collapse() {
    var elemento = document.getElementById('navbar-collapse');

    var novo = `
        <ul class="navbar-nav flex-row align-items-center ms-auto">
            <!-- User -->
            <li class="nav-item navbar-dropdown dropdown-user dropdown">
            <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                <div class="avatar avatar-online">
                <img src="../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li>
                <a class="dropdown-item" href="#">
                    <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                        <div class="avatar avatar-online">
                        <img src="../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                        </div>
                    </div>
                    <div class="flex-grow-1">
                        <span class="fw-semibold d-block">John Doe</span>
                        <small class="text-muted">Admin</small>
                    </div>
                    </div>
                </a>
                </li>
                <li>
                <div class="dropdown-divider"></div>
                </li>
                <li>
                <a class="dropdown-item" href="#">
                    <i class="bx bx-user me-2"></i>
                    <span class="align-middle">My Profile</span>
                </a>
                </li>
                <li>
                <a class="dropdown-item" href="#">
                    <i class="bx bx-cog me-2"></i>
                    <span class="align-middle">Settings</span>
                </a>
                </li>
                <li>
                <a class="dropdown-item" href="#">
                    <span class="d-flex align-items-center align-middle">
                    <i class="flex-shrink-0 bx bx-credit-card me-2"></i>
                    <span class="flex-grow-1 align-middle">Billing</span>
                    <span class="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                    </span>
                </a>
                </li>
                <li>
                <div class="dropdown-divider"></div>
                </li>
                <li>
                <a class="dropdown-item" href="auth-login-basic.html">
                    <i class="bx bx-power-off me-2"></i>
                    <span class="align-middle">Log Out</span>
                </a>
                </li>
            </ul>
            </li>
            <!--/ User -->
        </ul>
    `;

    elemento.innerHTML = novo;
    
}

substituirElementoNavbar_first();
substituirElementoNavbar_two();
substituirElementoFooter_nav();

// scripts.js (adicionar no final)
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa todos os dropdowns do Bootstrap
  var dropdowns = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
  dropdowns.map(function(dropdownToggle) {
    new bootstrap.Dropdown(dropdownToggle);
  });
});





