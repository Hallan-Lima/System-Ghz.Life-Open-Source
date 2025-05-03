<div class="row">
    <div class="col-md-6">
        <div class="card mb-4">
            <h5 class="card-header">Incluir Receita</h5>
            <div class="card-body demo-vertical-spacing demo-only-element">

                <div class="input-group">
                    <select class="form-select" id="coin" aria-label="coin">
                        <option selected="0">R$</option>
                        <option value="1">$</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <input type="number" class="form-control" placeholder="000.000,00" aria-label="000.000,00">
                </div>

                <div class="divider text-start">
                    <div class="divider-text">Categoria</div>
                    <button type="button" class="me-2 btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-pie-chart-alt"></span>
                    </button>
                    <button type="button" class="me-2 btn rounded-pill btn-icon btn-outline-secondary">
                        <span class="tf-icons bx bx-bell"></span>
                    </button>
                    <button type="button" class="me-2 btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-pie-chart-alt"></span>
                    </button>
                    <button type="button" class="me-2 btn rounded-pill btn-icon btn-outline-secondary">
                        <span class="tf-icons bx bx-bell"></span>
                    </button>
                </div>

                <div class="divider text-end">
                    <button type="button" class="me-2 btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-pie-chart-alt"></span>
                    </button>
                    <button type="button" class="me-2 btn rounded-pill btn-icon btn-outline-secondary">
                        <span class="tf-icons bx bx-bell"></span>
                    </button>
                    <button type="button" class="me-2 btn rounded-pill btn-icon btn-outline-primary">
                        <span class="tf-icons bx bx-pie-chart-alt"></span>
                    </button>
                    <button type="button" class="me-2 btn rounded-pill btn-icon btn-outline-secondary">
                        <span class="tf-icons bx bx-bell"></span>
                    </button>
                    <div class="divider-text">Conta</div>
                </div>

                <div id="section_tag">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Tag</h5>
                        <small class="text-muted float-end">Ver todas</small>
                    </div>
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="btn-group" role="group">
                                    <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="btncheck1">Tag_01</label>
                                    <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="btncheck2">Tag_02</label>
                                    <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="btncheck2">Tag_03</label>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="btn-group" role="group">
                                    <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="btncheck3">Tag_04</label>
                                    <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="btncheck4">Tag_05</label>
                                    <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="btncheck4">Tag_06</label>
                                </div>
                            </div>
                            <!-- Adicione mais itens conforme necessário -->
                        </div>
                    </div>
                </div>

                <div>
                    <div class="row">
                        <div class="col">
                            <select class="form-select" id="exampleFormControlSelect1" aria-label="Default select example">
                                <option selected="">Qt. Parcelas</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>

                        </div>
                        <div class="col">
                            <select class="form-select" id="exampleFormControlSelect1" aria-label="Default select example">
                                <option selected="">Recorrencia</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <textarea class="form-control mt-3" placeholder="Descrição" rows="3"></textarea>
                </div>

                <div class="row">
                    <small class="text-light fw-semibold">Alterar forma de lançamento para:</small>
                    <button type="button" class="col m-1 btn btn-outline-secondary">
                        <small class="fw-semibold">Transferencia</small>
                    </button>
                    <button type="button" class="col m-1 btn btn-outline-secondary">
                        <small class="fw-semibold">Despesa</small>
                    </button>
                </div>


                <div class="row">
                    <div class="col">
                        <small class="text-light fw-semibold">Efetuada</small>
                        <div> <!-- mb-2 para adicionar margem inferior -->
                            <input class="form-control" type="date" value="2021-06-18" id="date-input-1"> <!-- ID atualizado para ser único -->
                        </div>
                    </div>
                    <div class="col">
                        <small class="text-light fw-semibold">Vencimento</small>
                        <div> <!-- mb-2 para adicionar margem inferior -->
                            <input class="form-control" type="date" value="2021-06-18" id="date-input-2"> <!-- ID atualizado para ser único -->
                        </div>
                    </div>
                </div>

                <div class="row">
                    <button type="button" class="col m-1 btn btn-outline-primary">Cancelar</button>
                    <button type="button" class="col m-1 btn btn-outline-success">Incluir</button>
                </div>


            </div>
        </div>
    </div>
</div>