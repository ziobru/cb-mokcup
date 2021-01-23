<template>
  <!-- main site navbar -->
  <nav class="navbar navbar-collapse-sm bg-light fixed-top menu">
    <div class="container-fluid">

      <router-link class="navbar-brand float-end" to="/">
        <img src="https://static-assets.highwebmedia.com/images/logo.svg" width="150" height="30">
      </router-link>

      <!-- <button class="navbar-toggler" type="button" aria-controls="" aria-expanded="false" aria-label="Toggle navigation" @click.prevent="toggleMenu()">
        <span class="navbar-toggler-icon"></span>
      </button> -->

      <div class="navbar-collapse px-3" ref="menuContent">
        
        <!-- <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul> -->
      
      </div>
      <!-- <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="darkModeSelector" v-model="darkMode" @click.prevent="ToggleDarkMode()">
        <label class="form-check-label" for="darkModeSelector">Dark mode</label>
      </div> -->
    </div>
  </nav>
  <!-- pages content -->
  <router-view/>
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
    toggleMenu() {
      console.log('clicked');
      this.$refs.menuContent.classList.toggle('show');
    },
    toggleDarkMode() {
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
