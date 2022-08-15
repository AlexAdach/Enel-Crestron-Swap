<template>
  <header>
    <span class="main">{{ title }} Room Controls</span>

    <span class="other">{{ cstatus }}</span>
  </header>
</template>

<script>
export default {
  props: ["title", "cstatus"],
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  column-gap: 20px;
  align-content: center;
  background-color: #2d2b2c;
  /* margin-top: 2em; */
  padding: 1em;
}
.main {
  font-size: 35px;
}
.other {
  font-size: 15px;
}
</style>