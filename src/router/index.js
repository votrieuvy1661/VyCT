import { createWebHistory, createRouter } from "vue-router";
import UserBook from "@/views/User/UserBook.vue";
import FileStorage from "@/views/File/FileStorage.vue";

const routes = [
    {
        path: "/user",
        name: "hello",
        component: UserBook,
    },
    {
        path: "/user/add",
        name: "user.add",
        component: () => import("@/views/User/UserAdd.vue"),
    },
    {
        path: "/storage",
        name: "storage",
        component: FileStorage,
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
