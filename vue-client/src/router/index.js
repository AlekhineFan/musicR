import { createRouter, createWebHistory } from "vue-router";
import Artist from "../components/Artist.vue";
import Artists from "../components/Artists.vue";
import AddArtist from "../components/AddArtist.vue";

const routes = [
  {
    path: "/artist-details",
    name: "Artist",
    component: Artist,
  },
  {
    path: "/",
    alias: "/artists",
    name: "Artists",
    component: Artists,
  },
  {
    path: "/add",
    name: "AddArtist",
    component: AddArtist,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
