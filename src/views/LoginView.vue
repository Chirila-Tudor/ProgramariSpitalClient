<script setup>
import router from "../router";
import { useRoute } from "vue-router";
import { ref } from "vue";
import FormTitle from "../components/FormTitle.vue";
import InvalidInputMessage from "../components/InvalidInputMessage.vue";
import CustomInput from "../components/CustomInput.vue";
import PasswordInput from "../components/PasswordInput.vue";
import CustomButton from "../components/CustomButton.vue";
const route = useRoute();

const emailText = ref("");
const passwordText = ref("");
const showErrorMessage = ref(false);
const errorMessage = ref("");

function redirectToHome() {
  router.push("/");
}
function handlePasswordTextChanged(password) {
  passwordText.value = password;
}
</script>

<template>
  <div class="container">
    <div>
      <img src="../assets/img/doctorLogin.avif" />
    </div>
    <div class="loginContainer">
      <div class="title">
        <span
          class="material-symbols-outlined"
          @click="redirectToHome"
          style="cursor: pointer"
        >
          home
        </span>
        <FormTitle label="Log In" />
      </div>
      <InvalidInputMessage
        :message="errorMessage"
        :class="{ 'error-message-visible': showErrorMessage }"
      />
      <div>
        <CustomInput
          type="text"
          id="email-input"
          placeholder="E-mail"
          v-model:model-value="emailText"
          :widthInPx="12"
        />
      </div>
      <div id="password-input">
        <PasswordInput
          :label="'Password'"
          :value="passwordText"
          @password-changed="handlePasswordTextChanged"
          @enter-password="login"
        />
      </div>
      <div>
        <CustomButton id="sign-in" @click="login">Log in</CustomButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15vw;
  position: relative;
  margin-top: 20vh;
}

.imageContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  gap: 20px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input {
  padding: 5px;
  border: none;
}
</style>
