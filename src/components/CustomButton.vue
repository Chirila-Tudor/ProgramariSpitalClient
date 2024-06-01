<script setup>
const props = defineProps({
  id: String,
  label: String,
  isActive: Boolean,
  heightInPx: Number,
  widthInPx: Number,
  isVisible: Boolean,
});
</script>

<template>
  <button
    class="customButton"
    :id="id"
    :style="{
      backgroundColor: isActive ? 'var(--selected-color)' : '',
      height: props.heightInPx ? props.heightInPx + 'px' : {},
      width: props.widthInPx ? props.widthInPx + 'px' : {},
    }"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.customButton {
  width: 7vw;
  height: 30px;
  padding: 3px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  background-color: var(--selected-color);
  border: 1px solid rgb(78, 2, 2);
}

.customButton:hover {
  background-color: rgb(180, 6, 6);
}
</style>
