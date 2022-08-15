<template>
  <button :type="type" :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["type", "mode"],
};
</script>

<style scoped>
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;

  color: white;
  max-width: 10rem;
  min-width: 10rem;
  min-height: 5rem;
  max-height: 5rem;
  cursor: pointer;
  font-size: 15px;
}
.low {
  color: white;
  border: 1px solid lightgray;
  background-color: transparent;
}

.high {
  color: white;
  background-color: #6364a7;
  border: 1px solid #6364a7;
}
</style>