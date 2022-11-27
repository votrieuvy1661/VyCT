import { createWebHistory, createRouter } from "vue-router";
import UserBook from "@/views/UserBook.vue";
import LinkPage from "@/views/LinkPage.vue";

const routes = [
    {
        path: "/user",
        name: "hello",
        component: UserBook,
    },
    {
        path: "/user/add",
        name: "user.add",
        component: () => import("@/views/UserAdd.vue"),
    },
    {
        path: "/link",
        name: "link",
        component: LinkPage,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
