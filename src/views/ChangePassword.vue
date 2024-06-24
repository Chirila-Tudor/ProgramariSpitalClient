<script setup>
import router from "../router";
import { useRoute } from "vue-router";
import { ref } from "vue";
import sha256 from "sha256";
import FormTitle from "../components/FormTitle.vue";
import InvalidInputMessage from "../components/InvalidInputMessage.vue";
import PasswordInput from "../components/PasswordInput.vue";
import CustomButton from "../components/CustomButton.vue";
import { changePassword } from "../services/user_service";
const route = useRoute();

const oldPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const showErrorMessage = ref(false);
const errorMessage = ref("");
const passwordLength = ref(0);
const containsTwelveCharacters = ref(false);
const containsNumber = ref(false);
const containsUppercase = ref(false);
const containsSpecialCharacter = ref(false);

function submit() {
  if (oldPassword.value && newPassword.value && confirmNewPassword.value) {
    if (newPassword.value === confirmNewPassword.value) {
      let passwordFormatOK = true;
      // const upperCaseRegex = /[A-Z]/;
      // const specialCharacterRegex = /[#$^&*_@!?]/;

      // if (newPassword.value.length < 12) {
      //   errorMessage.value =
      //     "The new password must contain at least 12 characters";
      //   showErrorMessage.value = true;
      //   passwordFormatOK = false;
      // }

      // if (!upperCaseRegex.test(newPassword.value) && passwordFormatOK) {
      //   errorMessage.value =
      //     "The new password must contain at least one uppercase character";
      //   showErrorMessage.value = true;
      //   passwordFormatOK = false;
      // }

      // if (!specialCharacterRegex.test(newPassword.value) && passwordFormatOK) {
      //   errorMessage.value =
      //     "The new password must contain at least one special character(#$^&*_@)";
      //   showErrorMessage.value = true;
      //   passwordFormatOK = false;
      // }
      if (passwordFormatOK) {
        changePassword({
          username: localStorage.getItem("username"),
          oldPassword: sha256(oldPassword.value),
          newPassword: sha256(newPassword.value),
        })
          .then((res) => {
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
  oldPassword.value = password;
}

function handleNewPasswordTextChanged(password) {
  newPassword.value = password;
}

function handleConfirmPasswordTextChanged(password) {
  confirmNewPassword.value = password;
}
// function checkPassword() {
//   passwordLength.value = newPassword.value.length;
//   const format = /[!@#$%^&*()_+\-=\[\]{};':"\\,.<>\/?]/;

//   containsTwelveCharacters.value = passwordLength.value > 12 ? true : false;
//   containsNumber.value = /\d/.test(newPassword.value);
//   containsUppercase.value = /[A-Z]/.test(newPassword.value);
//   containsSpecialCharacter.value = format.test(newPassword.value);
// }
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div class="title">
        <FormTitle label="Schimbare parolă" class="title-width" />
      </div>
      <div v-if="showErrorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div id="password-input">
        <PasswordInput
          :label="'Vechea parolă'"
          :value="oldPassword"
          :widthInPx="300"
          @password-changed="handleOldPasswordTextChanged"
          @keyup="checkPassword"
        />
      </div>
      <div id="password-input">
        <PasswordInput
          :label="'Noua parolă'"
          :value="newPassword"
          :widthInPx="300"
          @password-changed="handleNewPasswordTextChanged"
          @keyup="checkPassword"
        />
      </div>
      <div id="password-input">
        <PasswordInput
          :label="'Confirmare noua parolă'"
          :value="confirmNewPassword"
          :widthInPx="300"
          @password-changed="handleConfirmPasswordTextChanged"
          @enter-password="submit"
        />
      </div>
      <div>
        <CustomButton
          id="sign-in"
          @click="submit"
          class="white-text"
          :widthInPx="200"
          >Schimbă parola</CustomButton
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
  height: 90vh;
}

.imageContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
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
.white-text {
  color: white;
}
.title-width {
  width: 40vh;
}
.error-message {
  color: red;
  font-size: 14px;
  font-weight: bold;
}
@media (min-width: 1200px) {
  .form-container {
    min-width: 300px;
    padding: 30px;
  }

  .title-width {
    font-size: 24px;
    white-space: nowrap;
  }

  .select-wrapper select {
    padding: 15px;
  }

  .button-group {
    gap: 20px;
    white-space: nowrap;
  }
}
</style>
