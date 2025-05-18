<!-- Menu -->
<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
        <a href="#" class="app-brand-link gap-2">
            <span class="app-brand-text demo text-body fw-bolder" id="Brand-Logo">Ghz.Life</span>
        </a>
        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i class="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1 overflow-auto">

    <?php
    // Exibe os menus
    $userId = $_SESSION['user_id'] ?? 1; // ID do usuário logado
    if ($userId != null) {
        require_once __DIR__ . '/../../Models/MenuAccess.php';
        $menuData = getMenuAccess($userId);
        echo "<span id='menu_data'>".json_encode($menuData)."</span>";
    }
    ?>

    </ul>
</aside>
<!-- / Menu -->