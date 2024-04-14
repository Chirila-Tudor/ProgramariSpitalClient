import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomePageView from "../views/HomePageView.vue";
import Doctors from "../views/Doctors.vue";
import Specialities from "../views/Specialities.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "default",
      component: HomePageView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/doctors",
      name: "doctors",
      component: Doctors,
    },
    {
      path: "/specialities",
      name: "specialities",
      component: Specialities,
    },
  ],
});

export default router;
