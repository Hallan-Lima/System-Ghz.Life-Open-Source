<!-- filepath: p:\xampp\htdocs\www\Projeto\src\Views\pages\home.php -->
<?php
$content = '

<div class="row">
  <div class="col-md-12">
    <div class="card mb-4">
      <h5 class="card-header">Funcionalidades</h5>
      <!-- Account -->
      <div class="card-body">
        <div class="d-flex align-items-start align-items-sm-center gap-4">
        </div>
      </div>
      <hr class="my-0" />
      <div class="card-body">
        <!-- Módulo Financeiro -->
        <div class="accordion" id="financeiroAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFinanceiro">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFinanceiro" aria-expanded="false" aria-controls="collapseFinanceiro">
                Módulo Financeiro
              </button>
            </h2>
            <div id="collapseFinanceiro" class="accordion-collapse collapse" aria-labelledby="headingFinanceiro" data-bs-parent="#financeiroAccordion">
              <div class="accordion-body">
                <form id="formFinanceiro" method="POST" onsubmit="return false">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="financeiroFlag1" name="financeiroFlag1">
                    <label class="form-check-label" for="financeiroFlag1">Ativar funcionalidade 1</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="financeiroFlag2" name="financeiroFlag2">
                    <label class="form-check-label" for="financeiroFlag2">Ativar funcionalidade 2</label>
                  </div>
                  <div class="mt-2">
                    <button type="submit" class="btn btn-primary me-2">Salvar alterações</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- /Módulo Financeiro -->

        <!-- Módulo Agenda -->
        <div class="accordion mt-4" id="agendaAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingAgenda">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAgenda" aria-expanded="false" aria-controls="collapseAgenda">
                Módulo Agenda
              </button>
            </h2>
            <div id="collapseAgenda" class="accordion-collapse collapse" aria-labelledby="headingAgenda" data-bs-parent="#agendaAccordion">
              <div class="accordion-body">
                <form id="formAgenda" method="POST" onsubmit="return false">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="agendaFlag1" name="agendaFlag1">
                    <label class="form-check-label" for="agendaFlag1">Ativar funcionalidade 1</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="agendaFlag2" name="agendaFlag2">
                    <label class="form-check-label" for="agendaFlag2">Ativar funcionalidade 2</label>
                  </div>
                  <div class="mt-2">
                    <button type="submit" class="btn btn-primary me-2">Salvar alterações</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- /Módulo Agenda -->
      </div>
      <!-- /Account -->
    </div>
  </div>
</div>

';
include '../src/Views/layouts/layout.php';
?>