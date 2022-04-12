import {createWebHistory, createRouter} from "vue-router";
import Home from "@/pages/Home/Home.vue";
import MyWords from "@/pages/MyWords/MyWords.vue";
import Roadmap from "@/pages/Roadmap/Roadmap.vue";

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;