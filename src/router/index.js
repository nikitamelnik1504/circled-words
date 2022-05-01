import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import MyWords from "@/views/MyWords.vue";
import Roadmap from "@/views/Roadmap.vue";
import Error403 from "@/views/403.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/my-words",
    name: "My Words",
    component: MyWords,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/roadmap",
    name: "Roadmap",
    component: Roadmap,
  },
  {
    path: "/403-error",
    name: "403 error",
    component: Error403,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
