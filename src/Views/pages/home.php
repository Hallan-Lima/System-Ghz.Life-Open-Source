<!-- Layout wrapper -->
<div class="layout-wrapper layout-content-navbar">
  <div class="layout-container">
    <!-- Menu -->

    <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
      <div class="app-brand demo">
        <a href="index.html" class="app-brand-link">
          <span class="app-brand-text demo menu-text fw-bolder ms-2">Sneat</span>
        </a>

        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
          <i class="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
      </div>

      <div class="menu-inner-shadow"></div>
      <ul class="menu-inner py-1 overflow-auto" id="navbar_first"></ul>
    </aside>
    <!-- / Menu -->

    <!-- Layout container -->
    <div class="layout-page">

      <!-- Navbar-profile -->
      <?php include_once '../src/Views/layouts/navbar-profile.php'; ?>
      <!-- / Navbar-profile -->

      <!-- Content wrapper -->
      <div class="content-wrapper">
        <!-- Content -->

        <div class="container-xxl flex-grow-1 container-p-y">
          <div class="row">

          </div>
          <!-- / Content -->
           
          <!-- Footer -->
          <footer class="content-footer footer bg-footer-theme" style="margin-block-end: 15%;" id="footer_nav">
          </footer>
          <!-- / Footer -->

          <nav class="navbar fixed-bottom navbar-light bg-light" id="navbar_two">
          </nav>

          <div class="content-backdrop fade"></div>
        </div>
        <!-- Content wrapper -->
      </div>
      <!-- / Layout page -->
    </div>


  </div>
  <!-- / Layout wrapper -->