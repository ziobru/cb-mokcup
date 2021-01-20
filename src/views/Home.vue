<template>
  <!-- models grid filters -->
  <div class="row m-0">
  <!--  -->
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
            <input type="search" class="form-control" name="" value="" >
            <button class="btn btn-outline-primary">search</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- models grid with infinite scroll pagination -->
  <div class="row m-0">
    <!-- models presentation card -->
    <div class="col-sm-12 col-md-3 col-lg-3 p-2 mt-3 mb-3" v-for="(c, index) in defaultCamsList" :key="index">
      <div class="card border-warning">
        <!-- thumbnail of the room -->
        <!-- if the image is clicked will open the model room -->
        <img class="card-img-top w-100" :src="c.image_url">
        <div class="card-body p-2">
          <!-- model screen name -->
          <!-- if the name is clicked will open the model room -->
          <a class="text-decoration-none stretched-link" :href="c.chat_room_url">
            <h6 class="fw-bold m-0">{{ c.username }}</h6>
            <!-- room subject -->
            <span class="d-inline-block text-truncate w-75">
              <small class="">{{ c.room_subject }}</small>
            </span>
          </a>
        </div>
      </div>
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
      filter: null,
      activeFilter: null,
      cardThumbnailUrl: null,
      //isLoading: true,
      camNumber: 12,
      //modelUsername: null,
      //searchResult: null,
      //showResult: false,
      onlineCams: [],
      defaultCamsList: [],
      unfilteredCamsList: [],
      streamingURL: null,
      hls: null
    }
  },
  created() {

  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const camsUrl = "https://cors-anywhere.herokuapp.com/https://chaturbate.com/affiliates/api/onlinerooms/?format=json&wm=SsyCf";
      fetch(camsUrl)
      .then( (res) => res.json() )
      .then( (data)  => {
        console.log(data);
        this.onlineCams = [...data]
        // this.visibleCams = 
        //data.lenght = this.camNumber;
        data.forEach( (cam) => {
          this.defaultCamsList.push(cam);
        });
        this.defaultCamsList.length = this.camNumber;
      });
    },
    filterCams() {
      console.log(this.activeFilter);
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