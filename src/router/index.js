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
import AddHall from "../views/AddHall.vue";
import AllHospitalHalls from "../views/AllHospitalHalls.vue";
import EditHall from "../views/EditHall.vue";
import EditAppointment from "../views/EditAppointment.vue";
import VerifySecurityCode from "../views/VerifySecurityCode.vue";
import AllAppointmentsForUser from "../views/AllAppointmentsForUser.vue";
import AllAppointmentsForDoctor from "../views/AllAppointmentsForDoctor.vue";
import AddService from "../views/AddService.vue";
import AllTypeOfServices from "../views/AllTypeOfServices.vue";

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
      path: "/change-password",
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
    {
      path: "/add-hall",
      name: "add-hall",
      component: AddHall,
    },
    {
      path: "/all-halls",
      name: "all-halls",
      component: AllHospitalHalls,
    },
    {
      path: "/edit-halls/:id",
      name: "edit-halls",
      component: EditHall,
    },
    {
      path: "/edit-appointment/:id",
      name: "edit-appointment",
      component: EditAppointment,
    },
    {
      path: "/verify-code",
      name: "verify-code",
      component: VerifySecurityCode,
    },
    {
      path: "/all-appointments-patient",
      name: "all-appointments-patient",
      component: AllAppointmentsForUser,
    },
    {
      path: "/all-appointments-doctor",
      name: "all-appointments-doctor",
      component: AllAppointmentsForDoctor,
    },
    {
      path: "/add-service",
      name: "add-service",
      component: AddService,
    },
    {
      path: "/all-services",
      name: "all-services",
      component: AllTypeOfServices,
    },
  ],
});

export default router;
