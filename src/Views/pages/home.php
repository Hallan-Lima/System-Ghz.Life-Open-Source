<!-- filepath: p:\xampp\htdocs\www\Projeto\src\Views\pages\home.php -->
<?php
$content = '
<div class="row">
  <div class="col-lg-6 col-md-12 col-6 mb-4">
    <div class="card">
      <div class="card-body">
        <div class="card-title d-flex align-items-start justify-content-between">
          <div class="avatar flex-shrink-0">
            <img src="./assets/img/icons/unicons/chart-success.png" alt="chart success" class="rounded">
          </div>
          <div class="dropdown">
            <button class="btn p-0" type="button" id="cardOpt3" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
              <a class="dropdown-item" href="javascript:void(0);">Ver mais</a>
              <a class="dropdown-item" href="javascript:void(0);">Editar Widgets</a>
            </div>
          </div>
        </div>
        <span class="fw-semibold d-block mb-1">Widget - 1</span>
        <h3 class="card-title mb-2">informações relavantes</h3>
        <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i>1234</small>
      </div>
    </div>
  </div>
  <div class="col-lg-6 col-md-12 col-6 mb-4">
    <div class="card">
      <div class="card-body">
        <div class="card-title d-flex align-items-start justify-content-between">
          <div class="avatar flex-shrink-0">
            <img src="./assets/img/icons/unicons/wallet-info.png" alt="Credit Card" class="rounded">
          </div>
          <div class="dropdown">
            <button class="btn p-0" type="button" id="cardOpt6" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
              <a class="dropdown-item" href="javascript:void(0);">Ver mais</a>
              <a class="dropdown-item" href="javascript:void(0);">Editar Widgets</a>
            </div>
          </div>
        </div>
        <span>Widget - 2</span>
        <h3 class="card-title text-nowrap mb-1">informações relavante</h3>
        <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i>1234</small>
      </div>
    </div>
  </div>
</div>
';
include '../src/Views/layouts/layout.php';
?>