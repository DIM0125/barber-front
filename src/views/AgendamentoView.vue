<template>
  <div>
    <h1 class="text-center">Página de Agendamentos</h1>
    <div class="container w-50">
      <form>
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" class="form-control" id="nome" placeholder="Digite seu nome" required>
        </div>
        <div class="form-group">
          <label for="telefone">Telefone:</label>
          <input type="tel" class="form-control" id="telefone" placeholder="Digite seu telefone" required>
        </div>
        <div class="form-group">
          <label for="servico">Serviço:</label>
          <select class="form-control" id="servico" required>
            <option value="">Selecione...</option>
            <option>Corte de Cabelo</option>
            <option>Barba</option>
            <option>Pacote Completo</option>
            <!-- Adicione mais opções conforme necessário -->
          </select>
        </div>
        <div class="form-group">
          <label for="data">Data:</label>
          <input type="date" class="form-control" id="data" required>
        </div>
        <div class="form-group">
          <label for="horario">Horário:</label>
          <input type="time" class="form-control" id="horario" required>
        </div>
        <button type="submit" class="btn btn-primary">Agendar</button>
      </form>
    </div>
  </div>
</template>

<style></style>
