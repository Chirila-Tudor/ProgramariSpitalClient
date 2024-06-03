<script setup>
import { onMounted, ref } from "vue";
import {
  getHospitalHallByDoctor,
  getAppointmentsByHospitalHall,
} from "../services/hall_service";
import CustomButton from "../components/CustomButton.vue";
import router from "../router";

const appointments = ref([]);

onMounted(async () => {
  const doctorUsername = localStorage.getItem("username");
  if (doctorUsername) {
    const hallId = await fetchHospitalHallIdByDoctor(doctorUsername);
    if (hallId) {
      fetchAppointmentsByHospitalHall(hallId);
    }
  }
});

async function fetchHospitalHallIdByDoctor(doctorUsername) {
  const response = await getHospitalHallByDoctor(doctorUsername);
  if (response && response.id) {
    return response.id;
  } else {
    return null;
  }
}

async function fetchAppointmentsByHospitalHall(hallId) {
  await getAppointmentsByHospitalHall(hallId).then(
    (res) => (appointments.value = res)
  );
}
function editAppointment(id) {
  router.push({ name: "edit-appointment", params: { id: id } });
}
</script>

<template>
  <div class="appointments-page">
    <h1>Programarile tale</h1>
    <div v-if="appointments.length" class="appointments-grid">
      <div
        v-for="appointment in appointments"
        :key="appointment.id"
        class="appointment-card"
      >
        <div class="appointment-details">
          <p>
            <strong>Scheduled Person:</strong>
            {{ appointment.firstName + " " + appointment.lastName }}
          </p>
          <p>
            <strong>Date of Appointment:</strong>
            {{ appointment.chooseDate }}
          </p>
          <p>
            <strong>Appointment Hour:</strong> {{ appointment.appointmentHour }}
          </p>
          <CustomButton
            id="edit-button"
            :isActive="true"
            :heightInPx="30"
            :widthInPx="70"
            class="white-text edit-color"
            @click="editAppointment(appointment.id)"
          >
            Edit
          </CustomButton>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No appointments available for your hospital hall.</p>
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
