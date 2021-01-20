<template>
  <!-- models grid filters -->
  <div class="row m-0">
    <div class="col-sm-12 col-md-12 col-lg-12 mt-5">
      <div class="row m-0">
        <!-- search by gender -->
        <div class="col-md-6 col-lg-6 p-0 d-none d-md-block">
          <div class="form-check form-check-inline" v-for="(filter, index) in availableFilters" :key="index">
            <input class="form-check-input" type="radio" id="" name="" @change="filterCams()" v-model="activeFilter" :value="filter">
            <label class="form-check-label" for="">{{ filter }}</label>
          </div>
        </div>
        <!-- search by name -->
        <div class="col-sm-12 col-md-6 col-lg-6 p-0">
          <div class="input-group">
            <input type="search" class="form-control" name="" v-model="modelUsername">
            <button class="btn btn-outline-primary" @click.prevent="searchModel()">search</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- models grid with infinite scroll pagination -->
  <div class="row m-0">
    <!-- models presentation card -->
    <div class="col-sm-12 col-md-3 col-lg-3 p-2 mt-3 mb-3" v-for="(cam, index) in paginatedCams" :key="index">
      <div class="card border-warning">
        <!-- thumbnail of the room -->
        <!-- if the image is clicked will open the model room -->
        <img class="card-img-top w-100" :src="cam.image_url">
        <div class="card-body p-2">
          <!-- model screen name -->
          <!-- if the name is clicked will open the model room -->
          <a class="text-decoration-none stretched-link" :href="cam.chat_room_url">
            <h6 class="fw-bold m-0">{{ cam.username }}</h6>
          </a>
            <!-- room subject -->
          <span class="d-inline-block text-truncate w-75">
            <small class="">{{ cam.room_subject }}</small>
          </span>
        </div>
      </div>
    </div>

    <div class="col-sm-12 col-md-12 col-lg-12 text-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination pagination-sm">
          <li class="page-item">
            <a class="page-link" href="#" @click.prevent="prevPage()" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <!-- <li class="page-item" v-for="(page, index) in totalPages" :key="index">
            <a class="page-link" href="#">{{ index }}</a>
          </li> -->

          <li class="page-item">
            <a class="page-link" href="#" @click.prevent="nextPage()" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'Index',
  data() {
    return {
      availableFilters: ['all','female','male','trans','couples'],
      activeFilter: null,
      cardThumbnailUrl: null,
      //isLoading: true,
      page: 1,
      perPage: 80,
      modelUsername: null,
      // searchResult: null,
      // showResult: false,
      onlineCams: [],      
      unfilteredCamsList: [],
      // streamingURL: null,
      // hls: null
    }
  },
  created() {

  },
  mounted() {
    this.init();
  },
  computed: {
    paginatedCams() {
      const { perPage, page} = this;
      const startIndex = perPage * (page - 1);
      const endIndex = startIndex + perPage;
      return this.onlineCams.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.onlineCams.length / this.perPage);
    }
  },
  methods: {
    init() {
      const camsUrl = "https://cors-anywhere.herokuapp.com/https://chaturbate.com/affiliates/api/onlinerooms/?format=json&wm=SsyCf";
      fetch(camsUrl)
      .then( (res) => res.json() )
      .then( (data)  => {
        console.log(data);
        this.onlineCams = data;
        this.unfilteredCamsList = this.onlineCams;
      });
    },
    nextPage() {
      if( this.page < this.totalPages ){
        this.page++;
      }
    },
    prevPage() {
      if( this.page > 1 ){
        this.page--;
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
    // showCam() {
    //   axios.get('https://chaturbate.com/api/chatvideocontext/'+this.modelUsername)
    //   .then( response => {
    //     //console.log(response)
    //     this.streamingURL = response.data.hls_source
    //   }).then( () => {
    //     const el = document.getElementById('player')
    //     if( Hls.isSupported() ){
    //       this.hls.loadSource(this.streamingURL)
    //       this.hls.attachMedia(el)
    //       this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //         //el.play();
    //         console.log('video player ready!')
    //       })
    //     }

    //   });
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>