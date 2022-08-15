<template>
  <teams-card>
    <div class="parent">
      <!-- System Power -->
      <div class="child">
        <h3>System Power</h3>
        <base-button
          id="d1"
          :mode="[digitals[0].state ? 'high' : 'low']"
          v-on:mousedown="dPress('1')"
          v-on:mouseup="dRelease('1')"
        >
          System Power On
        </base-button>
        <div></div>
        <base-button
          id="d2"
          :class="[digitals[1].state ? 'high' : 'low']"
          v-on:mousedown="dPress('2')"
          v-on:mouseup="dRelease('2')"
        >
          System Power Off
        </base-button>
      </div>
      <!-- Routing -->
      <div class="child">
        <h3>Routing</h3>
        <base-button
          id="d3"
          :mode="[digitals[2].state ? 'high' : 'low']"
          v-on:mousedown="dPress('3')"
          v-on:mouseup="dRelease('3')"
        >
          Teams
        </base-button>
        <div></div>
        <base-button
          id="d4"
          :class="[digitals[3].state ? 'high' : 'low']"
          v-on:mousedown="dPress('4')"
          v-on:mouseup="dRelease('4')"
        >
          Wallplate
        </base-button>
      </div>
      <!-- RoomState -->
      <div class="child">
        <h3>Room State</h3>
        <base-button
          id="d5"
          :mode="[digitals[4].state ? 'high' : 'low']"
          v-on:mousedown="dPress('5')"
          v-on:mouseup="dRelease('5')"
        >
          Combine
        </base-button>
        <div></div>
        <base-button
          id="d6"
          :class="[digitals[5].state ? 'high' : 'low']"
          v-on:mousedown="dPress('6')"
          v-on:mouseup="dRelease('6')"
        >
          Divide
        </base-button>
      </div>
    </div>
  </teams-card>
  <keep-alive>
    <teams-card>
      <base-slider-horizontal
        name="Speech Volume"
        ajoin="1"
        :valuefb="analogs[1]"
      >
      </base-slider-horizontal>
    </teams-card>
  </keep-alive>
</template>

<script>
export default {
  inject: ["digitals", "analogs", "dPress", "dRelease"],
};
</script>

<style scoped>
.parent {
  display: flex;
  justify-content: center;
  /* row-gap: 200px; */
  flex-direction: row;
  align-content: center;
  /* flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 50%; */
  /* flex-flow: row wrap; */
}
.child {
  margin: 10px;
  align-content: center;

  /* flex-shrink: 3; */
}

.child > div {
  margin: 10px;
  flex: 1 1 auto;

  text-align: center;
}
</style>
