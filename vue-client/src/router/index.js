import { createRouter, createWebHistory } from "vue-router";
import Artist from "../components/Artist.vue";
import Artists from "../components/Artists.vue";
import AddArtist from "../components/AddArtist.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/artist-details",
    name: "Artist",
    component: Artist,
  },
  {
    path: "/artists",
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
