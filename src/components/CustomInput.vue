<script setup>
import { defineProps, defineEmits, ref } from "vue";

const { modelValue, placeholder, error, type, widthInPx, heightInPx } =
  defineProps([
    "modelValue",
    "placeholder",
    "error",
    "type",
    "widthInPx",
    "heightInPx",
  ]);

const emit = defineEmits(["update:modelValue", "input-focused"]);
const focused = ref(false);
const inputValue = ref("");

const inputChange = (event) => {
  emit("update:modelValue", event.target.value);
};

const handleFocus = () => {
  focused.value = true;
  emit("input-focused", focused.value);
};

const handleBlur = () => {
  focused.value = false;
  emit("input-focused", focused.value);
};
</script>

<template>
  <div class="input-container">
    <input
      class="input"
      :type="type"
      ref="inputValue"
      :placeholder="placeholder"
      :class="{ error: error }"
      required
      :value="modelValue"
      @input="inputChange"
      @focus="handleFocus"
      @blur="handleBlur"
      :style="{
        height: heightInPx ? heightInPx + 'px' : '40px',
        width: widthInPx ? widthInPx + 'px' : '100%',
      }"
    />
  </div>
</template>

<style scoped>
.input-container {
  margin-bottom: 15px;
}

.input {
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
}

.input:hover {
  border-color: #888;
}

.input:focus {
  border-color: rgb(78, 2, 2);
  outline: none;
}

.input.error {
  border-color: red;
}

.input::placeholder {
  color: slategray;
  font-size: 14px;
}
</style>
