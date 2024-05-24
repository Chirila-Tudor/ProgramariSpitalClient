<script setup>
import router from "../router";
import { useRoute } from "vue-router";
import { ref } from "vue";
import FormTitle from "../components/FormTitle.vue";
import InvalidInputMessage from "../components/InvalidInputMessage.vue";
import PasswordInput from "../components/PasswordInput.vue";
import CustomButton from "../components/CustomButton.vue";
const route = useRoute();

const username = ref("");
const oldPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const showErrorMessage = ref(false);
const errorMessage = ref("");
const passwordLength = ref(0);
const containsUppercase = ref(false);
const containsSpecialCharacter = ref(false);
const firstLogin = ref(false);

function submit() {
  if (
    oldPasswordText.value &&
    newPasswordText.value &&
    confirmNewPassword.value
  ) {
    if (newPasswordText.value === confirmNewPassword.value) {
      let passwordFormatOK = true;
      const upperCaseRegex = /[A-Z]/;
      const specialCharacterRegex = /[#$^&*_@]/;

      if (newPasswordText.value.length < 12) {
        errorMessage.value =
          "The new password must contain at least 12 characters";
        showErrorMessage.value = true;
        passwordFormatOK = false;
      }

      if (!upperCaseRegex.test(newPasswordText.value) && passwordFormatOK) {
        errorMessage.value =
          "The new password must contain at least one uppercase character";
        showErrorMessage.value = true;
        passwordFormatOK = false;
      }

      if (
        !specialCharacterRegex.test(newPasswordText.value) &&
        passwordFormatOK
      ) {
        errorMessage.value =
          "The new password must contain at least one special character(#$^&*_@)";
        showErrorMessage.value = true;
        passwordFormatOK = false;
      }

      if (passwordFormatOK) {
        changePassword({
          username: username.value,
          oldPassword: oldPasswordText.value,
          newPassword: newPasswordText.value,
        })
          .then((res) => {
            logout();
            router.push("/login");
          })
          .catch((error) => {
            errorMessage.value = "Old password is incorrect";
            showErrorMessage.value = true;
          });
      }
    } else {
      errorMessage.value = "Passwords are not equal";
      showErrorMessage.value = true;
    }
  } else {
    errorMessage.value = "All fields must be completed";
    showErrorMessage.value = true;
  }
}

function handleOldPasswordTextChanged(password) {
  oldPasswordText.value = password;
}

function handleNewPasswordTextChanged(password) {
  newPasswordText.value = password;
}

function handleConfirmPasswordTextChanged(password) {
  confirmNewPassword.value = password;
}
function checkPassword() {
  passwordLength.value = newPasswordText.value.length;
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\,.<>\/?]/;

  containsEightCharacters.value = passwordLength.value > 12 ? true : false;
  containsNumber.value = /\d/.test(newPasswordText.value);
  containsUppercase.value = /[A-Z]/.test(newPasswordText.value);
  containsSpecialCharacter.value = format.test(newPasswordText.value);
}
</script>

<template>
  <div class="container">
    <div class="loginContainer">
      <div class="title">
        <FormTitle label="Change Password" />
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
          :label="'Old Password'"
          :value="oldPassword"
          @password-changed="handleOldPasswordTextChanged"
          @keyup="checkPassword"
        />
      </div>
      <div id="password-input">
        <PasswordInput
          :label="'New Password'"
          :value="newPassword"
          @password-changed="handleNewPasswordTextChanged"
          @keyup="checkPassword"
        />
      </div>
      <div id="password-input">
        <PasswordInput
          :label="'Confirm New Password'"
          :value="confirmNewPassword"
          @password-changed="handleConfirmPasswordTextChanged"
          @enter-password="submit"
        />
      </div>
      <div>
        <button id="cancel" :disabled="!firstLogin" @click="router.push('/my')">
          Cancel
        </button>
        <CustomButton id="sign-in" @click="submit">Submit</CustomButton>
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
