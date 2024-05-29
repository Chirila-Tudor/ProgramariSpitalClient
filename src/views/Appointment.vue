<script setup>
import router from "../router";
import { useRoute } from "vue-router";
import { ref } from "vue";
import FormTitle from "../components/FormTitle.vue";
import CustomInput from "../components/CustomInput.vue";
import CustomButton from "../components/CustomButton.vue";
import { createAppointment } from "../services/appointment_service";

const route = useRoute();
const scheduledPerson = ref("");
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const phoneNumber = ref("");
const dateOfBirth = ref("");
const appointmentDate = ref("");
const appointmentHour = ref("");
const period = ref("");
const serviceOptions = ref([]);
const newServiceOption = ref();

function redirectToHome() {
  router.push("/");
}

async function scheduleAppointment() {
  const services = serviceOptions.value.map((option) => ({
    service: option.service,
  }));

  if (services.length === 0) {
    console.error("No service options added.");
    return;
  }

  const appointmentData = {
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
    phoneNumber: phoneNumber.value,
    dateOfBirth: dateOfBirth.value,
    chooseDate: appointmentDate.value,
    appointmentHour: appointmentHour.value,
    periodOfAppointment: period.value,
    typeOfService: services,
  };

  try {
    const response = await createAppointment(
      appointmentData,
      scheduledPerson.value
    );
    if (response) {
      router.push("/");
    }
    console.log(response);
  } catch (error) {
    console.error("Error scheduling appointment:", error);
  }
}

function addServiceOption() {
  if (
    newServiceOption.value.trim() !== "" &&
    !serviceOptions.value.some(
      (option) => option.service === newServiceOption.value
    )
  ) {
    serviceOptions.value.push({ service: newServiceOption.value });
    newServiceOption.value = "";
  }
}

function deleteServiceOption(index) {
  serviceOptions.value.splice(index, 1);
}
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div class="title">
        <span
          class="material-symbols-outlined"
          @click="redirectToHome"
          style="cursor: pointer"
        >
          home
        </span>
        <FormTitle label="Make an Appointment" />
      </div>
      <div class="input-group">
        <label for="scheduled-person-input">Scheduled Person:</label>
        <CustomInput
          type="text"
          id="scheduled-person-input"
          placeholder="Scheduled Person"
          v-model:model-value="scheduledPerson"
        />
      </div>
      <div class="input-group">
        <label for="email-input">Email:</label>
        <CustomInput
          type="email"
          id="email-input"
          placeholder="Email"
          v-model:model-value="email"
        />
      </div>
      <div class="input-group">
        <label for="first-name-input">First Name:</label>
        <CustomInput
          type="text"
          id="first-name-input"
          placeholder="First Name"
          v-model:model-value="firstName"
        />
      </div>
      <div class="input-group">
        <label for="last-name-input">Last Name:</label>
        <CustomInput
          type="text"
          id="last-name-input"
          placeholder="Last Name"
          v-model:model-value="lastName"
        />
      </div>
      <div class="input-group">
        <label for="phone-number-input">Phone Number:</label>
        <CustomInput
          type="tel"
          id="phone-number-input"
          placeholder="Phone Number"
          v-model:model-value="phoneNumber"
        />
      </div>
      <div class="input-group">
        <label for="dob-input">Date of Birth:</label>
        <CustomInput
          type="date"
          id="dob-input"
          placeholder="Date of Birth"
          v-model:model-value="dateOfBirth"
        />
      </div>
      <div class="input-group">
        <label for="appointment-date-input">Choose Date of Appointment:</label>
        <CustomInput
          type="date"
          id="appointment-date-input"
          placeholder="Choose Date of Appointment"
          v-model:model-value="appointmentDate"
        />
      </div>
      <div class="input-group">
        <label for="appointment-hour-input">Appointment Hour:</label>
        <CustomInput
          type="time"
          id="appointment-hour-input"
          placeholder="Appointment Hour"
          v-model:model-value="appointmentHour"
        />
      </div>
      <div class="input-group">
        <label for="period-input">Period of Time:</label>
        <CustomInput
          type="text"
          id="period-input"
          placeholder="Period of Time"
          v-model:model-value="period"
        />
      </div>
      <div class="input-group">
        <label for="service-type-input">Type of Service:</label>
        <CustomInput
          type="text"
          id="service-type-input"
          placeholder="Type of Service"
          v-model:model-value="newServiceOption"
          @keydown.enter.prevent="addServiceOption"
        />
        <div class="service-options">
          <div
            v-for="(option, index) in serviceOptions"
            :key="index"
            class="service-option"
          >
            <span>{{ option.service }}</span>
            <button @click="deleteServiceOption(index)" class="delete-button">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div class="button-group">
        <CustomButton
          id="schedule-appointment"
          @click="scheduleAppointment"
          class="white-text"
          >Schedule Appointment</CustomButton
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110vh;
}

.form-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  width: 40vh;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.label {
  margin-bottom: 5px;
  font-weight: bold;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  width: 30vh;
}

.material-symbols-outlined {
  font-size: 24px;
  color: #333;
}

.button-group {
  display: flex;
  justify-content: center;
  text-align: center;
}
.service-options {
  max-height: 60px;
  overflow-y: auto;
}

.service-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-button {
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
}
.white-text {
  color: white;
}
</style>
