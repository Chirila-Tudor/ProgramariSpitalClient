<script setup>
import { getAllHalls, deleteHall } from "../services/hall_service";
import { onMounted, ref } from "vue";
import CustomButton from "../components/CustomButton.vue";
import ModalCustom from "../components/ModalCustom.vue";
import router from "../router";

const halls = ref([]);
const showModal = ref(false);
let hallIdToDelete = null;

onMounted(() => {
  fetchAllHalls();
});

async function fetchAllHalls() {
  await getAllHalls().then((res) => (halls.value = res));
}

function cancelDelete() {
  showModal.value = false;
}
function showDeleteModal(id) {
  hallIdToDelete = id;
  showModal.value = true;
}
async function deleteConfirmed() {
  try {
    await deleteHall(hallIdToDelete);
    fetchAllHalls();
    showModal.value = false;
  } catch (error) {
    console.error("Error deleting hall:", error);
    showModal.value = false;
  }
}
function editHall(hallId) {
  router.push({ name: "edit-halls", params: { id: hallId } });
}
</script>

<template>
  <div class="halls-page">
    <h1 class="title-center">Toate sălile</h1>
    <div v-if="halls.length" class="halls-grid">
      <div v-for="hall in halls" :key="hall.id" class="hall-card">
        <div class="hall-details">
          <p><strong>Numele camerei:</strong> {{ hall.room }}</p>
          <!-- <p><strong>Doctorul:</strong> {{ hall.doctorUsername }}</p> -->
          <p>
            <strong>Echipamente:</strong>
            {{ hall.equipment.map((equipment) => equipment.name).join(", ") }}
          </p>
        </div>
        <div class="button-group">
          <CustomButton
            id="edit-button"
            :isActive="true"
            :heightInPx="30"
            :widthInPx="70"
            class="white-text edit-color"
            @click="editHall(hall.id)"
          >
            Edit
          </CustomButton>
          <CustomButton
            id="delete-button"
            :isActive="true"
            :heightInPx="30"
            :widthInPx="70"
            class="white-text"
            @click="showDeleteModal(hall.id)"
          >
            Ștergere
          </CustomButton>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Nu există camere!</p>
    </div>
    <ModalCustom
      v-if="showModal"
      :title="'Delete hall'"
      :message="'Are you sure you want to delete this hall?'"
      @confirm="deleteConfirmed"
      @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
.halls-page {
  padding: 20px;
}
.title-center {
  text-align: center;
}

.halls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.hall-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
}

.hall-details {
  display: flex;
  flex-direction: column;
}

.hall-details p {
  margin: 5px 0;
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.white-text {
  color: white;
}
.edit-color {
  background-color: #ff9900;
}
</style>
