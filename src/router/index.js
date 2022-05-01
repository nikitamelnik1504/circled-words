import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/page/Home/index.vue";
import MyWords from "@/views/page/MyWords/index.vue";
import Roadmap from "@/views/page/Roadmap/index.vue";
import Error403 from "@/views/error-page/403/index.vue";
import Error404 from "@/views/error-page/404/index.vue";

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
  {
    path: "/404-error",
    name: "404 error",
    component: Error404,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404-error",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
