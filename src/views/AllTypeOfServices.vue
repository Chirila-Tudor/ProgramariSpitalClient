<script setup>
import { getAllServices } from "../services/typeOfWork_service";
import { onMounted, ref } from "vue";
import router from "../router";

const services = ref([]);

onMounted(() => {
  fetchAllServices();
});

async function fetchAllServices() {
  await getAllServices().then((res) => (services.value = res));
}
</script>

<template>
  <div class="services-page">
    <h1 class="title-center">All Types of Services</h1>
    <div v-if="services.length" class="services-grid">
      <div v-for="service in services" :key="service.id" class="service-card">
        <div class="service-details">
          <p><strong>Service Name:</strong> {{ service.service }}</p>
          <p>
            <strong>Doctors:</strong>
            {{ service.doctorsWhoCanPerformService.join(", ") }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No services available.</p>
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
