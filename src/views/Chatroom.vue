<template>
<!-- TODO: Layout -->
  <div class="container-fluid p-0 mt-5">
    <div class="row m-0">
        <div class="col-sm-12 col-md-7 col-lg-7 p-0 videobox" ref="">
        <!-- video -->
          <div class="ratio ratio-16x9">
            <video ref="video" controls></video>
          </div>
        </div>
        <div class="col-sm-12 col-md-5 col-lg-5 chatbox" ref="">
        <!-- chat -->
          <div class="input-group message">
            <input type="text" class="form-control" >
            <button type="button" class="btn btn-outline-primary" @click.prevent="">
              Send
            </button>
          </div>

        </div>
    </div>
    <div class="row m-0">
      <div class="col-sm-12 col-md-12 col-lg-12">
      <!-- model bio here -->
      </div>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js';

export default {
  name: 'Chatroom',
  data() {
    return {
      hls: null,
      videoURL: null,
      roomTitle: null
    }
  },
  created() {

  },
  mounted() {
    this.hls = new Hls();
    this.initStream(this.$route.params.username);
  }, 
  computed: {

  },
  methods: {
    initStream(username) {
      //https://cors-anywhere.herokuapp.com/ enable CORS for debug onlocalhost
      fetch(`https://cors-anywhere.herokuapp.com/https://chaturbate.com/api/chatvideocontext/${username}`)
      .then( (res) => res.json() )
      .then( (data) => {
        console.log(data);
        this.roomTitle = data.room_title;
        this.videoURL = data.hls_source;
        if( this.$refs.video.canPlayType('application/vnd.apple.mpegurl') ){
          this.$refs.video.src = this.videoURL;
        }else if( Hls.isSupported() ){
          this.hls.loadSource(this.videoURL);
          this.hls.attachMedia(this.$refs.video);
          this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            this.$refs.video.play();
          });
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>