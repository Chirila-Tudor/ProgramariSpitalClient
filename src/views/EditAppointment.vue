<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getAppointment,
  updateAppointment,
  getAvailableTimes,
} from "../services/appointment_service";
import FormTitle from "../components/FormTitle.vue";
import CustomButton from "../components/CustomButton.vue";
import CustomInput from "../components/CustomInput.vue";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const appointment = ref({
  appointmentHour: "",
  chooseDate: "",
  periodOfAppointment: "",
  typeOfServices: "",
});

const availableTimes = ref([]);
const doctorUsername = localStorage.getItem("username");

onMounted(async () => {
  const fetchedAppointment = await getAppointment(id);
  appointment.value.appointmentHour = fetchedAppointment.appointmentHour;
  appointment.value.chooseDate = fetchedAppointment.chooseDate;
  appointment.value.periodOfAppointment =
    fetchedAppointment.periodOfAppointment;
  appointment.value.typeOfServices =
    fetchedAppointment.typeOfServices[0].service;

  if (appointment.value.chooseDate && appointment.value.typeOfServices) {
    await fetchAvailableTimes();
  }
});

watch(
  () => appointment.value.chooseDate,
  async (newDate) => {
    if (newDate && appointment.value.typeOfServices) {
      await fetchAvailableTimes();
    }
  }
);

async function fetchAvailableTimes() {
  try {
    availableTimes.value = await getAvailableTimes(
      appointment.value.chooseDate,
      appointment.value.typeOfServices,
      doctorUsername
    );
  } catch (error) {
    console.log("Failed to fetch available times");
  }
}

async function handleUpdate() {
  await updateAppointment(id, appointment.value);
  const role = localStorage.getItem("role");
  if (role === "DOCTOR") {
    router.push({ name: "all-appointments-doctor" });
  } else if (role === "ADMIN") {
    router.push({ name: "all-appointments" });
  }
}
function handleCancel() {
  router.go(-1);
}
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div class="title">
        <FormTitle label="Edit Appointment" class="title-width" />
      </div>
      <div class="input-group">
        <label for="chooseDate">Choose Date:</label>
        <CustomInput
          type="date"
          id="chooseDate"
          placeholder="Choose Date"
          v-model:model-value="appointment.chooseDate"
        />
      </div>
      <div class="input-group">
        <label for="appointmentHour">Appointment Hour:</label>
        <select id="appointmentHour" v-model="appointment.appointmentHour">
          <option v-for="time in availableTimes" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>
      <div class="input-group">
        <label for="periodOfAppointment">Period of Appointment:</label>
        <CustomInput
          type="text"
          id="periodOfAppointment"
          placeholder="Period of Appointment"
          v-model:model-value="appointment.periodOfAppointment"
        />
      </div>
      <div class="button-group">
        <CustomButton
          id="update-appointment"
          @click="handleUpdate"
          class="white-text"
          :widthInPx="200"
        >
          Update Appointment
        </CustomButton>
        <CustomButton
          id="cancel-update"
          @click="handleCancel"
          class="white-text"
        >
          Cancel
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.form-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  width: 50vh;
  height: 55vh;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40vh;
  gap: 10px;
  padding-bottom: 30px;
}

.material-symbols-outlined {
  font-size: 24px;
  color: #333;
  cursor: pointer;
}

.button-group {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="date"],
select,
input[type="text"],
input[type="time"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath d='M10 15l6 6V9z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position-x: calc(100% - 10px);
  background-position-y: center;
  background-size: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
.title-width {
  width: 30vh;
  margin-top: 15px;
}
</style>
