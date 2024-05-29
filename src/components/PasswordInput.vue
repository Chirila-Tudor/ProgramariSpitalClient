<script setup>
import CustomInput from "./CustomInput.vue";
import { ref } from "vue";

const showPassword = ref(false);
const showBorder = ref(false);

const props = defineProps({
  label: String,
  value: String,
  widthInPx: {
    type: Number,
    default: 200,
  },
});

const emits = defineEmits(["enter-password", "password-changed"]);

function changeShowPassword() {
  showPassword.value = !showPassword.value;
  showBorder.value = !showBorder.value;
}

function sendPassword(text) {
  emits("password-changed", text);
}

function handleEnterPress() {
  emits("enter-password");
}
</script>

<template>
  <div id="password-container" :class="{ 'input-border': showBorder }">
    <CustomInput
      :type="showPassword ? 'text' : 'password'"
      :placeholder="label"
      @update:model-value="sendPassword"
      :model-value="value"
      @keydown.enter="handleEnterPress"
      @focus="showBorder = true"
      @blur="showBorder = false"
      id="password-input"
      :widthInPx="widthInPx"
      :heightInPx="heightInPx"
    />
    <button class="toggle-button" @click="changeShowPassword">
      <span class="material-symbols-outlined">
        {{ showPassword ? "visibility_off" : "visibility" }}
      </span>
    </button>
  </div>
</template>

<style scoped>
#password-container {
  position: relative;
}

.toggle-button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: #f0f0f0;
}

.material-icons {
  font-size: 20px;
}

.input-container {
  position: relative;
}

.input {
  width: calc(100% - 40px);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input:focus {
  outline: none;
  border-color: rgb(78, 2, 2);
}

.input.error {
  border-color: red;
}

.input::placeholder {
  color: slategray;
}
</style>
