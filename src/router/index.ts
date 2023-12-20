import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: "/doclist"
    },
    {
        path: '/doclist',
        name: 'doclist',
        component: () => import("@/pages/doclist/DocumentList.vue")
    },
    {
        path: '/doclist/create',
        name: 'create',
        component: () => import("@/pages/doclist/CreateDocument.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router