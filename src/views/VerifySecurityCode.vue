<script setup>
import CustomButton from "../components/CustomButton.vue";
import CustomInput from "../components/CustomInput.vue";
import router from "../router";
import { requestNewPassword } from "../services/user_service";
import { ref } from "vue";
const username = ref("");
const securityCode = ref("");

async function fetchRequestPassword() {
  await requestNewPassword(username.value, securityCode.value);
  router.push("/login");
}
</script>

<template>
  <div class="forgot-password-container">
    <div class="forgot-password-card">
      <h1>Verificare cod securitate</h1>
      <div class="input-group">
        <div class="input-wrapper">
          <label for="username" class="input-label">Username:</label>
          <CustomInput
            type="text"
            id="username"
            placeholder="Username"
            v-model:model-value="username"
            :widthInPx="300"
          />
        </div>
        <div class="input-wrapper">
          <label for="security" class="input-label">Cod securitate:</label>
          <CustomInput
            type="text"
            id="security"
            placeholder="Security Code"
            v-model:model-value="securityCode"
            :widthInPx="300"
          />
        </div>
      </div>
      <CustomButton
        type="submit"
        class="submit-button white-text"
        @click="fetchRequestPassword"
        >Trimitere nouă parolă</CustomButton
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
  width: 500px;
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
  align-items: center;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
}

.input-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input-field {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.submit-button {
  margin: 0 auto;
}
.white-text {
  color: white;
}
</style>
