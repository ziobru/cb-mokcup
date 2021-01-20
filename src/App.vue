<template>
  <!-- main site navbar -->
  <nav class="navbar fixed-top bg-light menu">
    <li>menu link here</li>
              <!-- <div class="form-check form-switch" v-for="(filter, index) in availableFilters" :key="index">
            <input class="form-check-input" type="checkbox" id="" v-model="activeFilter" @change="filterCams($event)" data-value="">
            <label class="form-check-label" for="">{{ filter.name }}</label>
          </div> -->
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
}
</style>
