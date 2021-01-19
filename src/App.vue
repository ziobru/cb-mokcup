<template>
  <!-- main site navbar -->
  <nav class="navbar fixed-top bg-light menu">
    <li>menu link here</li>
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
