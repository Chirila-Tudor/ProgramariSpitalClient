import { createRouter, createWebHistory} from 'vue-router';
import LoginView from "../views/LoginView.vue";
import HomePageView from "../views/HomePageView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "default",
            component: HomePageView
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
    ],
  });





export default router;