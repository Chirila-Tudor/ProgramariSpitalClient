<script setup>
import { ref } from "vue";
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["confirm", "cancel"]);
const confirm = () => {
  emit("confirm");
};

const cancel = () => {
  emit("cancel");
};
</script>
<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal-content">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <div class="button-group">
          <button @click="confirm">Da</button>
          <button @click="cancel">Nu</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.modal-content {
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}
</style>
