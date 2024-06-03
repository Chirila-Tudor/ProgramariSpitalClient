<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getAppointment,
  updateAppointment,
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
});

onMounted(async () => {
  const fetchedAppointment = await getAppointment(id);
  appointment.value.appointmentHour = fetchedAppointment.appointmentHour;
  appointment.value.chooseDate = fetchedAppointment.chooseDate;
  appointment.value.periodOfAppointment =
    fetchedAppointment.periodOfAppointment;
});

async function handleUpdate() {
  await updateAppointment(id, appointment.value);
  const role = localStorage.getItem("role");
  if (role === "DOCTOR") {
    router.push({ name: "all-appointments-doctor" });
  } else if (role === "ADMIN") {
    router.push({ name: "all-appointments" });
  }
}
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div class="title">
        <FormTitle label="Edit Appointment" class="title-width" />
      </div>
      <form @submit.prevent="handleUpdate" class="form-content">
        <div class="form-group">
          <label for="appointmentHour">Appointment Hour:</label>
          <CustomInput
            type="time"
            id="appointmentHour"
            placeholder="Appointment Hour"
            v-model:model-value="appointment.appointmentHour"
          />
        </div>
        <div class="form-group">
          <label for="chooseDate">Choose Date:</label>
          <CustomInput
            type="date"
            id="chooseDate"
            placeholder="Choose Date"
            v-model:model-value="appointment.chooseDate"
          />
        </div>
        <div class="form-group">
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
          >
            Update Appointment
          </CustomButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  width: 40vh;
}

.title {
  display: flex;
  align-items: center;
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
  justify-content: center;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-content {
  width: 100%;
}

.white-text {
  color: white;
}

.title-width {
  width: 30vh;
  margin-left: 5vh;
}
</style>
