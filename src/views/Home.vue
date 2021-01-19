<template>
  <!-- models grid filters -->
  <div class="row m-0">
  <!--  -->
    <div class="col-12">
      <!-- search by gender -->
      <a class="" href="#"></a>
      <!-- search by name -->
      <input type="search" class="form-control" name="" value="" >
    </div>
  </div>
  <!-- models grid with infinite scroll pagination -->
  <div class="row m-0">
    <!-- models presentation card -->
    <div class="col-sm-12 col-md-3 col-lg-3 p-2 mt-3 mb-3" v-for="(c, index) in defaultCamsList" :key="index">
      <div class="card">
        <!-- thumbnail of the room -->
        <!-- if the image is clicked will open the model room -->
        <img class="card-img-top w-100" :src="c.image_url">
        <div class="card-body">
          <!-- model screen name -->
          <!-- if the name is clicked will open the model room -->
          <h6 class="fw-bold">{{ c.username }}</h6>
          <!-- room subject -->
          <small class="text-truncate">{{ c.room_subject }}</small>
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
      cardThumbnailUrl: null,
      //isLoading: true,
      camNumber: 100,
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
        data.lenght = this.camNumber;
        data.forEach( (cam) => {
          this.defaultCamsList.push(cam);
        });
      });
      // axios.get(camsUrl)
      //   .then( (response) => {
      //     console.log(response);
      //     this.onlineCams = [...response.data];
      //     response.data.length = this.camNumber;
      //     if (updateFeed) {
      //       console.log("Data update...")
      //       this.defaultCamsList = []
      //     }
      //     response.data.forEach((item) => {
      //       this.defaultCamsList.push(item)
      //     })
      //   })
      //   .then( () => {
      //     this.unfilteredCamsList = this.defaultCamsList
      //     this.isLoading = false
      //   });
    },
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
