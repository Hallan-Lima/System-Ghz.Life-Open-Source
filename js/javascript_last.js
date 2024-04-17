function substituirElementoNavbar_first() {
    // Seleciona o elemento span existente
    var spanElement = document.getElementById('navbar_first');


    // Define o novo conteúdo HTML que substituirá o elemento span

    var novo = `
            <li class="menu-item active">
              <a href="index.html" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Home</div>
              </a>
            </li>

            <div id="Modulo_1">
                <li class="menu-header small text-uppercase">
                  <span class="menu-header-text">Financeiro</span>
                </li>
                <li class="menu-item">
                  <a href="cards-basic.html" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Contas">Contas</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="cards-basic.html" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Basic">Receber</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="cards-basic.html" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Basic">Pagar</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="cards-basic.html" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Basic">Transações</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="cards-basic.html" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Basic">Cartão de Credito</div>
                  </a>
                </li>
            </div>
            
            <div id="Modulo_2">
              <li class="menu-header small text-uppercase">
                <span class="menu-header-text">Listas</span>
              </li>
              <li class="menu-item">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                  <i class="menu-icon tf-icons bx bx-dock-top"></i>
                  <div data-i18n="Metas Pessoais">Metas Pessoais</div>
                </a>
                <ul class="menu-sub">
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
              <li class="menu-item">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                  <i class="menu-icon tf-icons bx bx-dock-top"></i>
                  <div data-i18n="Comprar">Comprar</div>
                </a>
                <ul class="menu-sub">
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
            </div>

            <div id="Modulo_3">
              <li class="menu-header small text-uppercase">
                <span class="menu-header-text">Timer</span>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Basic">Pomodoro</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Basic">Cronometro</div>
                </a>
              </li>
            </div>

            <div id="Modulo_4">
              <li class="menu-header small text-uppercase">
                <span class="menu-header-text">Calendário</span>
              </li>
              <li class="menu-item">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                  <i class="menu-icon tf-icons bx bx-dock-top"></i>
                  <div data-i18n="Acompanhar">Acompanhar</div>
                </a>
                <ul class="menu-sub">
                  <li class="menu-item">
                    <a href="pages-account-settings-account.html" class="menu-link">
                      <div data-i18n="Academia">Academia</div>
                    </a>
                  </li>
                  <li class="menu-item">
                    <a href="pages-account-settings-notifications.html" class="menu-link">
                      <div data-i18n="Alimentação">Alimentação</div>
                    </a>
                  </li>
                  <li class="menu-item">
                    <a href="pages-account-settings-notifications.html" class="menu-link">
                      <div data-i18n="Controle de Marcações">Controle de Marcações</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="menu-item">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                  <i class="menu-icon tf-icons bx bx-dock-top"></i>
                  <div data-i18n="Despertador">Despertador</div>
                </a>
                <ul class="menu-sub">
                  <li class="menu-item">
                    <a href="pages-account-settings-account.html" class="menu-link">
                      <div data-i18n="Monitoramento Sono">Monitoramento Sono</div>
                    </a>
                  </li>
                  <li class="menu-item">
                    <a href="pages-account-settings-notifications.html" class="menu-link">
                      <div data-i18n="Listar Itens">Listar Itens</div>
                    </a>
                  </li>
                  <li class="menu-item">
                    <a href="pages-account-settings-notifications.html" class="menu-link">
                      <div data-i18n="Incluir Itens">Incluir Itens</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Acompanhar Menstruação">Acompanhar Menstruação</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Agenda">Agenda</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Tarefas">Tarefas</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Lembretes">Lembretes</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Eventos">Eventos</div>
                </a>
              </li>

            </div>

            <div id="Modulo_5">
              <li class="menu-header small text-uppercase">
                <span class="menu-header-text">Calculadora</span>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Básica">Básica</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Cientifica">Cientifica</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Financeira">Financeira</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Conversores">Conversores</div>
                </a>
              </li>
            </div>

            <div id="Modulo_6">
              <li class="menu-header small text-uppercase">
                <span class="menu-header-text">Social</span>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Assistente Pessoal">Assistente Pessoal</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Enquetes">Enquetes</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Pesquisas">Pesquisas</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="cards-basic.html" class="menu-link">
                  <i class="menu-icon tf-icons bx bx-collection"></i>
                  <div data-i18n="Sugestões">Sugestões</div>
                </a>
              </li>
            </div>

            <div id="Modulo_geral">
                <li class="menu-header small text-uppercase">
                  <span class="menu-header-text">Configurações</span>
                </li>
                <li class="menu-item">
                  <a href="cards-basic.html" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Basic">Perfil</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="cards-basic.html" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Basic">Funcionalidades</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="cards-basic.html" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Basic">Pagina Principal</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="cards-basic.html" class="menu-link">
                    <i class="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Basic">IA</div>
                  </a>
                </li>
            </div>
  
    `
    // Substitui o conteúdo do elemento span pelo novo conteúdo HTML
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
