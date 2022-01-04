<template>
  <div>
    <h1>Add Artist</h1>
    <form class="form-add-artist" @submit.prevent="handleSubmit">
      <input class="form-input" type="text" v-model="name" />
      <textarea class="form-input" type="text" v-model="description" />
      <input class="form-input" type="text" v-model="tags">
      <input class="form-input" type="text" v-model="links">
      <div class="form-button-container">
        <button>Add</button>
        <button>Clear</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import request from "../../services/requests.js";

export default {
  setup() {
    const name = ref("");
    const description = ref("");
    const tags = ref([]);
    const links = ref([]);

    const handleSubmit = async () => {
      console.log(name.value, description.value);
      await request.create({
        name: name.value,
        description: description.value,
      });
    };

    return { name, description, handleSubmit, tags, links };
  },
};
</script>

<style>
.form-add-artist {
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  max-width: 40vw;
}
.form-input {
  margin: 3px 0px;
}
.form-button-container {
  display: flex;
  align-items: center;
}
</style>
