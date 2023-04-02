import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";
import Home from "@/views/page/Home/index.vue";
import MyWords from "@/views/page/MyWords/index.vue";
import Roadmap from "@/views/page/Roadmap/index.vue";
import Error404 from "@/views/error-page/404/index.vue";
import CreateWord from "@/views/page/CreateWord/index.vue";
import FAQ from "@/views/page/FAQ/index.vue";

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
    path: "/faq",
    name: "FAQ",
    component: FAQ,
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

const getOS = () => {
  const userAgent = navigator.userAgent,
    platform = navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
};
const os = getOS();

const router = createRouter({
  history:
    os === "Android" || os === "iOS"
      ? createMemoryHistory()
      : createWebHistory(),
  routes,
});

export default router;
