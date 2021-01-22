<template>
  <!-- main site navbar -->
  <nav class="navbar fixed-top bg-light menu">
    <div class="container-fluid">
      <!-- menu toggler button -->
      <button class="hamburger hamburger--squeeze" type="button">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>

      <a class="navbar-brand float-end">
        <img src="https://static-assets.highwebmedia.com/images/logo.svg" width="150" height="30">
      </a>
      
      <!-- <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="darkModeSelector" v-model="darkMode" @click.prevent="ToggleDarkMode()">
        <label class="form-check-label" for="darkModeSelector">Dark mode</label>
      </div> -->
    </div>
  </nav>
  <!-- pages content -->
  <div class="container mt-5">
    <router-view/>
  </div>
  <!-- footer -->
  <nav class="navbar bg-light footer">
    <div class="container-fluid">
      <li>footer links here</li>
    </div>
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
