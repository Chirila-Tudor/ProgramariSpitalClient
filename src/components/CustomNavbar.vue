<script setup>
import router from "../router";
import CustomButton from "../components/CustomButton.vue";
import ModalCustom from "./ModalCustom.vue";
import { ref, onMounted, computed, watch } from "vue";
const activePage = ref("default");
const username = ref("");
const userRole = ref("");
const isModalVisible = ref(false);

onMounted(() => {
  username.value = localStorage.getItem("username") || "";
  userRole.value = localStorage.getItem("role") || "";
});

watch(username, (newUsername) => {
  localStorage.setItem("username", newUsername);
});

watch(userRole, (newRole) => {
  localStorage.setItem("role", newRole);
});
const buttonText = computed(() => {
  return username.value ? "Hi, " + username.value : "Login";
});
const buttonId = computed(() => {
  return username.value ? "logout" : "login";
});

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
const handleClick = () => {
  if (username.value) {
    isModalVisible.value = true;
  } else {
    redirectToLogin();
  }
};
const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  username.value = "";
  userRole.value = "";
  router.push({ name: "default" });
};
const confirmLogout = () => {
  logout();
  isModalVisible.value = false;
};

const cancelLogout = () => {
  isModalVisible.value = false;
};
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
          v-if="userRole === 'NURSE'"
          class="nav-button"
          id="appointment"
          @click="redirectToAppointment"
        >
          Programari
        </CustomButton>
        <CustomButton
          v-if="userRole === 'NURSE' || userRole === 'ADMIN'"
          class="nav-button"
          id="all-appointments"
          @click="redirectToAllAppointments"
        >
          Toate Programarile
        </CustomButton>
        <CustomButton
          v-if="userRole === 'ADMIN'"
          class="nav-button"
          id="all-users"
          @click="redirectToAllUsers"
        >
          Toti Utilizatorii
        </CustomButton>
        <CustomButton
          v-if="userRole === 'ADMIN'"
          class="nav-button"
          id="add-employee"
          @click="redirectToAddEmployee"
        >
          Adaugare Angajat
        </CustomButton>
        <CustomButton
          v-if="userRole === 'ADMIN'"
          class="nav-button"
          id="add-hall"
          @click="redirectToAddHall"
        >
          Adaugare Sala
        </CustomButton>
        <CustomButton
          v-if="userRole === 'ADMIN'"
          class="nav-button"
          id="all-halls"
          @click="redirectToAllHalls"
        >
          Toate Salile
        </CustomButton>
      </div>
    </div>
    <div>
      <CustomButton
        class="nav-button"
        :id="buttonId"
        @click="handleClick"
        :is-active="activePage === 'login'"
      >
        {{ buttonText }}
      </CustomButton>
      <ModalCustom
        v-if="isModalVisible"
        :title="'Log Out'"
        :message="'Are you sure you want to log out?'"
        @confirm="confirmLogout"
        @cancel="cancelLogout"
      />
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
