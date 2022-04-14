import {createWebHistory, createRouter} from "vue-router";
import Home from "@/views/Home.vue";
import MyWords from "@/views/MyWords.vue";
import Roadmap from "@/views/Roadmap.vue";

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