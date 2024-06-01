<script setup>
import router from "../router";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
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
const hall = ref("");
const serviceOptions = ref([]);
const newServiceOption = ref();

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

function redirectToHome() {
  router.push("/");
}
function redirectToAllAppointments() {
  router.push("/all-appointments");
}

async function scheduleAppointment() {
  for (const key in errors.value) {
    errors.value[key] = "";
  }

  let valid = true;
  if (!scheduledPerson.value) {
    errors.value.scheduledPerson = "Scheduled Person is required";
    valid = false;
  }
  if (!email.value) {
    errors.value.email = "Email is required";
    valid = false;
  }
  if (!firstName.value) {
    errors.value.firstName = "First Name is required";
    valid = false;
  }
  if (!lastName.value) {
    errors.value.lastName = "Last Name is required";
    valid = false;
  }
  if (!phoneNumber.value) {
    errors.value.phoneNumber = "Phone Number is required";
    valid = false;
  }
  if (!dateOfBirth.value) {
    errors.value.dateOfBirth = "Date of Birth is required";
    valid = false;
  }
  if (!appointmentDate.value) {
    errors.value.appointmentDate = "Appointment Date is required";
    valid = false;
  }
  if (!appointmentHour.value) {
    errors.value.appointmentHour = "Appointment Hour is required";
    valid = false;
  }
  if (!period.value) {
    errors.value.period = "Period of Time is required";
    valid = false;
  }
  if (!hall.value) {
    errors.value.hall = "Hall is required";
    valid = false;
  }
  if (serviceOptions.value.length === 0) {
    errors.value.serviceOptions = "At least one service option is required";
    valid = false;
  }

  if (!valid) {
    return;
  }

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
    hospitalHallName: hall.value,
    typeOfService: services,
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

watch(scheduledPerson, (newValue) => {
  if (errors.value.scheduledPerson && newValue) {
    errors.value.scheduledPerson = "";
  } else if (!newValue) {
    errors.value.scheduledPerson = "Scheduled Person is required";
  }
});
watch(email, (newValue) => {
  if (errors.value.email && newValue) {
    errors.value.email = "";
  } else if (!newValue) {
    errors.value.email = "Email is required";
  }
});
watch(firstName, (newValue) => {
  if (errors.value.firstName && newValue) {
    errors.value.firstName = "";
  } else if (!newValue) {
    errors.value.firstName = "First Name is required";
  }
});
watch(lastName, (newValue) => {
  if (errors.value.lastName && newValue) {
    errors.value.lastName = "";
  } else if (!newValue) {
    errors.value.lastName = "Last Name is required";
  }
});
watch(phoneNumber, (newValue) => {
  if (errors.value.phoneNumber && newValue) {
    errors.value.phoneNumber = "";
  } else if (!newValue) {
    errors.value.phoneNumber = "Phone Number is required";
  }
});
watch(dateOfBirth, (newValue) => {
  if (errors.value.dateOfBirth && newValue) {
    errors.value.dateOfBirth = "";
  } else if (!newValue) {
    errors.value.dateOfBirth = "Date of Birth is required";
  }
});
watch(appointmentDate, (newValue) => {
  if (errors.value.appointmentDate && newValue) {
    errors.value.appointmentDate = "";
  } else if (!newValue) {
    errors.value.appointmentDate = "Appointment Date is required";
  }
});
watch(appointmentHour, (newValue) => {
  if (errors.value.appointmentHour && newValue) {
    errors.value.appointmentHour = "";
  } else if (!newValue) {
    errors.value.appointmentHour = "Appointment Hour is required";
  }
});
watch(period, (newValue) => {
  if (errors.value.period && newValue) {
    errors.value.period = "";
  } else if (!newValue) {
    errors.value.period = "Period of Time is required";
  }
});
watch(hall, (newValue) => {
  if (errors.value.hall && newValue) {
    errors.value.hall = "";
  } else if (!newValue) {
    errors.value.hall = "Hall is required";
  }
});
watch(
  serviceOptions,
  () => {
    if (errors.value.serviceOptions && serviceOptions.value.length > 0) {
      errors.value.serviceOptions = "";
    } else if (serviceOptions.value.length === 0) {
      errors.value.serviceOptions = "At least one service option is required";
    }
  },
  { deep: true }
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
        <FormTitle label="Make an Appointment" />
      </div>
      <div class="input-group">
        <label for="scheduled-person-input">Scheduled Person:</label>
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
        <label for="email-input">Email:</label>
        <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        <CustomInput
          type="email"
          id="email-input"
          placeholder="Email"
          v-model:model-value="email"
        />
      </div>
      <div class="input-group">
        <label for="first-name-input">First Name:</label>
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
        <label for="last-name-input">Last Name:</label>
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
        <label for="phone-number-input">Phone Number:</label>
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
        <label for="dob-input">Date of Birth:</label>
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
        <label for="appointment-date-input">Choose Date of Appointment:</label>
        <div v-if="errors.appointmentDate" class="error-message">
          {{ errors.appointmentDate }}
        </div>
        <CustomInput
          type="date"
          id="appointment-date-input"
          placeholder="Choose Date of Appointment"
          v-model:model-value="appointmentDate"
        />
      </div>
      <div class="input-group">
        <label for="appointment-hour-input">Appointment Hour:</label>
        <div v-if="errors.appointmentHour" class="error-message">
          {{ errors.appointmentHour }}
        </div>
        <CustomInput
          type="time"
          id="appointment-hour-input"
          placeholder="Appointment Hour"
          v-model:model-value="appointmentHour"
        />
      </div>
      <div class="input-group">
        <label for="period-input">Period of Time:</label>
        <div v-if="errors.period" class="error-message">
          {{ errors.period }}
        </div>
        <CustomInput
          type="text"
          id="period-input"
          placeholder="Period of Time"
          v-model:model-value="period"
        />
      </div>
      <div class="input-group">
        <label for="room-input">Hall:</label>
        <div v-if="errors.hall" class="error-message">{{ errors.hall }}</div>
        <CustomInput
          type="text"
          id="room-input"
          placeholder="Hall"
          v-model:model-value="hall"
        />
      </div>
      <div class="input-group">
        <label for="service-type-input">Type of Service:</label>
        <div v-if="errors.serviceOptions" class="error-message">
          {{ errors.serviceOptions }}
        </div>
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
          :widthInPx="150"
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
  height: 150vh;
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
.error-message {
  color: red;
  font-size: 12px;
  font-weight: bold;
}
</style>
