<nav
    class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
    id="layout-navbar">
    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
            <i class="bx bx-menu bx-sm"></i>
        </a>
    </div>

    <div class="navbar-nav-right d-flex align-items-center w-100" id="navbar-collapse">
        <!-- Notificação -->
        <div class="d-flex align-items-center position-relative">
            <a href="javascript:void(0);" class="nav-link">
                <i class="bx bx-bell bx-sm"></i>
            </a>
        </div>

        <!-- Saldo -->
        <div class="d-flex align-items-center justify-content-center flex-grow-1">
            <a href="javascript:void(0);" id="toggle-saldo" class="ms-2 d-flex align-items-center">
                <i class="bx bx-show bx-sm"></i>
            </a>
            <span id="saldo-value" class="ms-2">****</span>
        </div>
        
        <!-- User -->
        <div class="d-flex align-items-center">
            <div class="nav-item navbar-dropdown dropdown-user dropdown">
                <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <div class="avatar avatar-online">
                        <img src="assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                    </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <a class="dropdown-item" href="#">
                            <div class="d-flex">
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
                        <a class="dropdown-item" href="profile">
                            <i class="bx bx-user me-2"></i>
                            <span class="align-middle">Meu Perfil</span>
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="config-functions-system">
                            <i class="bx bx-cog me-2"></i>
                            <span class="align-middle">Configurações</span>
                        </a>
                    </li>
                    <li>
                        <div class="dropdown-divider"></div>
                    </li>
                    <li>
                        <a class="dropdown-item" href="login">
                            <i class="bx bx-power-off me-2"></i>
                            <span class="align-middle">Sair</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!--/ User -->
    </div>
</nav>