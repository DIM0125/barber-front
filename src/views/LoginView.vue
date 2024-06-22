<template>
  <div>
    <div class="container">
      <h1 class="text-center">Página de Login</h1>
      <form class="row justify-content-center">
        <div class="col col-md-5">
          <div class="mt-3">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" placeholder="email@exemplo.com" required>
          </div>

          <div class="mt-3">
            <label for="senha">Senha:</label>
            <input type="password" class="form-control" id="senha" placeholder="Digite sua senha" required>
          </div>
          <div class="row my-3 justify-content-center justify-content-md-end">
            <div class="col col-md-4">
              <button type="submit" class="btn btn-warning w-100 w-md-auto">Login</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>
