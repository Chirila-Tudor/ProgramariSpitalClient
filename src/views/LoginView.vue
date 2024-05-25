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

const username = ref("");
const passwordText = ref("");
const showErrorMessage = ref(false);
const errorMessage = ref("");

function redirectToHome() {
  router.push("/");
}
async function login() {
  const hashPassword = await bcrypt.hash(
    passwordText.value,
    "$2a$10$QkRidA35ea0Fzm/ObrOEgO"
  );
  if (username.value && passwordText.value) {
    loginUser(username.value, hashPassword)
      .then((res) => {
        isFirstLogin(username.value).then((res) => {
          if (res) {
            router.push("/change-password");
          } else {
            router.push("/");
          }
        });
        const firstLogin = localStorage.getItem("isFirstLogin");
        if (firstLogin === "true") {
        }
      })
      .catch((error) => {
        username.value = "";
        passwordText.value = "";
        showErrorMessage.value = true;
        errorMessage.value = error.message;
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
.forgot-password-link {
  color: #007bff; /* Blue color */
  text-decoration: none; /* Remove underline */
  transition: color 0.3s; /* Smooth color transition on hover */
}

.forgot-password-link:hover {
  color: #0056b3; /* Darker blue color on hover */
}
.white-text {
  color: white;
}
</style>
