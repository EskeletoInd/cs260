<template>
<div class="admin">
  <h1>Welcome to the Admin Page!</h1>
  <div class="heading">
    <div class="circle">1</div>
    <h2>Select a Picture</h2>
  </div>
  <section class="image-gallery">
    <div class="image" v-for="item in this.all_items" :key="item._id" @click="selectItem(item)">
      <img v-if="selected !== null && item._id === selected._id" :src="item.path" class="selected">
      <img v-else :src="item.path">
    </div>
  </section>
  <div class="heading">
    <div class="circle">2</div>
    <h2>Delete a Picture</h2>
  </div>
  <button @click="deleteItem">Delete</button>
  <div class="heading">
    <div class="circle">3</div>
    <h2>Change a Picture</h2>
  </div>
  <div class="form">
    <input type="file" name="photo" @change="fileChanged">
    <button @click="editItem">Upload</button>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      all_tags: [],
      all_items: [],
      selected: null,
    }
  },
  computed: {},
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    selectItem(item) {
      this.selected = item;
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.all_items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem() {
      if (this.selected === null) {
        return;
      }
      try {
        await axios.delete("/api/items/" + this.selected._id);
        this.selected = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        await axios.put('/api/items/' + this.selected._id, {
          path: r1.data.path,
        });
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
/* Masonry */
.admin {
  padding-left: 100px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 0;
  display: inline-block;
  flex-grow: 0;
}

.image img {
  width: 50%;
  padding: 0;
  margin: 0;
}

.image button {
  padding: 0;
  margin: 0;
}

.selected {
  border: solid 6px red;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
</style>
