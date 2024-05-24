<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const {
  modelValue,
  placeholder,
  error,
  type,
  inputRef,
  widthInPx,
  heightInPx,
} = defineProps([
  "modelValue",
  "placeholder",
  "error",
  "type",
  "widthInPx",
  "heightInPx",
]);

const emit = defineEmits(["update:modelValue", "input-focused"]);

const inputChange = (event) => {
  emit("update:modelValue", event.target.value);
};

const focused = ref(false);
const inputValue = ref("");

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
  <input
    class="input"
    :type="type"
    ref="inputValue"
    :placeholder="placeholder"
    :class="{ input: error }"
    required
    :value="modelValue"
    @input="inputChange"
    @focus="handleFocus"
    @blur="handleBlur"
    :style="{
      height: heightInPx ? heightInPx + 'vh' : {},
      width: widthInPx ? widthInPx + 'vw' : {},
    }"
  />
</template>

<style scoped>
.input {
  border-radius: 2px;
  border: 1px solid white;
  background-color: white;
  padding: 5px;
  box-sizing: border-box;
  cursor: text;
}

.input:hover {
  border: 1px solid slategray;
}

input {
  all: unset;
}

.input::placeholder {
  color: slategray;
}
</style>
