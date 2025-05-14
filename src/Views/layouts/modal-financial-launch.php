<!-- Modal -->
<div class="modal fade" id="incluirReceitaModal" tabindex="-1" aria-labelledby="incluirReceitaModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg"> <!-- Ajustado para modal maior -->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Form content for including a new income -->
                <form>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <div class="d-flex flex-wrap justify-content-between gap-2">
                                        <label class="btn btn-outline-primary flex-grow-1">
                                            <input type="radio" class="btn-check" name="tipo" value="receita" autocomplete="off" checked>
                                            Receita
                                        </label>
                                        <label class="btn btn-outline-secondary flex-grow-1">
                                            <input type="radio" class="btn-check" name="tipo" value="despesa" autocomplete="off">
                                            Despesa
                                        </label>
                                        <label class="btn btn-outline-success flex-grow-1">
                                            <input type="radio" class="btn-check" name="tipo" value="transferencia" autocomplete="off">
                                            Transferência
                                        </label>
                                    </div>
                                </div>
                                <div class="card-body demo-vertical-spacing demo-only-element">

                                    <!-- Input de valor e moeda -->
                                    <div class="input-group mb-3">
                                        <select class="form-select" id="coin" aria-label="coin">
                                            <option selected="0">R$</option>
                                            <option value="1">$</option>
                                            <option value="2">€</option>
                                            <option value="3">£</option>
                                        </select>
                                        <input type="number" class="form-control" placeholder="000.000,00" aria-label="000.000,00">
                                    </div>

                                    <!-- Categoria -->
                                    <div class="divider text-start mb-3">
                                        <div class="divider-text">Categoria</div>
                                        <div class="d-flex flex-wrap gap-2">
                                            <label class="btn btn-outline-primary">
                                                <input type="radio" class="btn-check" name="categoria" autocomplete="off" checked>
                                                <span class="tf-icons bx bx-pie-chart-alt"></span>
                                            </label>
                                            <label class="btn btn-outline-secondary">
                                                <input type="radio" class="btn-check" name="categoria" autocomplete="off">
                                                <span class="tf-icons bx bx-bell"></span>
                                            </label>
                                            <label class="btn btn-outline-primary">
                                                <input type="radio" class="btn-check" name="categoria" autocomplete="off">
                                                <span class="tf-icons bx bx-pie-chart-alt"></span>
                                            </label>
                                            <label class="btn btn-outline-secondary">
                                                <input type="radio" class="btn-check" name="categoria" autocomplete="off">
                                                <span class="tf-icons bx bx-bell"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <!-- Conta -->
                                    <div class="divider text-end mb-3">
                                        <div class="divider-text">Conta</div>
                                        <div class="d-flex flex-wrap gap-2 justify-content-end">
                                            <label class="btn btn-outline-primary active">
                                                <input type="radio" name="conta" class="btn-check" autocomplete="off" checked>
                                                <span class="tf-icons bx bx-pie-chart-alt"></span>
                                            </label>
                                            <label class="btn btn-outline-secondary">
                                                <input type="radio" name="conta" class="btn-check" autocomplete="off">
                                                <span class="tf-icons bx bx-bell"></span>
                                            </label>
                                            <label class="btn btn-outline-primary">
                                                <input type="radio" name="conta" class="btn-check" autocomplete="off">
                                                <span class="tf-icons bx bx-pie-chart-alt"></span>
                                            </label>
                                            <label class="btn btn-outline-secondary">
                                                <input type="radio" name="conta" class="btn-check" autocomplete="off">
                                                <span class="tf-icons bx bx-bell"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <!-- Tags -->
                                    <div id="section_tag" class="mb-3">
                                        <div class="card-header d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">Tag</h5>
                                        </div>
                                        <div class="mt-2 overflow-auto" style="white-space: nowrap;">
                                            <div class="d-inline-block me-2">
                                                <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="btncheck1">Tag_01</label>
                                            </div>
                                            <div class="d-inline-block me-2">
                                                <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="btncheck2">Tag_02</label>
                                            </div>
                                            <div class="d-inline-block me-2">
                                                <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="btncheck3">Tag_03</label>
                                            </div>
                                            <div class="d-inline-block me-2">
                                                <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="btncheck4">Tag_04</label>
                                            </div>
                                            <div class="d-inline-block me-2">
                                                <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="btncheck5">Tag_05</label>
                                            </div>
                                            <div class="d-inline-block me-2">
                                                <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="btncheck6">Tag_06</label>
                                            </div>
                                            <div class="d-inline-block me-2">
                                                <input type="checkbox" class="btn-check" id="btncheck7" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="btncheck7">Tag_07</label>
                                            </div>
                                            <div class="d-inline-block me-2">
                                                <input type="checkbox" class="btn-check" id="btncheck8" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="btncheck8">Tag_08</label>
                                            </div>
                                            <div class="d-inline-block me-2">
                                                <input type="checkbox" class="btn-check" id="btncheck9" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="btncheck9">Tag_09</label>
                                            </div>
                                            <div class="d-inline-block me-2">
                                                <input type="checkbox" class="btn-check" id="btncheck10" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="btncheck10">Tag_010</label>
                                            </div>
                                            <div class="d-inline-block me-2">
                                                <input type="checkbox" class="btn-check" id="btncheck11" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="btncheck11">Tag_011</label>
                                            </div>
                                            <div class="d-inline-block me-2">
                                                <input type="checkbox" class="btn-check" id="btncheck12" autocomplete="off">
                                                <label class="btn btn-outline-primary" for="btncheck12">Tag_012</label>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Parcelas e Recorrência -->
                                    <div class="row mb-3">
                                        <div class="col-3">
                                            <small class="text-light fw-semibold">Qt. Parcelas</small>
                                            <input type="number" class="form-control" id="parcelas" placeholder="0" aria-label="Parcelas">
                                        </div>
                                        <div class="col-auto">
                                            <small class="text-light fw-semibold">Recorrência:</small>
                                            <div class="input-group">
                                                <select class="form-select" id="recorrencia" aria-label="Recorrência">
                                                    <option selected="" value="">Selecione</option>
                                                    <option value="diario">Diário</option>
                                                    <option value="semanal">Semanal</option>
                                                    <option value="mensal">Mensal</option>
                                                    <option value="anual">Anual</option>
                                                    <option value="customizado">Customizado</option>
                                                </select>
                                                <input type="number" class="form-control d-none" id="recorrenciaCustomizada" placeholder="Intervalo (ex: 10)" aria-label="Intervalo de Recorrência">
                                                <select class="form-select d-none" id="recorrenciaUnidade" aria-label="Unidade de Recorrência">
                                                    <option value="dias">Dias</option>
                                                    <option value="semanas">Semanas</option>
                                                    <option value="meses">Meses</option>
                                                    <option value="anos">Anos</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Descrição -->
                                    <textarea class="form-control mb-3" placeholder="Descrição" rows="3"></textarea>

                                    <!-- Datas -->
                                    <div class="row mb-3">
                                        <div class="col">
                                            <small class="text-light fw-semibold">Efetuada</small>
                                            <input class="form-control" type="date" value="2021-06-18" id="date-input-1">
                                        </div>
                                        <div class="col">
                                            <small class="text-light fw-semibold">Vencimento</small>
                                            <input class="form-control" type="date" value="2021-06-18" id="date-input-2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="col m-1 btn btn-outline-primary">Cancelar</button>
                <button type="button" class="col m-1 btn btn-outline-success">Incluir</button>
            </div>
        </div>
    </div>
</div>