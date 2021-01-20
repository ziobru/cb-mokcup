<template>
  <!-- main site navbar -->
  <nav class="navbar fixed-top bg-light menu">
    <a class="navbar-brand">
    </a>
    
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" id="darkModeSelector" v-model="darkMode" @click.prevent="ToggleDarkMode()">
      <label class="form-check-label" for="darkModeSelector">Dark mode</label>
    </div>
  
  </nav>
  <!-- pages content -->
  <div class="container">
    <router-view/>
  </div>
  <!-- footer -->
  <nav class="navbar bg-light footer">
    <li>footer links here</li>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      darkMode: null
    }
  },
  methods: {
    ToggleDarkMode() {
      console.log('clicked', this.darkMode);
      this.darkMode = !this.darkMode;
      if( this.darkMode ) {
        document.body.style.background = '#191919';
        document.body.style.color = 'white';
      }else{
        document.body.style.background = 'white';
        document.body.style.color = 'black'; 
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
