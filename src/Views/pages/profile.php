<!-- filepath: p:\xampp\htdocs\www\Projeto\src\Views\pages\home.php -->
<?php
$content = '

<div class="row">
  <div class="col-md-12">
    <div class="card mb-4">
      <h5 class="card-header">Perfil do Usuário</h5>
      <!-- Account -->
      <div class="card-body">
        <div class="d-flex align-items-start align-items-sm-center gap-4">
        </div>
      </div>
      <hr class="my-0" />
      <div class="card-body">
        <form id="formAccountSettings" method="POST" onsubmit="return false">
          <div class="row">
        <div class="mb-3 col-md-6">
          <label for="nickname" class="form-label">Apelido</label>
          <input
            class="form-control"
            type="text"
            id="nickname"
            name="nickname"
            placeholder="Seu apelido" />
        </div>
        <div class="mb-3 col-md-6">
          <label for="email" class="form-label">E-mail</label>
          <input
            class="form-control"
            type="email"
            id="email"
            name="email"
            placeholder="seuemail@example.com" />
        </div>
        <div class="mb-3 col-md-6">
          <label for="password" class="form-label">Senha</label>
          <input
            class="form-control"
            type="password"
            id="password"
            name="password"
            placeholder="Sua senha" />
        </div>
        <div class="mb-3 col-md-6">
          <label for="gender" class="form-label">Gênero</label>
          <select id="gender" name="gender" class="form-select">
            <option value="">Selecione</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </select>
        </div>
        <div class="mb-3 col-md-6">
          <label for="phone" class="form-label">Telefone</label>
          <input
            class="form-control"
            type="text"
            id="phone"
            name="phone"
            placeholder="(XX) XXXXX-XXXX" />
        </div>
        <div class="mb-3 col-md-6">
          <label for="birthdate" class="form-label">Data de Nascimento</label>
          <input
            class="form-control"
            type="date"
            id="birthdate"
            name="birthdate" />
        </div>
          </div>
          <div class="mt-2">
        <button type="submit" class="btn btn-primary me-2">Salvar alterações</button>
        <button type="reset" class="btn btn-outline-secondary">Cancelar</button>
          </div>
        </form>
      </div>
      <!-- /Account -->
    </div>
    <div class="card mb-4">
      <h5 class="card-header">Alterar Senha</h5>
      <div class="card-body">
      <form id="formChangePassword" method="POST" onsubmit="return false">
        <div class="mb-3">
        <label for="newPassword" class="form-label">Nova Senha</label>
        <input
          class="form-control"
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="Digite a nova senha"
          required />
        </div>
        <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirmar Nova Senha</label>
        <input
          class="form-control"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirme a nova senha"
          required />
        </div>
        <div class="mt-2">
        <button type="submit" class="btn btn-primary">Alterar Senha</button>
        </div>
      </form>
      </div>
    </div>
    <div class="card mb-4">
      <h5 class="card-header">Desativar Conta</h5>
      <div class="card-body">
        <form id="formAccountDeactivation" onsubmit="return false">
          <button type="submit" class="btn btn-danger deactivate-account">Deactivate Account</button>
        </form>
      </div>
    </div>
  </div>
</div>

';
include '../src/Views/layouts/layout.php';
?>