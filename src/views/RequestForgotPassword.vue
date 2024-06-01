<script setup>
import CustomButton from "../components/CustomButton.vue";
import router from "../router";
import { forgotPassword } from "../services/user_service";
import { ref } from "vue";
const username = ref("");

async function fetchForgotPassword() {
  console.log(username.value);
  await forgotPassword(username.value);
  router.push("/verify-code");
}
</script>

<template>
  <div class="forgot-password-container">
    <div class="forgot-password-card">
      <h1>Request New Password</h1>
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
        class="submit-button white-text"
        :widthInPx="150"
        @click="fetchForgotPassword"
        >Request New Password</CustomButton
      >
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
  width: 50vh;
  height: 40vh;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  margin-top: 5vh;
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
  margin: 0 auto;
  margin-top: 10vh;
}
.white-text {
  color: white;
}
</style>
