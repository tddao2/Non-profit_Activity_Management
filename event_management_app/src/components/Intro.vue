<template>
  <br><br><br><br>
  <div class="hello">
    <div class="jumbotron text-center">
      <h1 class="display-3">{{ msg }}</h1>
    </div>
    <b-alert show variant="info">       <!--Intro of Web Application-->
      <h3>For 29 years, <strong>Bread of Life, Inc.</strong> has worked to eradicate food insecurity,
        improve health outcomes, and provide resources to the greater Houston community.</h3>
    </b-alert>
  </div>                   <!-- Using Bootstrap to get pretty slided images for Intro -->
  <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../assets/1.jpg" class="d-block w-100" alt="1">
    </div>
    <div class="carousel-item">
      <img src="../assets/2.jpg" class="d-block w-100" alt="2">
    </div>
    <div class="carousel-item">
      <img src="../assets/3.jpg" class="d-block w-100" alt="3">
    </div>
    <div class="carousel-item">
      <img src="../assets/4.jpg" class="d-block w-100" alt="4">
    </div>
    <div class="carousel-item">
      <img src="../assets/5.jpg" class="d-block w-100" alt="5">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  props: {
    msg: String
  }
}
</script>