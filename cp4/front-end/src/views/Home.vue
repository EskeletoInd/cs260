<template>
<div class="home">
  <h2>Submit a Photo, Get a Random Photo</h2>
  <section class="image-gallery">
    <div class="form">
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
    <div v-if="received_path !== ''">
      <h3>Recieved Photo</h3>
      <div class="receivedPhoto">
        <img :src="this.received_path">
      </div>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      received_path: "",
      file: null,
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      const formData = new FormData();
      formData.append('photo', this.file, this.file.name)
      let r1 = await axios.post('/api/photos', formData);
      let r2 = await axios.post('/api/items', {
        path: r1.data.path,
      });
      this.received_path = r2.data;
    },
  },
}
</script>

<style scoped>
.home {
  padding-left: 100px;
  align-items: center;
  justify-content: center;
}

.receivedPhoto {
  max-width: 1000px;
  max-height: 1000px;
}
</style>
