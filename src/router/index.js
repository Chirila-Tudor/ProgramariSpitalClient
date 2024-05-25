import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomePageView from "../views/HomePageView.vue";
import Doctors from "../views/Doctors.vue";
import Specialities from "../views/Specialities.vue";
import Appointment from "../views/Appointment.vue";
import ChangePassword from "../views/ChangePassword.vue";
import AllAppointmentsDashboard from "../views/AllAppointmentsDashboard.vue";
import AllUsersDashBoard from "../views/AllUsersDashBoard.vue";
import RequestForgotPassword from "../views/RequestForgotPassword.vue";
import AddEmployee from "../views/AddEmployee.vue";

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
    {
      path: "/appointment",
      name: "appointment",
      component: Appointment,
    },
    {
      path: "/change-passsword",
      name: "change-password",
      component: ChangePassword,
    },
    {
      path: "/all-appointments",
      name: "all-appointments",
      component: AllAppointmentsDashboard,
    },
    {
      path: "/all-users",
      name: "all-users",
      component: AllUsersDashBoard,
    },
    {
      path: "/recovery",
      name: "recovery",
      component: RequestForgotPassword,
    },
    {
      path: "/add-employee",
      name: "add-employee",
      component: AddEmployee,
    },
  ],
});

export default router;
