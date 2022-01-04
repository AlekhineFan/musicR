<template>
  <div>
    <h1>{{ name }}</h1>
    <h4>{{ description }}</h4>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import request from "../../services/requests.js";

export default {
  setup() {
    let name = ref("");
    let description = ref("");
    onMounted(async () => {
      const route = useRoute();
      console.log(route.params.id);
      await request.findOne(route.params.id).then((res) => {
        console.log("atist found:", res.data);
        name.value = res.data.name;
        description.value = res.data.description;
      });
    });

    return { name, description };
  },
};
</script>

<style></style>
