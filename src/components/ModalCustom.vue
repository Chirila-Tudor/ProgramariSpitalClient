<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";

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
        <p>Are you sure you want to delete this hall?</p>
        <div class="button-group">
          <button @click="confirm">Yes</button>
          <button @click="cancel">No</button>
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
