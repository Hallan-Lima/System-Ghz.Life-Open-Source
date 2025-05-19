<div class="container-xxl">
  <div class="authentication-wrapper authentication-basic container-p-y">
    <div class="authentication-inner">
      <!-- Register -->
      <div class="card">
        <div class="card-body">
          <!-- Logo -->
          <div class="app-brand justify-content-center">
            <a href="index.html" class="app-brand-link gap-2">
              <span class="app-brand-text demo text-body fw-bolder" id="Brand-Logo">Ghz.Life</span>
            </a>
          </div>
          <!-- /Logo -->
          <h4 class="mb-2">Cadastra-se 🚀</h4>
          <p class="mb-4">Comece agora o seu agente pessoal!</p>

          <form class="mb-3" action="user-register" method="POST">
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="nickname"
                name="nickname"
                placeholder="Como gostaria de ser chamado?"
                aria-describedby="nickname"
                autofocus />
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="email" name="email" placeholder="Informe seu e-mail" />
            </div>
            <div class="mb-3 form-password-toggle">
              <div class="input-group input-group-merge">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  name="password"
                  placeholder="Digite sua senha"
                  aria-describedby="password" />
                <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
              </div>
            </div>
            <div class="mb-3 form-password-toggle">
              <div class="input-group input-group-merge">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  name="password"
                  placeholder="Confirme a sua senha"
                  aria-describedby="password" />
                <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
              </div>
            </div>
            <div class="mb-3">
              <select id="gender_id" name="gender_id" class="select2 form-select">
                <option value="">Selecione seu gênero</option>
                <option value="1">Masculino</option>
                <option value="2">Feminino</option>
                <option value="3">Não-binário</option>
                <option value="4">Prefiro não informar</option>
                <option value="5">Outro</option>
              </select>
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" id="phone" name="phone" placeholder="Informe seu telefone" />
            </div>

            <div class="mb-3">
              <input type="date" class="form-control" id="birthdate" name="birthdate" placeholder="birthdate" min="01-01-1900" max="17-04-2025" />
            </div>

            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="terms-conditions"  required/>
                <label class="form-check-label" for="terms-conditions">
                  Eu aceito a
                  <a href="javascript:void(0);">Política de Privacidade e termos</a>
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary d-grid w-100"  >Cadastrar</button>
          </form>

          <p class="text-center">
            <span>Você ja tem conta?</span>
            <a href="login">
              <span>Fazer Login</span>
            </a>
          </p>
        </div>
      </div>
      <!-- /Register -->
    </div>
  </div>
</div>