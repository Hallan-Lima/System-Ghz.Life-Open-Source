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
                <img src="../assets/img/avatars/default_profile.png" alt class="w-px-40 h-auto rounded-circle" />
                </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li>
                <a class="dropdown-item" href="#">
                    <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                        <div class="avatar avatar-online">
                        <img src="../assets/img/avatars/default_profile.png" alt class="w-px-40 h-auto rounded-circle" />
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

function createMenuFromData(menuData, currentPage) {
  const navbarFirst = document.getElementById('menu_data');
  navbarFirst.innerHTML = '';

  menuData.forEach(item => {
    if (item.type === 'header') {
      navbarFirst.appendChild(createMenuHeader(item.text));
    } else if (item.type === 'item') {
      navbarFirst.appendChild(
        createMenuItem(item.href, item.icon, item.text, item.subItems || [], currentPage)
      );
    }
  });
}

// Funções auxiliares (mantidas iguais)
function createMenuItem(href, iconClass, text, subItems = [], currentPage) {
  const isActive = (href === currentPage) ? 'active' : '';
  const isSubmenu = subItems.length > 0;
  const menuItem = document.createElement('li');
  menuItem.className = `menu-item ${isActive}`;
  const link = document.createElement('a');
  link.className = 'menu-link';
  if (!isSubmenu) {
    link.href = href;
  } else {
    link.setAttribute('data-bs-toggle', 'collapse');
    const submenuId = `submenu-${text.toLowerCase().replace(/\s+/g, '-')}`;
    link.setAttribute('data-bs-target', `#${submenuId}`);
  }
  link.innerHTML = `
      <i class="menu-icon tf-icons ${iconClass}"></i>
      <div data-i18n="${text}">${text}</div>
  `;
  if (isSubmenu) {
    const arrowIcon = document.createElement('i');
    arrowIcon.className = 'bx bx-chevron-down ms-auto';
    link.appendChild(arrowIcon);
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

// Nova função para montar o menu a partir do span oculto
function montarMenuDinamico() {
  const span = document.getElementById('menu_data');
  if (!span) return;
  let menuData;
  try {
    menuData = JSON.parse(span.textContent || span.innerText);
  } catch (e) {
    console.error('Erro ao interpretar menu_data:', e);
    return;
  }
  const currentPage = window.location.pathname.split('/').pop();
  createMenuFromData(menuData, currentPage);
}

// Chame a função após o DOM estar pronto
document.addEventListener('DOMContentLoaded', function() {
  montarMenuDinamico();
  // Inicializa todos os dropdowns do Bootstrap
  var dropdowns = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
  dropdowns.map(function(dropdownToggle) {
    new bootstrap.Dropdown(dropdownToggle);
  });
});


substituirElementoNavbar_two();
substituirElementoFooter_nav();



