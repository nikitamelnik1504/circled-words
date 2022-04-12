import {createWebHistory, createRouter} from "vue-router";
import Home from "@/pages/Home.vue";
import MyWords from "@/pages/MyWords.vue";
import Roadmap from "@/pages/Roadmap.vue";

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