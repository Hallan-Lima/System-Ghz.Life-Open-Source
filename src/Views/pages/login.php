
    <!-- Content -->

    <div class="container-xxl">
      <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner">
          <!-- Register -->
          <div class="card">
            <div class="card-body">
              <!-- Logo -->
              <div class="app-brand justify-content-center">
                <a href="#" class="app-brand-link gap-2">
                  <span class="app-brand-text demo text-body fw-bolder" id="Brand-Logo">Ghz.Life</span>
                </a>
              </div>
              <!-- /Logo -->
              <h4 class="mb-2">Bem-vindo ao Ghz.Life! 👋</h4>
              <p class="mb-4">Faça login na sua conta e comece a aventura.</p>

              <form id="formAuthentication" class="mb-3" action="home" method="POST">
                <div class="mb-3">
                  <label for="email" class="form-label">E-mail</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    name="email"
                    placeholder="Seu e-mail"
                    autofocus
                  />
                </div>
                <div class="mb-3 form-password-toggle">
                  <div class="d-flex justify-content-between">
                    <label class="form-label" for="password">Senha</label>
                    <a href="forgot-password">
                      <small>Esqueceu sua senha?</small>
                    </a>
                  </div>
                  <div class="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      name="password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                    />
                    <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="remember-me" />
                    <label class="form-check-label" for="remember-me"> Lembre de mim </label>
                  </div>
                </div>
                <div>
                  <button class="btn btn-primary d-grid w-100 mb-2" type="submit">Entrar</button>
                  <a href="register-basic" class="btn btn-secondary d-grid w-100 mb-2">Cadastrar</a>
                </div>
              </form>
            </div>
          </div>
          <!-- /Register -->
        </div>
      </div>
    </div>


