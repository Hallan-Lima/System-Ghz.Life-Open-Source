<!-- Layout wrapper -->
<div class="layout-wrapper layout-content-navbar">
  <div class="layout-container">
    <?php include_once '../src/Views/layouts/menu.php'; ?>
    <!-- Layout container -->
    <div class="layout-page">
      <?php include_once '../src/Views/layouts/navbar-profile.php'; ?>
      <!-- Content wrapper -->
      <div class="content-wrapper">

        <div class="container-xxl flex-grow-1 container-p-y">
          <!-- Content -->
          <?php if (isset($content)) echo $content; ?>
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
    </div>
  </div>
</div>
<!-- / Layout wrapper -->