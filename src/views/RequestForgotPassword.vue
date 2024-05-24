<script setup>
import CustomButton from "../components/CustomButton.vue";
import router from "../router";
import { requestNewPassword } from "../services/user_service";
import { ref } from "vue";
const username = ref("");
const securityCode = ref("");

async function fetchRequestPassoword(username, securityCode) {
  await requestNewPassword(username, securityCode);
}
</script>

<template>
  <div class="forgot-password-container">
    <div class="forgot-password-card">
      <h1>Request New Password</h1>
      <form @submit.prevent="submitForgotPassword" class="forgot-password-form">
        <div class="input-group">
          <label for="username" class="input-label">Username:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="input-field"
            required
          />
        </div>
        <CustomButton
          type="submit"
          class="submit-button"
          @click="fetchRequestPassoword(username, securityCode)"
          >Request New Password</CustomButton
        >
      </form>
    </div>
  </div>
</template>

<style scoped>
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.forgot-password-card {
  width: 500px; /* Adjust the width as needed */
  height: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.forgot-password-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-label {
  font-weight: bold;
}

.input-field {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.submit-button {
  margin: 0 auto; /* Center the button horizontally */
}
</style>
