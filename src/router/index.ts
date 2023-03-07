import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/page/Home/index.vue";
import MyWords from "@/views/page/MyWords/index.vue";
import Roadmap from "@/views/page/Roadmap/index.vue";
import Error404 from "@/views/error-page/404/index.vue";
import CreateWord from "@/views/page/CreateWord/index.vue";

if (process.env.IS_STAGING === undefined) {
  console.warn("Make sure you create .env file or declare a variable.");
}

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
    path: "/create-word",
    name: "Create Word",
    component: CreateWord,
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
