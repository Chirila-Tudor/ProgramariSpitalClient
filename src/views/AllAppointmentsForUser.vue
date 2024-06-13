<script setup>
import { computed, onMounted, ref } from "vue";
import { getAppointmentsByScheduledPerson } from "../services/appointment_service";
import CustomButton from "../components/CustomButton.vue";
import router from "../router";

const appointments = ref([]);
onMounted(() => {
  const username = localStorage.getItem("username");
  if (username) {
    fetchAppointmentsByScheduledPerson(username);
  } else {
    console.error("Username not found in localStorage");
  }
});
async function fetchAppointmentsByScheduledPerson(username) {
  await getAppointmentsByScheduledPerson(username).then(
    (res) => (appointments.value = res)
  );
}
</script>

<template>
  <div class="appointments-page">
    <h1>Programările tale</h1>
    <div v-if="appointments.length" class="appointments-grid">
      <div
        v-for="appointment in appointments"
        :key="appointment.id"
        class="appointment-card"
      >
        <div class="appointment-details">
          <p>
            <strong>Pacient:</strong>
            {{ appointment.firstName + " " + appointment.lastName }}
          </p>
          <p><strong>Data programării:</strong> {{ appointment.chooseDate }}</p>
          <p>
            <strong>Ora programării:</strong> {{ appointment.appointmentHour }}
          </p>
          <p>
            <strong>Serviciu:</strong>
            {{
              appointment.typeOfServices
                .map((service) => service.service)
                .join(", ")
            }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Nu aveti nicio programare.</p>
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
}

.appointments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.appointment-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
}

.appointment-details p {
  margin: 5px 0;
}
.white-text {
  color: white;
}
</style>
