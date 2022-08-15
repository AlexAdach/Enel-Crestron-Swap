<template>
  <div class="info">
    <h4>{{ name }}</h4>
    <p>{{ pfill }}</p>
  </div>
  <div class="sliderwrapper">
    <div class="slidecontainer">
      <input type="range" min="0" v-model="value" max="100" class="slider" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "ajoin", "valuefb"],
  inject: ["sendLevel"],
  data() {
    return {
      value: "",
      pfill: "",
      pmargin: "",
    };
  },
  watch: {
    valuefb: {
      handler: function (newValue) {
        console.log("debug" + newValue);
        this.value = newValue;
      },
      immediate: true,
    },
    value: {
      handler: function () {
        console.log(this.value);
        this.pfill = this.value + "%";
        this.pmargin = (this.value * 195) / 100 - 97.5 + "%";
        this.sendLevel(this.ajoin, this.value);
      },
      immediate: true,
    },
    // beforeUpdate: function () {
    //   this.$nextTick(() => {
    //     this.value = this.valuefb;
    //   });
    // },
  },
};
</script>

<style scoped>
div {
  /* position: relative; */
  margin: auto;
  width: 100%;
  padding: 0px;
  /* display: block; */
}
.info {
  width: 95%;
}
.info h4 {
  padding: none;
  margin: 0px;
  height: 25%;
}
.info p {
  /* position: relative; */
  /* right: 50%; */
  /* width: 75%; */
  padding: none;
  height: 25%;
  margin-bottom: 10px;
  margin-top: 5px;
  margin-left: v-bind(pmargin);
  font-size: 12px;
}
.sliderwrapper {
  /* display: flex; */
  /* flex-direction: column;
  align-content: center;
  justify-content: center; */
  padding: 0px;
  padding-bottom: 10px;
  width: 95%;
}
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background-color: #d3d3d3;
  background-image: linear-gradient(
    to right,
    #6364a7 v-bind(pfill),
    #d3d3d3 v-bind(pfill)
  );
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #04aa6d;
  cursor: pointer;
}
</style>