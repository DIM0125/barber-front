<script setup></script>

<template>
  <div>
    <div class="d-flex align-items-center hero1">
      <div class="hero1-content mx-2 mx-md-5">
        <div class="col">
          <h1>Bem-vindo à Barbearia Toca da Barba</h1>
          <p>Oferecendo os melhores cortes de cabelo e barbas para homens modernos.</p>
        </div>
      </div>
    </div>

    <div class="d-flex align-items-center justify-content-end hero2">
      <div class="hero2-content mx-2 mx-md-5 hero2-content col-12 col-md-5">
        <h1>Sobre nós:</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ipsa hic aliquid voluptas. Est, deleniti.
          Animi, optio voluptatibus quidem magnam accusamus molestiae rerum perferendis excepturi vero, tenetur nemo
          laudantium id.</p>
      </div>
    </div>

    <div class="d-flex align-items-center hero3">
      <div class="hero1-content mx-2 mx-md-5">
        <div class="col">
          <h1>Como nos encontrar:</h1>
          <p>Estamos localizados no endereço: </p>
          <p>Rua das Palmeiras, 123, Bairro da Praia, Natal, RN, 59000-000</p>
        </div>
      </div>
    </div>

  </div>

</template>

<style scoped>
.hero1 {
  position: relative;
  overflow: hidden;
  height: 500px;
  background-image: url('/barber-home-local.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
}

.hero2 {
  position: relative;
  background-color: #381818;
  min-height: 400px;
  color: #fff;
}

.hero3 {
  position: relative;
  overflow: hidden;
  height: 300px;
  background-image: url('/map.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
}

.hero1-content {
  max-width: 500px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
}

.hero2-content {
  padding: 20px;
  max-width: 500px;
}

.hero-image {
  max-width: fit-content;
}
</style>
