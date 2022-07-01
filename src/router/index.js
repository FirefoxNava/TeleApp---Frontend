import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/loginView.vue"),
      /* beforeEnter: () => {
        if (localStorage.rol == "user") {
          return { name: "Home" };
        } else if (localStorage.rol == "admin") {
          return { name: "adminHome" };
        }
      }, */
    },
    {
        path: "/createArticle",
        name: "createArticle",
        component: () => import("../views/createArticle.vue"),
      },
    {
      path: "/:pathMatch(.*)*",
      name: "Not Found",
      redirect: "/login",
    },
    {
      path: "",
      name: "Default",
      redirect: "/login",
    },
    {
      path: "/",
      name: "DefaultAdd",
      redirect: "/login",
    },
  ],
});

router.beforeEach(async (to) => {
  if ((localStorage.rol == null || localStorage.rol == undefined) && to.name !== "Login") {
    return { name: "Login" };
  }
});

export default router;
