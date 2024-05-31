<script setup>
import FormTitle from "../components/FormTitle.vue";
import CustomButton from "../components/CustomButton.vue";
import CustomInput from "../components/CustomInput.vue";
import router from "../router";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { createHall } from "../services/hall_service";

const route = useRoute();
const roomName = ref("");
const equipmentList = ref([]);
const newEquipment = ref("");
const doctorName = ref("");

const errors = ref({
  roomName: "",
  doctorName: "",
  equipmentList: "",
});

function redirectToHome() {
  router.push("/");
}
function redirectToAllHalls() {
  router.push("/all-halls");
}

async function addHospitalHall() {
  for (const key in errors.value) {
    errors.value[key] = "";
  }
  let valid = true;
  if (!roomName.value) {
    errors.value.roomName = "Room name is required";
    valid = false;
  }
  if (!doctorName.value) {
    errors.value.doctorName = "Doctor is required";
    valid = false;
  }
  if (equipmentList.value.length == 0) {
    errors.value.equipmentList = "At least one equipment is required";
    valid = false;
  }
  if (!valid) {
    return;
  }

  const equipments = equipmentList.value.map((equipment) => ({
    name: equipment.name,
  }));

  if (equipments.length === 0) {
    console.error("No equipments added.");
    return;
  }

  const hospitalHallData = {
    room: roomName.value,
    equipment: equipments,
    doctorUsername: doctorName.value,
  };

  try {
    const response = await createHall(hospitalHallData);
    if (response) {
      redirectToAllHalls();
    }
  } catch (error) {
    console.error("Error adding hospital hall:", error);
  }
}

function addEquipment() {
  if (
    newEquipment.value.trim() !== "" &&
    !equipmentList.value.some(
      (equipment) => equipment.name === newEquipment.value
    )
  ) {
    equipmentList.value.push({ name: newEquipment.value });
    newEquipment.value = "";
  }
}

function deleteEquipment(index) {
  equipmentList.value.splice(index, 1);
}

watch(roomName, () => {
  if (errors.value.roomName) errors.value.roomName = "";
});
watch(doctorName, () => {
  if (errors.value.doctorName) errors.value.doctorName = "";
});
watch(
  equipmentList,
  () => {
    if (errors.value.equipmentList) errors.value.equipmentList = "";
  },
  { deep: true }
);
watch(roomName, (newValue) => {
  if (errors.value.roomName && newValue) {
    errors.value.roomName = "";
  } else if (!newValue) {
    errors.value.roomName = "Room Name is required";
  }
});
watch(doctorName, (newValue) => {
  if (errors.value.doctorName && newValue) {
    errors.value.doctorName = "";
  } else if (!newValue) {
    errors.value.doctorName = "Doctor is required";
  }
});
watch(
  equipmentList,
  () => {
    if (errors.value.equipmentList && equipmentList.value.length > 0) {
      errors.value.equipmentList = "";
    } else if (equipmentList.value.length === 0) {
      errors.value.equipmentList = "At least one equipment option is required";
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div class="title">
        <FormTitle label="Add Hospital Hall" class="title-width" />
      </div>
      <div class="input-group">
        <label for="room-name-input">Room Name:</label>
        <div v-if="errors.roomName" class="error-message">
          {{ errors.roomName }}
        </div>
        <CustomInput
          type="text"
          id="room-name-input"
          placeholder="Room Name"
          v-model:model-value="roomName"
        />
      </div>
      <div class="input-group">
        <label for="doctor-name-input">Doctor Name:</label>
        <div v-if="errors.doctorName" class="error-message">
          {{ errors.doctorName }}
        </div>
        <CustomInput
          type="text"
          id="doctor-name-input"
          placeholder="Doctor Name"
          v-model:model-value="doctorName"
        />
      </div>
      <div class="input-group">
        <label for="equipment-input">Equipments:</label>
        <div v-if="errors.equipmentList" class="error-message">
          {{ errors.equipmentList }}
        </div>
        <CustomInput
          type="text"
          id="equipment-input"
          placeholder="Add Equipment"
          v-model:model-value="newEquipment"
          @keydown.enter.prevent="addEquipment"
        />
        <div class="equipment-list">
          <div
            v-for="(equipment, index) in equipmentList"
            :key="index"
            class="equipment-item"
          >
            <span>{{ equipment.name }}</span>
            <button @click="deleteEquipment(index)" class="delete-button">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div class="button-group">
        <CustomButton
          id="add-hospital-hall"
          @click="addHospitalHall"
          class="white-text"
          >Add Hospital Hall</CustomButton
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
  height: 90vh;
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

.equipment-list {
  max-height: 60px;
  overflow-y: auto;
}

.equipment-item {
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
.title-width {
  width: 30vh;
  margin-left: 5vh;
}
.error-message {
  color: red;
  font-size: 12px;
  font-weight: bold;
}
</style>
