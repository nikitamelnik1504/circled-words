import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Home from "@/views/page/Home/index.vue";
import MyWords from "@/views/page/MyWords/index.vue";
import Roadmap from "@/views/page/Roadmap/index.vue";
import Error403 from "@/views/error-page/403/index.vue";
import Error404 from "@/views/error-page/404/index.vue";
import GenerateWord from "@/views/page/GenerateWord/index.vue";

const IS_PROD = true;

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
  },
  {
    path: "/roadmap",
    name: "Roadmap",
    component: Roadmap,
  },
  {
    path: "/generate-word",
    name: "Generate word",
    component: GenerateWord,
    meta: {
      requiresAuth: true,
    },
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
  history: IS_PROD
    ? createWebHistory()
    : createWebHashHistory("/circled-words/"),
  routes,
});

export default router;
