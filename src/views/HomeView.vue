<script setup></script>

<template>
  <div class="hero-section">
    <div class="hero-content d-flex justify-content-start">
      <div class="col">
        <h1>Bem-vindo à Barbearia Toca da Barba</h1>
        <p>Oferecendo os melhores cortes de cabelo e barbas para homens modernos.</p>
      </div>
    </div>
  </div>

</template>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
  height: 500px;
  background-image: url('/barber-home-local.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
  text-align: left;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
}

.info-section {
  margin-bottom: 50px;
}

.info-section-left img,
.info-section-right img {
  max-width: 300px;
  height: auto;
}
</style>
