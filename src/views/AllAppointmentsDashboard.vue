<script setup>
import { computed, onMounted, ref } from "vue";
import { getAllFutureAppointments } from "../services/appointment_service";
import CustomButton from "../components/CustomButton.vue";
import router from "../router";

const appointments = ref([]);

onMounted(() => {
  fetchAllFutureAppointmets();
});

async function fetchAllFutureAppointmets() {
  await getAllFutureAppointments().then((res) => (appointments.value = res));
}
function editAppointment(id) {
  router.push({ name: "edit-appointment", params: { id: id } });
}
</script>

<template>
  <div class="appointments-page">
    <h1>Toate programările</h1>
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
            <strong>Serviciu:</strong>
            {{
              appointment.typeOfServices
                .map((service) => service.service)
                .join(", ")
            }}
          </p>
          <p>
            <strong>Ora programării:</strong> {{ appointment.appointmentHour }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No appointments available.</p>
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
