<template>
  <h3>Attempting to connect to Processor</h3>
  <p>IP Address: {{ iPAddress }}</p>
</template>

<script>
export default {
  props: ["iPAddress"],
};
</script>