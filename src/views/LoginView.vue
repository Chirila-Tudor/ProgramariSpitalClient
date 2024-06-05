<script setup>
import router from "../router";
import { useRoute } from "vue-router";
import { ref } from "vue";
import sha256 from "sha256";
import { loginUser } from "../services/user_service";
import FormTitle from "../components/FormTitle.vue";
import InvalidInputMessage from "../components/InvalidInputMessage.vue";
import CustomInput from "../components/CustomInput.vue";
import PasswordInput from "../components/PasswordInput.vue";
import CustomButton from "../components/CustomButton.vue";
const route = useRoute();

const username = ref("");
const passwordText = ref("");
const showErrorMessage = ref(false);
const errorMessage = ref("");

function redirectToHome() {
  router.push("/");
}
async function login() {
  if (username.value && passwordText.value) {
    await loginUser(username.value, sha256(passwordText.value))
      .then((res) => {
        const firstLogin = localStorage.getItem("isFirstLogin");
        if (firstLogin === "true") {
          router.push("/change-password");
        } else {
          window.location.replace("/");
        }
      })
      .catch((error) => {
        username.value = "";
        passwordText.value = "";
        showErrorMessage.value = true;
        errorMessage.value =
          "Incorrect username or password. Please try again.";
      });
  } else {
    showErrorMessage.value = true;
    errorMessage.value = "The fields must not be empty";
    passwordText.value = "";
  }
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
          placeholder="Username"
          v-model:model-value="username"
          :widthInPx="300"
        />
      </div>
      <div id="password-input">
        <PasswordInput
          :label="'Password'"
          :value="passwordText"
          @password-changed="handlePasswordTextChanged"
          @enter-password="login"
          :widthInPx="300"
        />
      </div>
      <div id="forgot-password">
        <router-link to="/recovery" class="forgot-password-link">
          Forgot password?
        </router-link>
      </div>
      <div>
        <CustomButton id="sign-in" @click="login" class="white-text"
          >Log in</CustomButton
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
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  gap: 20px;
  width: 40vh;
  height: 50vh;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5vh;
}
input {
  padding: 5px;
  border: none;
}
.forgot-password-link {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-password-link:hover {
  color: #0056b3;
}
.white-text {
  color: white;
}
.error-message-visible {
  display: block;
  color: red;
  margin-bottom: 10px;
}
</style>
