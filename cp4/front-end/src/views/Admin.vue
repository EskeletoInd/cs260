<template>
<div class="admin">
  <h1>The Admin Page!</h1>
  <div class="heading">
    <div class="circle">1</div>
    <h2>Select a Picture</h2>
  </div>
  <div v-for="item in this.all_items" v-bind:key="item._id">
    <button @click="selectItem(item)">
      <img :src="item.path" alt="">
    </button>
  </div>
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
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
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

.add,
.edit {
  display: flex;
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

button img {
  height: 400px;
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
