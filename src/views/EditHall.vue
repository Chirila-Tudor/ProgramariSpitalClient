<script setup>
import { ref, onMounted } from "vue";
import { updateHospitalHall, getHospitalHall } from "../services/hall_service";
import { useRouter, useRoute } from "vue-router";
import FormTitle from "../components/FormTitle.vue";
import CustomButton from "../components/CustomButton.vue";
import CustomInput from "../components/CustomInput.vue";

const route = useRoute();
const router = useRouter();
const hallId = route.params.id;
const roomName = ref("");
const equipmentList = ref([]);
const newEquipment = ref("");
const doctorName = ref("");

onMounted(async () => {
  try {
    const hallData = await getHospitalHall(hallId);
    roomName.value = hallData.room;
    doctorName.value = hallData.doctorUsername;
    equipmentList.value = hallData.equipment;
  } catch (error) {
    console.error("Error fetching hall data:", error);
  }
});

async function updateHospitalHalls() {
  const equipments = equipmentList.value.map((equipment) => ({
    name: equipment.name,
  }));

  const hospitalHallData = {
    room: roomName.value,
    equipment: equipments,
    doctorUsername: doctorName.value,
  };

  try {
    await updateHospitalHall(hallId, hospitalHallData);
    console.log("Hospital hall updated successfully!");
    router.push("/");
  } catch (error) {
    console.error("Error updating hospital hall:", error);
  }
}

function addEquipment() {
  if (
    newEquipment.value.trim() !== "" &&
    equipmentList.value &&
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
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div class="title">
        <FormTitle label="Edit Hospital Hall" class="title-width" />
      </div>
      <div class="input-group">
        <label for="room-name-input">Room Name:</label>
        <CustomInput
          type="text"
          id="room-name-input"
          placeholder="Room Name"
          v-model:model-value="roomName"
        />
      </div>
      <div class="input-group">
        <label for="doctor-name-input">Doctor Name:</label>
        <CustomInput
          type="text"
          id="doctor-name-input"
          placeholder="Doctor Name"
          v-model:model-value="doctorName"
        />
      </div>
      <div class="input-group">
        <label for="equipment-input">Equipments:</label>
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
          id="update-hospital-hall"
          @click="updateHospitalHalls"
          class="white-text"
        >
          Update Hospital Hall
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
  height: 100vh;
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
</style>
