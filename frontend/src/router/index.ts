import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    routes: [
        {
            name: "Home",
            path: "/",
            component: () => import("../views/HomeView.vue"),
        },
    ],
    history: createWebHashHistory(),
});

export default router;
