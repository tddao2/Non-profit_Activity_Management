<template>
  <div class="container">
    <Intro msg="Welcome to Bread of Life Inc"/>            <!--Greeting-->
  </div>
</template>

<script>
import Intro from '@/components/Intro.vue'   // Import Intro components to be displayed in Home Components
                                      
export default {
  name: 'Home',
  components: {
    Intro
  }
}
</script>