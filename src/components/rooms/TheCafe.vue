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
      <div class="spacing1"></div>
      <!-- Routing -->
      <div class="child">
        <h3>Projector 1</h3>
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
          Cable TV
        </base-button>
        <div></div>
        <base-button
          id="d5"
          :class="[digitals[4].state ? 'high' : 'low']"
          v-on:mousedown="dPress('5')"
          v-on:mouseup="dRelease('5')"
        >
          Brightsign
        </base-button>
      </div>
      <!-- RoomState -->
      <div class="child">
        <h3>Screen/Power</h3>
        <base-button
          id="d6"
          :mode="[digitals[5].state ? 'high' : 'low']"
          v-on:mousedown="dPress('6')"
          v-on:mouseup="dRelease('6')"
        >
          Power
        </base-button>
        <div></div>
        <base-button
          id="d7"
          :class="[digitals[6].state ? 'high' : 'low']"
          v-on:mousedown="dPress('7')"
          v-on:mouseup="dRelease('7')"
        >
          Up
        </base-button>
        <div></div>
        <base-button
          id="d8"
          :class="[digitals[7].state ? 'high' : 'low']"
          v-on:mousedown="dPress('8')"
          v-on:mouseup="dRelease('8')"
        >
          Down
        </base-button>
      </div>
      <div class="child">
        <h3>Projector 2</h3>
        <base-button
          id="d9"
          :mode="[digitals[8].state ? 'high' : 'low']"
          v-on:mousedown="dPress('9')"
          v-on:mouseup="dRelease('9')"
        >
          Teams
        </base-button>
        <div></div>
        <base-button
          id="d10"
          :class="[digitals[9].state ? 'high' : 'low']"
          v-on:mousedown="dPress('10')"
          v-on:mouseup="dRelease('10')"
        >
          Cable TV
        </base-button>
        <div></div>
        <base-button
          id="d11"
          :class="[digitals[10].state ? 'high' : 'low']"
          v-on:mousedown="dPress('11')"
          v-on:mouseup="dRelease('11')"
        >
          Brightsign
        </base-button>
      </div>
      <!-- RoomState -->
      <div class="child">
        <h3>Screen/Power</h3>
        <base-button
          id="d12"
          :mode="[digitals[11].state ? 'high' : 'low']"
          v-on:mousedown="dPress('12')"
          v-on:mouseup="dRelease('12')"
        >
          Power
        </base-button>
        <div></div>
        <base-button
          id="d13"
          :class="[digitals[12].state ? 'high' : 'low']"
          v-on:mousedown="dPress('13')"
          v-on:mouseup="dRelease('13')"
        >
          Up
        </base-button>
        <div></div>
        <base-button
          id="d14"
          :class="[digitals[13].state ? 'high' : 'low']"
          v-on:mousedown="dPress('14')"
          v-on:mouseup="dRelease('14')"
        >
          Down
        </base-button>
      </div>
    </div>
  </teams-card>

  <teams-card>
    <base-slider-horizontal name="Room Volume" ajoin="1" :valuefb="analogs[1]">
    </base-slider-horizontal>
  </teams-card>
  <teams-card>
    <base-slider-horizontal
      name="Speech Volume"
      ajoin="2"
      :valuefb="analogs[2]"
    >
    </base-slider-horizontal>
  </teams-card>
  <teams-card>
    <base-slider-horizontal name="Cable TV" ajoin="3" :valuefb="analogs[3]">
    </base-slider-horizontal>
  </teams-card>
</template>

<script>
export default {
  inject: ["digitals", "analogs", "dPress", "dRelease"],
};
</script>

<style scoped>
.spacing1 {
  margin: 40px;
}
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
