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
</script>

<template>
  <nav id="navbar">
    <img src="../assets/img/logo.png" class="logo" @click="redirectToHome" />
    <div class="options">
      <div class="buttons">
        <CustomButton
          class="nav-button"
          id="all-ideas"
          @click="redirectToDoctors"
        >
          Medici
        </CustomButton>
        <CustomButton
          class="nav-button"
          id="my-ideas"
          @click="redirectToSpecialities"
        >
          Specialitati
        </CustomButton>
        <CustomButton
          class="nav-button"
          id="my-ideas"
          @click="redirectToAppointment"
        >
          Programari
        </CustomButton>
        <CustomButton
          class="nav-button"
          id="my-ideas"
          @click="redirectToAllAppointments"
        >
          All Appointments
        </CustomButton>
        <CustomButton
          class="nav-button"
          id="my-ideas"
          @click="redirectToAllUsers"
        >
          All Users
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
