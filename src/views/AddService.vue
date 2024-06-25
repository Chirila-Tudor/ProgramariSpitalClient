<script setup>
import FormTitle from "../components/FormTitle.vue";
import CustomButton from "../components/CustomButton.vue";
import CustomInput from "../components/CustomInput.vue";
import { ref, watch, onMounted } from "vue";
import { addService } from "../services/typeOfWork_service";
import { getAllDoctors } from "../services/user_service";
import router from "../router";

const serviceName = ref("");
const selectedDoctors = ref([]);
const doctorOptions = ref([]);
const duration = ref("");
const errors = ref({
  serviceName: "",
  selectedDoctors: "",
  duration: "",
});

async function fetchDoctors() {
  try {
    const doctors = await getAllDoctors();
    doctorOptions.value = doctors.map((doctor) => ({
      label: doctor.username,
      value: doctor.username,
    }));
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }
}

onMounted(() => {
  fetchDoctors();
});

async function addServiceHandler() {
  for (const key in errors.value) {
    errors.value[key] = "";
  }
  let valid = true;
  if (!serviceName.value) {
    errors.value.serviceName = "Service name is required";
    valid = false;
  }
  if (selectedDoctors.value.length === 0) {
    errors.value.selectedDoctors = "At least one doctor is required";
    valid = false;
  }
  if (!duration.value) {
    errors.value.duration = "Duration is required";
    valid = false;
  } else if (isNaN(duration.value) || duration.value <= 0) {
    errors.value.duration = "Duration must be a positive number";
    valid = false;
  }
  if (!valid) {
    return;
  }

  const serviceData = {
    service: serviceName.value,
    doctorsWhoCanPerformService: selectedDoctors.value,
    duration: Number(duration.value),
  };

  try {
    const response = await addService(serviceData);
    if (response.ok) {
      router.push("/all-services");
    } else {
      console.error("Error adding service:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding service:", error);
  }
}

watch(serviceName, () => {
  if (errors.value.serviceName) errors.value.serviceName = "";
});

watch(
  selectedDoctors,
  () => {
    if (errors.value.selectedDoctors) errors.value.selectedDoctors = "";
  },
  { deep: true }
);

watch(duration, () => {
  if (errors.value.duration) errors.value.duration = "";
});
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div class="title">
        <FormTitle label="Adăugare serviciu" class="title-width" />
      </div>
      <div class="input-group">
        <label for="service-name-input">Numele serviciului:</label>
        <div v-if="errors.serviceName" class="error-message">
          {{ errors.serviceName }}
        </div>
        <CustomInput
          id="service-name-input"
          placeholder="Nume serviciu"
          v-model="serviceName"
        />
      </div>
      <div class="input-group">
        <label for="duration-input">Durata (minute):</label>
        <div v-if="errors.duration" class="error-message">
          {{ errors.duration }}
        </div>
        <CustomInput
          id="duration-input"
          placeholder="Durata"
          v-model="duration"
          type="number"
        />
      </div>
      <div class="input-group">
        <label for="doctor-name-input">Username doctori:</label>
        <div v-if="errors.selectedDoctors" class="error-message">
          {{ errors.selectedDoctors }}
        </div>
        <div class="doctor-options">
          <div
            v-for="doctor in doctorOptions"
            :key="doctor.value"
            class="doctor-option"
          >
            <input
              type="checkbox"
              :id="'doctor-' + doctor.value"
              v-model="selectedDoctors"
              :value="doctor.value"
              class="doctor-checkbox"
            />
            <label :for="'doctor-' + doctor.value" class="doctor-label">
              {{ doctor.label }}
            </label>
          </div>
        </div>
      </div>
      <div class="button-group">
        <CustomButton
          id="add-service"
          @click="addServiceHandler"
          class="white-text"
          :widthInPx="150"
        >
          Adăugare serviciu
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
  padding: 20px;
}

.form-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
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
  align-items: center;
  gap: 10px;
  padding-bottom: 30px;
}

.button-group {
  display: flex;
  justify-content: center;
  text-align: center;
}

.error-message {
  color: red;
  font-size: 12px;
  font-weight: bold;
}

.doctor-options {
  display: flex;
  flex-direction: column;
}

.doctor-option {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.doctor-checkbox {
  margin-right: 10px;
}

.doctor-label {
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.doctor-label:hover {
  background-color: #e0e0e0;
}

input[type="checkbox"]:focus + .doctor-label {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

input[type="checkbox"]:checked + .doctor-label {
  background-color: rgb(180, 6, 6);
  color: white;
}
.title-width {
  width: 40vh;
}
.white-text {
  color: white;
}

@media (min-width: 1200px) {
  .form-container {
    min-width: 300px;
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
