<script setup>
import { onMounted, ref, watch } from "vue";
import { getAppointmentsForDoctor } from "../services/appointment_service";
import CustomButton from "../components/CustomButton.vue";
import router from "../router";

const appointments = ref([]);
const filteredAppointments = ref([]);
const selectedDate = ref(new Date().toISOString().split("T")[0]);

onMounted(async () => {
  const doctorUsername = localStorage.getItem("username");
  if (doctorUsername) {
    const fetchedAppointments = await getAppointmentsForDoctor(doctorUsername);
    appointments.value = fetchedAppointments;
  }
});

watch(selectedDate, (newDate) => {
  if (newDate) {
    filteredAppointments.value = appointments.value.filter(
      (appointment) => appointment.chooseDate === newDate
    );
  } else {
    filteredAppointments.value = appointments.value;
  }
});

function editAppointment(id) {
  router.push({ name: "edit-appointment", params: { id: id } });
}
</script>

<template>
  <div class="appointments-page">
    <h1>Programările tale</h1>
    <div class="date-picker">
      <label for="date">Selectează data: </label>
      <input type="date" id="date" v-model="selectedDate" class="date-input" />
    </div>
    <div v-if="filteredAppointments.length" class="appointments-grid">
      <div
        v-for="appointment in filteredAppointments"
        :key="appointment.id"
        class="appointment-card"
      >
        <div class="appointment-details">
          <p>
            <strong>Pacient:</strong>
            {{ appointment.firstName + " " + appointment.lastName }}
          </p>
          <p>
            <strong>Data programării:</strong>
            {{ appointment.chooseDate }}
          </p>
          <p>
            <strong>Ora programării:</strong> {{ appointment.appointmentHour }}
          </p>
          <p>
            <strong>Serviciu: </strong>
            <span
              v-for="(service, index) in appointment.typeOfServices"
              :key="index"
            >
              {{ service.service
              }}<span v-if="index < appointment.typeOfServices.length - 1"
                >,
              </span>
            </span>
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
    <div v-else class="no-appointments-message">
      <p>Ești liber astăzi!</p>
    </div>
  </div>
</template>

<style scoped>
.appointments-page {
  padding: 20px;
}

.date-picker {
  margin-bottom: 20px;
  text-align: center;
}

.date-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
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
.no-appointments-message {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #000000;
}
</style>
