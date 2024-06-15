<script setup>
import { getAllServices } from "../services/typeOfWork_service";
import { onMounted, ref } from "vue";
import router from "../router";

const services = ref([]);

onMounted(() => {
  fetchAllServices();
});

// async function fetchAllServices() {
//   await getAllServices().then((res) => (services.value = res));
// }
async function fetchAllServices() {
  try {
    const res = await getAllServices();
    services.value = res.map((service) => ({
      ...service,
      durationFormatted: formatDuration(service.duration),
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
  }
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
</script>

<template>
  <div class="services-page">
    <h1 class="title-center">Toate serviciile</h1>
    <div v-if="services.length" class="services-grid">
      <div v-for="service in services" :key="service.id" class="service-card">
        <div class="service-details">
          <p><strong>Nume serviciu:</strong> {{ service.service }}</p>
          <p><strong>Durată:</strong> {{ service.durationFormatted }}</p>
          <p>
            <strong>Doctori:</strong>
            {{ service.doctorsWhoCanPerformService.join(", ") }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Nu exista servicii!</p>
    </div>
  </div>
</template>

<style scoped>
.services-page {
  padding: 20px;
}
.title-center {
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.service-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
}

.service-details {
  display: flex;
  flex-direction: column;
}

.service-details p {
  margin: 5px 0;
}
.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.white-text {
  color: white;
}
.edit-color {
  background-color: #ff9900;
}
</style>
