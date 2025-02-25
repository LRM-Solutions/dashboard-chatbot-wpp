import { createRouter, createWebHistory } from "vue-router";
import beforeEach from "./beforeEach";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/dashboard/:chat_id",
      name: "login",
      component: () => import("../views/DashboardView.vue"),
    },
  ],

  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(beforeEach);

export default router;
