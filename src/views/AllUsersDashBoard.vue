<script setup>
import { ref, onMounted } from "vue";
import { getAllUsers, modifyIsActive } from "../services/user_service";
import CustomButton from "../components/CustomButton.vue";
const applicationUser = ref([]);

onMounted(() => {
  fetchAllUsers();
});

async function fetchAllUsers() {
  await getAllUsers().then((res) => (applicationUser.value = res));
}
async function modifyUserActivity(id) {
  await modifyIsActive(id);

  const user = applicationUser.value.find((u) => u.id === id);
  if (user) {
    user.isActive = !user.isActive;
  }
}

const toggleActive = (id) => {
  modifyUserActivity(id);
};
</script>

<template>
  <div class="appointments-page">
    <h1>Toți utilizatorii</h1>
    <div v-if="applicationUser.length" class="appointments-grid">
      <div
        v-for="user in applicationUser"
        :key="user.id"
        class="appointment-card"
      >
        <div class="appointment-details">
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Rol:</strong> {{ user.role }}</p>
        </div>
        <div class="status-and-button">
          <div class="status">
            <p>
              <strong>Activ:</strong>
              <strong
                :class="{ active: user.isActive, inactive: !user.isActive }"
                >{{ user.isActive ? " Active" : " Inactive" }}</strong
              >
            </p>
          </div>
          <div class="button">
            <CustomButton
              id="change"
              @click="() => toggleActive(user.id)"
              class="text_white"
              >Modifică</CustomButton
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Nu există utilizatori.</p>
    </div>
  </div>
</template>

<style scoped>
.appointments-page {
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.appointments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.appointment-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.appointment-details p {
  margin: 5px 0;
}

.status-and-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status {
  flex: 1;
}

.button {
  margin-left: 20px;
}

.status p {
  margin: 0;
}

.status .active {
  color: green;
}

.status .inactive {
  color: #dc3545;
}

.button CustomButton {
  padding: 8px 12px;
  font-size: 14px;
  width: 100px;
  height: 100px;
}
.text_white {
  color: white;
}
</style>
