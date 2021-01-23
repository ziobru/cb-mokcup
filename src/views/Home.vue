<template>
  <div class="container mt-5">
    <!-- models grid filters -->
    <div class="row m-0">
      <div class="col-sm-12 col-md-12 col-lg-12 mt-5">
        <div class="row m-0">
          <!-- filter by gender -->
          <div class="col-md-6 col-lg-6 p-0 d-none d-md-block">
            <div class="form-check form-check-inline" v-for="(filter, index) in availableFilters" :key="index">
              <input class="form-check-input" type="radio" id="" name="" @change="filterCams()" v-model="activeFilter" :value="filter">
              <label class="form-check-label text-uppercase" for="">{{ filter }}</label>
            </div>
          </div>
          <!-- search by name -->
          <div class="col-sm-12 col-md-6 col-lg-6 p-0">
            <div class="input-group">
              <input type="search" class="form-control" name="" v-model="modelUsername">
              <button class="btn btn-outline-primary" @click.prevent="searchModel()">search</button>
            </div>
            <!-- result list -->
          </div>
        </div>
      </div>
    </div>

    <!-- models grid -->
    <div class="row m-0">
      <!-- models presentation card -->
      <div class="col-6 col-md-3 col-lg-3 p-2 mt-3 mb-3" v-for="(cam, index) in paginatedCams" :key="index">
        <div class="card shadow-lg">
          <!-- thumbnail -->
          <img class="card-img-top w-100" :src="cam.image_url">
          <div class="card-body p-2">
            <!-- model username -->
            <div class="d-block">
              
              <router-link class="text-decoration-none stretched-link float-start" :to="{name: 'Chatroom', params: {username: cam.username} }">
                <h6 class="fw-bold m-0">{{ cam.username }}</h6>
              </router-link>

              <span class="float-end">
                <small class="">{{ cam.age }} <i :class="setGenderIcon(cam.gender)"></i></small>
              </span>
            </div>
            <!-- room subject -->
            <span class="d-inline-block text-truncate w-75">
              <small class="">{{ cam.room_subject }}</small>
            </span>
            <!-- room info -->
            <div class="d-block">
              <small lass="float-start">
                <i class="fas fa-users"></i> {{ cam.num_users }}
              </small>
              <small class="fw-bold float-end" v-if="cam.is_hd">
                HD
              </small>
            </div>
          </div>
        </div>
      </div>
      <!-- pagination -->
      <div class="col-sm-12 col-md-12 col-lg-12">
        <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm">
            <li class="page-item">
              <a class="page-link" :class="{'disabled': currentPage === 1}" href="#" @click.prevent="prevPage()" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"  :class="{'active': currentPage === startPage + page }" v-for="page in limit" :key="page">
              <a class="page-link" href="#" @click.prevent="currentPage = startPage + page">{{ startPage + page }}</a>
            </li>
            <li class="page-item">
              <a class="page-link" :class="{'disabled': currentPage === totalPages}" href="#" @click.prevent="nextPage()" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Index',
  data() {
    return {
      availableFilters: ['all','female','male','shemale','couples'],
      activeFilter: null,
      cardThumbnailUrl: null,
      //isLoading: true,
      currentPage: 1,
      perPage: 80,
      limit: 5,
      modelUsername: null,
      // searchResult: null,
      // showResult: false,
      onlineCams: [],      
      unfilteredCamsList: [],
    }
  },
  created() {

  },
  mounted() {
    this.init();
  },
  computed: {
    paginatedCams() {
      const { perPage, currentPage} = this;
      const startIndex = perPage * (currentPage - 1);
      const endIndex = startIndex + perPage;
      return this.onlineCams.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.onlineCams.length / this.perPage);
    },
    startPage() {
      const {limit, totalPages: numberOfPages, currentPage} = this;
      const firstNumber = currentPage === 1;
      const lastNumber = currentPage === numberOfPages;
      let numberOfLinks = limit;
      let startNumber = 1;

      if( numberOfPages <= limit ){
        numberOfLinks = numberOfPages;
      }else if( currentPage < limit - 1 ){
        numberOfLinks = Math.min(numberOfLinks, limit);
      }else if( numberOfPages - currentPage + 2 < limit ) {
        if(firstNumber) {
          numberOfLinks = limit - (lastNumber ? 0 : 1);
        }
        startNumber = numberOfPages - numberOfLinks + 1;
      }else {
        startNumber = currentPage - Math.floor(numberOfLinks / 2);
      }
      return startNumber - 1;
    }
  },
  methods: {
    init() {
      fetch('https://cors-anywhere.herokuapp.com/https://chaturbate.com/affiliates/api/onlinerooms/?format=json&wm=SsyCf')
      .then( (res) => res.json() )
      .then( (data) => {
        console.log(data);
        this.onlineCams = data;
        this.unfilteredCamsList = this.onlineCams;
      });
    },
    setGenderIcon(gender) {
      if( gender === 'f' ){
        return 'fas fa-venus';
      }else if( gender === 'm' ){
        return 'fas fa-mars';
      }else if( gender === 's' ){
        return 'fas fa-transgender';
      }else{
        return 'fas fa-venus-mars';
      }
    },
    nextPage() {
      if( this.currentPage < this.totalPages ){
        this.currentPage++;
      }
    },
    prevPage() {
      if( this.currentPage > 1 ){
        this.currentPage--;
      }
    },
    filterCams() {
      if( this.activeFilter === 'all' ){
        this.onlineCams = this.unfilteredCamsList;
      }else{
        this.onlineCams = this.unfilteredCamsList;
        this.onlineCams = this.onlineCams.filter( (item) => {
          if(item.gender === this.activeFilter.charAt(0)){
            return item;
          }
        });
      }
    },
    searchModel() {
      this.onlineCams = this.onlineCams.filter( (item) => {
        if(item.username === this.modelUsername){
          return item;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>