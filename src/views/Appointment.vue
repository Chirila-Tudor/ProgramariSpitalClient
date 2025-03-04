<script setup>
import router from "../router";
import { useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import FormTitle from "../components/FormTitle.vue";
import CustomInput from "../components/CustomInput.vue";
import CustomButton from "../components/CustomButton.vue";
import {
  createAppointment,
  getDoctorDateAvailability,
  getAvailableTimes,
  getPeriodOptions,
} from "../services/appointment_service";
import {
  getDoctorsByTypeOfService,
  getAllServices,
} from "../services/typeOfWork_service";
import { getAllHalls } from "../services/hall_service";

const route = useRoute();
const scheduledPerson = ref("");
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const phoneNumber = ref("");
const dateOfBirth = ref("");
const appointmentDate = ref("");
const period = ref("");
const errors = ref({
  scheduledPerson: "",
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dateOfBirth: "",
  appointmentDate: "",
  appointmentHour: "",
  period: "",
  hall: "",
  serviceOptions: "",
});
const services = ref([]);
const doctors = ref([]);
const availabilityMessage = ref("");
const availableTimes = ref([]);
const selectedService = ref("");
const selectedDoctor = ref("");
const selectedTime = ref("");
const periodOptions = ref([]);
const halls = ref([]);
const selectedHall = ref("");

onMounted(async () => {
  try {
    services.value = await getAllServices();
    periodOptions.value = await getPeriodOptions();
    halls.value = await getAllHalls();
    console.log(services.value);
  } catch (error) {
    console.error("Error fetching services:", error);
  }
});

async function fetchDoctors() {
  console.log("Selected service:", selectedService.value);
  try {
    const doctorsData = await getDoctorsByTypeOfService(selectedService.value);
    doctors.value = doctorsData;
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }
}

async function checkDateAvailability() {
  try {
    const response = await getDoctorDateAvailability(
      appointmentDate.value,
      selectedService.value,
      selectedDoctor.value
    );
    if (response.isAvailable) {
      availabilityMessage.value = "Doctor is available on this date.";
      fetchAvailableTimes();
    } else {
      availabilityMessage.value = "Doctor is not available on this date.";
      availableTimes.value = [];
    }
  } catch (error) {
    console.error("Error checking date availability:", error);
  }
}

async function fetchAvailableTimes() {
  try {
    const response = await getAvailableTimes(
      appointmentDate.value,
      selectedService.value,
      selectedDoctor.value
    );
    availableTimes.value = response;
  } catch (error) {
    console.error("Error fetching available times:", error);
  }
}

function redirectToHome() {
  router.push("/");
}

function redirectToAllAppointments() {
  router.push("/all-appointments");
}

async function scheduleAppointment() {
  console.log(services.value);
  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    return;
  }

  const appointmentData = {
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
    phoneNumber: phoneNumber.value,
    dateOfBirth: dateOfBirth.value,
    chooseDate: appointmentDate.value,
    appointmentHour: selectedTime.value,
    periodOfAppointment: period.value,
    hospitalHallName: halls.value.find((hall) => hall.id === selectedHall.value)
      ?.room,
    typeOfServices: selectedService.value,
  };

  try {
    const response = await createAppointment(
      appointmentData,
      scheduledPerson.value
    );
    if (response) {
      redirectToAllAppointments();
    }
    console.log(response);
  } catch (error) {
    console.error("Error scheduling appointment:", error);
  }
}

function validateForm() {
  const errors = {};
  if (!scheduledPerson.value)
    errors.scheduledPerson = "Scheduled Person is required";
  if (!email.value) errors.email = "Email is required";
  if (!firstName.value) errors.firstName = "First Name is required";
  if (!lastName.value) errors.lastName = "Last Name is required";
  if (!phoneNumber.value) errors.phoneNumber = "Phone Number is required";
  if (!dateOfBirth.value) errors.dateOfBirth = "Date of Birth is required";
  if (!appointmentDate.value)
    errors.appointmentDate = "Appointment Date is required";
  if (!selectedTime.value)
    errors.appointmentHour = "Appointment Hour is required";
  if (!period.value) errors.period = "Period of Time is required";
  if (!selectedHall.value) errors.hall = "Hall is required";
  return errors;
}

watch(
  [
    scheduledPerson,
    email,
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    appointmentDate,
    selectedTime,
    period,
    selectedHall,
  ],
  validateForm
);
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
        <FormTitle label="Crează o programare" class="title-width" />
      </div>
      <div class="input-group">
        <label for="scheduled-person-input">Pacient:</label>
        <div v-if="errors.scheduledPerson" class="error-message">
          {{ errors.scheduledPerson }}
        </div>
        <CustomInput
          type="text"
          id="scheduled-person-input"
          placeholder="Scheduled Person"
          v-model:model-value="scheduledPerson"
        />
      </div>
      <div class="input-group">
        <label for="email-input">E-mail:</label>
        <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        <CustomInput
          type="email"
          id="email-input"
          placeholder="Email"
          v-model:model-value="email"
        />
      </div>
      <div class="input-group">
        <label for="last-name-input">Nume:</label>
        <div v-if="errors.lastName" class="error-message">
          {{ errors.lastName }}
        </div>
        <CustomInput
          type="text"
          id="last-name-input"
          placeholder="Last Name"
          v-model:model-value="lastName"
        />
      </div>
      <div class="input-group">
        <label for="first-name-input">Prenume:</label>
        <div v-if="errors.firstName" class="error-message">
          {{ errors.firstName }}
        </div>
        <CustomInput
          type="text"
          id="first-name-input"
          placeholder="First Name"
          v-model:model-value="firstName"
        />
      </div>
      <div class="input-group">
        <label for="phone-number-input">Număr de telefon:</label>
        <div v-if="errors.phoneNumber" class="error-message">
          {{ errors.phoneNumber }}
        </div>
        <CustomInput
          type="tel"
          id="phone-number-input"
          placeholder="Phone Number"
          v-model:model-value="phoneNumber"
        />
      </div>
      <div class="input-group">
        <label for="dob-input">Data nașterii:</label>
        <div v-if="errors.dateOfBirth" class="error-message">
          {{ errors.dateOfBirth }}
        </div>
        <CustomInput
          type="date"
          id="dob-input"
          placeholder="Date of Birth"
          v-model:model-value="dateOfBirth"
        />
      </div>
      <div class="input-group">
        <label for="room-input">Sală:</label>
        <div v-if="errors.hall" class="error-message">{{ errors.hall }}</div>
        <div class="select-wrapper">
          <select id="room-input" v-model="selectedHall">
            <option value="" disabled>Selectează sală</option>
            <option v-for="hall in halls" :value="hall.id" :key="hall.id">
              {{ hall.room }}
            </option>
          </select>
        </div>
      </div>
      <div class="input-group">
        <label for="service-type-input">Serviciu:</label>
        <div v-if="errors.serviceOptions" class="error-message">
          {{ errors.serviceOptions }}
        </div>
        <div class="select-wrapper">
          <select
            id="service-type-input"
            v-model="selectedService"
            @change="fetchDoctors"
          >
            <option value="" disabled>Selectează serviciu</option>
            <option
              v-for="service in services"
              :value="service.id"
              :key="service.id"
            >
              {{ service.service }}
            </option>
          </select>
        </div>
        <div class="input-group">
          <label for="doctor-select">Doctor:</label>
          <div v-if="errors.doctor" class="error-message">
            {{ errors.doctor }}
          </div>
          <div class="select-wrapper">
            <select id="doctor-select" v-model="selectedDoctor">
              <option value="" disabled>Alege doctor</option>
              <option v-for="doctor in doctors" :value="doctor" :key="doctor">
                {{ doctor }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="availability-section">
        <label for="date-input">Data programării:</label>
        <input
          type="date"
          id="date-input"
          placeholder="Choose Date of Appointment"
          v-model="appointmentDate"
          @change="checkDateAvailability"
        />
        <div
          v-if="!availabilityMessage && errors.appointmentDate"
          class="error-message"
        >
          {{ errors.appointmentDate }}
        </div>
        <div v-if="availableTimes.length > 0">
          <label for="time-select">Ora:</label>
          <div class="select-wrapper">
            <select id="time-select" v-model="selectedTime">
              <option v-for="time in availableTimes" :value="time" :key="time">
                {{ time }}
              </option>
            </select>
          </div>
        </div>
        <div class="input-group">
          <label for="period-input">Perioada zilei:</label>
          <div v-if="errors.period" class="error-message">
            {{ errors.period }}
          </div>
          <div class="select-wrapper">
            <select id="period-input" v-model="period">
              <option value="" disabled>Selectează perioada zilei</option>
              <option
                v-for="option in periodOptions"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="button-group">
        <CustomButton
          id="schedule-appointment"
          :widthInPx="150"
          @click="scheduleAppointment"
          class="white-text"
        >
          Programează
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
  height: 185vh;
}

.form-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  max-width: 500px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
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
  width: 25vh;
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
  align-items: center;
  margin-bottom: 10px;
}

.service-option span {
  font-size: 14px;
  margin-right: 10px;
}

.delete-button {
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
}

.availability-section {
  margin-bottom: 20px;
}

.availability-message {
  margin-top: 10px;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.select-wrapper select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  appearance: none;
}

.select-wrapper::after {
  content: "\25BC";
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
}
.white-text {
  color: white;
}

@media (min-width: 1200px) {
  .form-container {
    min-width: 400px;
    padding: 30px;
  }

  .title-width {
    font-size: 24px;
    white-space: nowrap;
  }

  .select-wrapper select {
    padding: 15px;
  }

  .button-group {
    gap: 20px;
  }
}
</style>
