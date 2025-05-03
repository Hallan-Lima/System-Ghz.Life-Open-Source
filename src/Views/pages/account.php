<!-- filepath: p:\xampp\htdocs\www\Projeto\src\Views\pages\home.php -->
<?php
$content = '

<!-- Contas -->
<div class="card">
    <h5 class="card-header d-flex justify-content-between align-items-center">
        <span>Contas</span>
        <div class="d-flex align-items-center">
            <button class="btn btn-primary btn-sm me-2">Transferir Saldo</button>
            <button class="btn btn-primary btn-sm me-2">Importar</button>
            <button class="btn btn-primary btn-sm me-2">Incluir Despesa</button>
            <button class="btn btn-success btn-sm me-2">Incluir Receita</button>
            <button class="btn btn-secondary btn-sm me-2">Abrir Filtro</button>
            <button class="btn btn-info btn-sm me-2">Selecionar Período</button>
            <button class="btn btn-warning btn-sm">Limpar Filtros</button>
        </div>
    </h5>
    <div class="table-responsive text-nowrap">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>IMG</th>
            <th>NOME DA CONTA E SALDO</th>
            <th>ULTIMA MOVIMENTAÇÃO</th>
            <th>QT. MOVIMENTAÇÕES</th>
            <th>SAIDAS</th>
            <th>ENTRADAS</th>
            <th>STATUS</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>
        <tbody class="table-border-bottom-0">
          <tr>
            <td>
                <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                    class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                    <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                    </li>
                </ul>
            </td>
            <td><strong>Nome do banco</strong><br> $$ <span class="badge bg-label-danger me-1"> - 999.999.999,00</span></td>
            <td>dd/mm/yyyy</td>
            <td>123</td>
            <td>456</td>
            <td>789</td>
            <td><span class="badge bg-label-success me-1">Ativo</span></td>
            <td>
              <div class="dropdown">
                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                  <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Conta</a>
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Reajuste de Saldo</a>
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Incluir Despesa</a>
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Incluir Receita</a>
                </div>
              </div>
            </td>
          <tr>
            <td>
                <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                    class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                    <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                    </li>
                </ul>
            </td>
            <td><strong>Nome do banco</strong><br> $$ <span class="badge bg-label-success me-1">999.999.999,00</span></td>
            <td>dd/mm/yyyy</td>
            <td>123</td>
            <td>456</td>
            <td>789</td>
            <td><span class="badge bg-label-success me-1">Ativo</span></td>
            <td>
              <div class="dropdown">
                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                  <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Conta</a>
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Reajuste de Saldo</a>
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Incluir Despesa</a>
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Incluir Receita</a>
                </div>
              </div>
            </td>
          <tr>
            <td>
                <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                    class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                    <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                    </li>
                </ul>
            </td>
            <td><strong>Nome do banco</strong><br> $$ <span class="badge bg-label-success me-1">999.999.999,00</span></td>
            <td>dd/mm/yyyy</td>
            <td>123</td>
            <td>456</td>
            <td>789</td>
            <td><span class="badge bg-label-danger me-1">Inativo</span></td>
            <td>
              <div class="dropdown">
                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                  <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Conta</a>
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Reajuste de Saldo</a>
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Incluir Despesa</a>
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Incluir Receita</a>
                </div>
              </div>
            </td>
          <tr>
            <td>
                <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                    class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                    <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                    </li>
                </ul>
            </td>
            <td><strong>Nome do banco</strong><br> $$ <span class="badge bg-label-success me-1">999.999.999,00</span></td>
            <td>dd/mm/yyyy</td>
            <td>123</td>
            <td>456</td>
            <td>789</td>
            <td><span class="badge bg-label-success me-1">Ativo</span></td>
            <td>
              <div class="dropdown">
                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                  <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Conta</a>
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Reajuste de Saldo</a>
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Incluir Despesa</a>
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Incluir Receita</a>
                </div>
              </div>
            </td>
        </tbody>
      </table>
        <div class="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation">
                <ul class="pagination pagination-sm">
                <li class="page-item prev">
                <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-left"></i></a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">1</a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">2</a>
                </li>
                <li class="page-item active">
                <a class="page-link" href="javascript:void(0);">3</a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">4</a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">5</a>
                </li>
                <li class="page-item next">
                <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-right"></i></a>
                </li>
                </ul>
            </nav>
        </div>
    </div>
</div>
<!-- / Contas -->

<!-- Transações -->
<div class="card mt-4">
    <h5 class="card-header d-flex justify-content-between align-items-center">
        <span>Transações</span>
    </h5>
    <div class="table-responsive text-nowrap">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>IMG</th>
            <th>NOME E TAG</th>
            <th>DATA</th>
            <th>CONTA</th>
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>
        <tbody class="table-border-bottom-0">
            <tr>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><strong>Nome da despesa</strong><br> Tags</td>
                <td>dd/mm/yyyy</td>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><br> $$ <span class="badge bg-label-success me-1">999.999.999,00</span></td>
                <td>
                <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Movimentação</a>
                    </div>
                </div>
                </td>
            </tr>
            <tr>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><strong>Nome da despesa</strong><br> Tags</td>
                <td>dd/mm/yyyy</td>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><br> $$ <span class="badge bg-label-danger me-1">999.999.999,00</span></td>
                <td>
                <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Movimentação</a>
                    </div>
                </div>
                </td>
            </tr>
            <tr>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><strong>Nome da despesa</strong><br> Tags</td>
                <td>dd/mm/yyyy</td>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><br> $$ <span class="badge bg-label-success me-1">999.999.999,00</span></td>
                <td>
                <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Movimentação</a>
                    </div>
                </div>
                </td>
            </tr>
       
        </tbody>
      </table>
        <div class="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation">
                <ul class="pagination pagination-sm">
                <li class="page-item prev">
                <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-left"></i></a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">1</a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">2</a>
                </li>
                <li class="page-item active">
                <a class="page-link" href="javascript:void(0);">3</a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">4</a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">5</a>
                </li>
                <li class="page-item next">
                <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-right"></i></a>
                </li>
                </ul>
            </nav>
        </div>
    </div>
</div>
<!-- / Transações -->

<!-- Pendentes Receitas -->
<div class="card mt-4">
    <h5 class="card-header d-flex justify-content-between align-items-center">
        <span>Pendentes Receitas</span>
    </h5>
    <div class="table-responsive text-nowrap">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>IMG</th>
            <th>NOME E TAG</th>
            <th>VENCIMENTO</th>
            <th>CONTA</th>
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>
        <tbody class="table-border-bottom-0">
            <tr>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><strong>Nome da despesa</strong><br> Tags</td>
                <td><span class="badge bg-label-success me-1">dd/mm/yyyy</span></td>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><br> $$ 999.999.999,00</td>
                <td>
                <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Movimentação</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Efetivar</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Excluir</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Duplicar</a>
                    </div>
                </div>
                </td>
            </tr>
            <tr>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><strong>Nome da despesa</strong><br> Tags</td>
                <td><span class="badge bg-label-danger me-1">dd/mm/yyyy</span></td>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><br> $$ 999.999.999,00</td>
                <td>
                <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Movimentação</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Efetivar</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Excluir</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Duplicar</a>
                    </div>
                </div>
                </td>
            </tr>
            <tr>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><strong>Nome da despesa</strong><br> Tags</td>
                <td><span class="badge bg-label-success me-1">dd/mm/yyyy</span></td>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><br> $$ 999.999.999,00</td>
                <td>
                <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Movimentação</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Efetivar</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Excluir</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Duplicar</a>
                    </div>
                </div>
                </td>
            </tr>
       
        </tbody>
      </table>
        <div class="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation">
                <ul class="pagination pagination-sm">
                <li class="page-item prev">
                <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-left"></i></a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">1</a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">2</a>
                </li>
                <li class="page-item active">
                <a class="page-link" href="javascript:void(0);">3</a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">4</a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">5</a>
                </li>
                <li class="page-item next">
                <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-right"></i></a>
                </li>
                </ul>
            </nav>
        </div>
    </div>
</div>
<!-- / Pendentes Receitas -->

<!-- Pendentes Despesas -->
<div class="card mt-4">
    <h5 class="card-header d-flex justify-content-between align-items-center">
        <span>Pendentes Despesas</span>
    </h5>
    <div class="table-responsive text-nowrap">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>IMG</th>
            <th>NOME E TAG</th>
            <th>VENCIMENTO</th>
            <th>CONTA</th>
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>
        <tbody class="table-border-bottom-0">
            <tr>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><strong>Nome da despesa</strong><br> Tags</td>
                <td><span class="badge bg-label-success me-1">dd/mm/yyyy</span></td>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><br> $$ 999.999.999,00</td>
                <td>
                <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Movimentação</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Efetivar</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Excluir</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Duplicar</a>
                    </div>
                </div>
                </td>
            </tr>
            <tr>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><strong>Nome da despesa</strong><br> Tags</td>
                <td><span class="badge bg-label-danger me-1">dd/mm/yyyy</span></td>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><br> $$ 999.999.999,00</td>
                <td>
                <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Movimentação</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Efetivar</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Excluir</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Duplicar</a>
                    </div>
                </div>
                </td>
            </tr>
            <tr>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><strong>Nome da despesa</strong><br> Tags</td>
                <td><span class="badge bg-label-success me-1">dd/mm/yyyy</span></td>
                <td>
                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                        <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                        </li>
                    </ul>
                </td>
                <td><br> $$ 999.999.999,00</td>
                <td>
                <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar Movimentação</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Efetivar</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Excluir</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Duplicar</a>
                    </div>
                </div>
                </td>
            </tr>
       
        </tbody>
      </table>
        <div class="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation">
                <ul class="pagination pagination-sm">
                <li class="page-item prev">
                <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-left"></i></a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">1</a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">2</a>
                </li>
                <li class="page-item active">
                <a class="page-link" href="javascript:void(0);">3</a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">4</a>
                </li>
                <li class="page-item">
                <a class="page-link" href="javascript:void(0);">5</a>
                </li>
                <li class="page-item next">
                <a class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-right"></i></a>
                </li>
                </ul>
            </nav>
        </div>
    </div>
</div>
<!-- / Pendentes Despesas -->


';
include '../src/Views/layouts/layout.php';
?>