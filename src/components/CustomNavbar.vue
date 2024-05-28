<script setup>
import router from "../router";
import CustomButton from "../components/CustomButton.vue";
import { ref } from "vue";
const activePage = ref("default");

function redirectToLogin() {
  router.push("/login");
}
function redirectToDoctors() {
  router.push("/doctors");
}
function redirectToHome() {
  router.push("/");
}
function redirectToSpecialities() {
  router.push("/specialities");
}
function redirectToAppointment() {
  router.push("/appointment");
}
function redirectToAllAppointments() {
  router.push("/all-appointments");
}
function redirectToAllUsers() {
  router.push("/all-users");
}
function redirectToAddEmployee() {
  router.push("/add-employee");
}
function redirectToAddHall() {
  router.push("/add-hall");
}
function redirectToAllHalls() {
  router.push("/all-halls");
}
</script>

<template>
  <nav id="navbar">
    <img src="../assets/img/logo.png" class="logo" @click="redirectToHome" />
    <div class="options">
      <div class="buttons">
        <CustomButton
          class="nav-button"
          id="all-doctors"
          @click="redirectToDoctors"
        >
          Medici
        </CustomButton>
        <CustomButton
          class="nav-button"
          id="specialities"
          @click="redirectToSpecialities"
        >
          Specialitati
        </CustomButton>
        <CustomButton
          class="nav-button"
          id="appointment"
          @click="redirectToAppointment"
        >
          Programari
        </CustomButton>
        <CustomButton
          class="nav-button"
          id="all-appointments"
          @click="redirectToAllAppointments"
        >
          All Appointments
        </CustomButton>
        <CustomButton
          class="nav-button"
          id="all-users"
          @click="redirectToAllUsers"
        >
          All Users
        </CustomButton>
        <CustomButton
          class="nav-button"
          id="add-employee"
          @click="redirectToAddEmployee"
        >
          Add Employee
        </CustomButton>
        <CustomButton
          class="nav-button"
          id="add-hall"
          @click="redirectToAddHall"
        >
          Add Hall
        </CustomButton>
        <CustomButton
          class="nav-button"
          id="all-halls"
          @click="redirectToAllHalls"
        >
          All Halls
        </CustomButton>
      </div>
    </div>
    <div>
      <CustomButton
        class="nav-button"
        id="login"
        @click="redirectToLogin"
        :is-active="activePage === 'login'"
      >
        Login
      </CustomButton>
    </div>
  </nav>
</template>

<style scoped>
#all-ideas {
  font-size: 15px;
  border-radius: 1px;
  border-width: 3px;
}

.logo {
  width: 100px;
  height: 60px;
}

#my-ideas {
  font-size: 15px;
  border-radius: 1px;
  border-width: 3px;
}

#login {
  font-size: large;
  border-radius: 2px;
  border-width: 5px;
}

nav {
  background-color: white;
  box-sizing: border-box;
  display: flex;
  gap: 0.5vw;
  width: 100vw;
  align-items: center;
  min-height: 6vh;
  border-bottom: 1px solid slategray;
}

.disabled {
  display: none;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 15vw;
  align-items: center;
}

.options {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85vw;
}

.nav-button {
  font-weight: bold;
  background-color: transparent;
  width: auto;
  height: auto;
  border-color: transparent;
}

.nav-button:hover {
  background-color: var(--selected-color);
}
</style>
