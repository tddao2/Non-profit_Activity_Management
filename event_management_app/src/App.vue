<template>
  <div id="app">
      <Navbar />     <!--Render everything from Navbar component-->
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'         // Import Navbar component to be displayed in App
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
