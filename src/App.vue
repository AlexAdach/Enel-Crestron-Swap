<template>
  <connecting-message
    :iPAddress="processorIPAddress"
    v-if="connectedStatus === 'Not connected!'"
  ></connecting-message>
  <the-header
    v-if="connectedStatus === 'Connected'"
    :title="serial[0].smessage"
    :cstatus="connectedStatus"
  ></the-header>
  <training-a
    v-if="serial[0].smessage === 'Training A' && !Number.isNaN(analog[1])"
    :key="trainingKey"
  ></training-a>

  <training-b
    v-if="
      serial[0].smessage === 'Training B' && serial[1].smessage === 'Divided'
    "
  ></training-b>
  <combined-lockout
    v-if="
      serial[0].smessage === 'Training B' && serial[1].smessage === 'Combined'
    "
  ></combined-lockout>
  <the-cafe ref="" v-if="serial[0].smessage === 'Cafe'"></the-cafe>
</template>


<script>
import TheHeader from "./components/layouts/TheHeader.vue";
import TrainingA from "./components/rooms/TrainingA.vue";
import TrainingB from "./components/rooms/TrainingB.vue";
import CombinedLockout from "./components/rooms/CombinedLockout.vue";
import TheCafe from "./components/rooms/TheCafe.vue";

// The room pulls it's panel layout from the 1st serial join on the websocket module. It needs to match the v-if statement messge exactly.
export default {
  name: "App",
  components: {
    TheHeader,
    TrainingA,
    TrainingB,
    CombinedLockout,
    TheCafe,
  },
  data() {
    return {
      socket: {},
      trainingKey: 0,
      processorIPAddress: "10.106.156.53",
      connectedStatus: "Not connected!",
      //Yes I'm an idiot for manually declaring these. I figured it out later on with the analogs.
      digital: [
        {
          id: "d1",
          state: false,
        },
        {
          id: "d2",
          state: false,
        },
        {
          id: "d3",
          state: false,
        },
        {
          id: "d4",
          state: false,
        },
        {
          id: "d5",
          state: false,
        },
        {
          id: "d6",
          state: false,
        },
        {
          id: "d7",
          state: false,
        },
        {
          id: "d8",
          state: false,
        },
        {
          id: "d9",
          state: false,
        },
        {
          id: "d10",
          state: false,
        },
        {
          id: "d11",
          state: false,
        },
        {
          id: "d12",
          state: false,
        },
        {
          id: "d13",
          state: false,
        },
        {
          id: "d14",
          state: false,
        },
      ],
      serial: [
        {
          id: "s1",
          smessage: "",
        },
        {
          id: "s2",
          smessage: "",
        },
      ],
      // analog: [
      //   {
      //     id: "a1",
      //     value: null,
      //   },
      //   {
      //     id: "a2",
      //     value: 0,
      //   },
      //   {
      //     id: "a3",
      //     value: 0,
      //   },
      //   {
      //     id: "a4",
      //     value: 0,
      //   },
      // ],
      analog: [{}],
      // analogInit: [{}],
    };
  },
  provide() {
    return {
      digitals: this.digital,
      analogs: this.analog,
      dPress: this.dPress,
      dRelease: this.dRelease,
      sendLevel: this.sendLevel,
    };
  },
  // watch: {
  //   analog: {
  //     handler: function () {
  //       console.log("I See a change");
  //       this.$forceUpdate();
  //     },
  //     deep: true,
  //   },
  // },
  // Updated: function () {
  //   this.$nextTick(() => {
  //     this.analog[1] = this.analogInit[1];
  //     this.$forceUpdate();
  //   });
  // },
  async mounted() {
    // Calculate the URL for the websocket. If you have a fixed URL, then you can remove all this and simply put in
    // ws://your-url-here.com or wss:// for secure websockets.

    // const socketProtocol =
    //   window.location.protocol === "https:" ? "wss:" : "ws:";
    // const port = ":8080";
    // const echoSocketUrl =
    //   socketProtocol + "//" + window.location.hostname + port + "/ws";

    // Define socket and attach it to our data object
    this.socket = await new WebSocket(
      "ws://" + this.processorIPAddress + ":8080"
    );

    // When it opens, console log that it has opened. and send a message to the server to let it know we exist
    this.socket.onopen = () => {
      console.log("Websocket connected.");
      this.connectedStatus = "Connected";
      this.sendMessage(JSON.stringify({ message: "Hello, server." }));
    };

    // this.socket.onclose = () => {
    //   console.log("Websocket closed");
    // };

    // When we receive a message from the server, we can capture it here in the onmessage event.
    this.socket.onmessage = (evt) => {
      if (evt != null) {
        var msg = evt.data;

        //ON[CHANNEL]
        if (msg.indexOf("ON[") == 0) {
          var channel = parseInt(this.getBoundString(msg, "ON[", "]"), 10);

          //Find the index of Digital Feedback and update the data property.

          if (parseInt(channel) <= Object.keys(this.digital).length) {
            channel = "d" + channel;
            console.log(channel + "fb High");
            var index = this.digital.findIndex((x) => x.id === channel);

            this.digital[index].state = true;
          }
        }
        //OFF[CHANNEL]
        else if (msg.indexOf("OFF[") == 0) {
          channel = parseInt(this.getBoundString(msg, "OFF[", "]"), 10);

          if (parseInt(channel) <= Object.keys(this.digital).length) {
            channel = "d" + channel;
            console.log(channel + "fb Low");
            index = this.digital.findIndex((x) => x.id === channel);
            this.digital[index].state = false;
          }
        }
        // LEVEL[LEVEL,VALUE]
        else if (msg.indexOf("LEVEL[") == 0) {
          var level = parseInt(this.getBoundString(msg, "LEVEL[", ","), 10);
          var newValue = parseInt(this.getBoundString(msg, ",", "]"), 10);

          // if (parseInt(level) <= Object.keys(this.analog).length) {
          //   level = "a" + level;
          //   index = this.analog.findIndex((x) => x.id === level);
          //   this.analog[index].value = value;
          //   console.log(index + " " + value);
          // }
          // this.analog[level].value = value;
          if (!Number.isNaN(newValue)) {
            console.log("Index:" + level + "Value:" + newValue);
            // this.$set(this.analog[level], "value", newValue);
            this.analog.splice(level, 1, newValue);
            // this.$set(this.analog, level, newValue);
            // this.analog = Object.assign(this.analog[level], {
            //   value: newValue,
            // });
          }
        }
        // STRING[SIG,DATA]
        else if (msg.indexOf("STRING[") == 0) {
          var text = parseInt(this.getBoundString(msg, "STRING[", ","), 10);
          var value = this.getBoundString_EndLastIndex(msg, ",", "]");

          if (parseInt(text) <= Object.keys(this.serial).length) {
            text = "s" + text;
            index = this.serial.findIndex((x) => x.id === text);
            this.serial[index].smessage = value;
            console.log("Serial: " + index + " text: " + value);
          }
        }
      }
    };
  },
  methods: {
    waitForOpenConnection: () => {
      // We use this to measure how many times we have tried to connect to the websocket server
      // If it fails, it throws an error.
      return new Promise((resolve, reject) => {
        const maxNumberOfAttempts = 10;
        const intervalTime = 200;

        let currentAttempt = 0;
        const interval = setInterval(() => {
          if (currentAttempt > maxNumberOfAttempts - 1) {
            clearInterval(interval);
            reject(new Error("Maximum number of attempts exceeded."));
          } else if (this.socket.readyState === this.socket.OPEN) {
            clearInterval(interval);
            resolve();
          }
          currentAttempt++;
        }, intervalTime);
      });
    },
    sendMessage: async function (message) {
      // We use a custom send message function, so that we can maintain reliable connection with the
      // websocket server.
      if (this.socket.readyState !== this.socket.OPEN) {
        try {
          await this.waitForOpenConnection(this.socket);
          this.socket.send(message);
        } catch (err) {
          console.error(err);
        }
      } else {
        this.socket.send(message);
      }
    },
    getBoundString(msg, startChar, stopChar) {
      var response = "";

      if (msg != null && msg.length > 0) {
        var start = msg.indexOf(startChar);

        if (start >= 0) {
          start += startChar.length;

          var end = msg.indexOf(stopChar, start);

          if (start < end) {
            response = msg.substring(start, end);
          }
        }
      }

      return response;
    },
    getBoundString_EndLastIndex(msg, startChar, stopChar) {
      var response = "";

      if (msg != null && msg.length > 0) {
        var start = msg.indexOf(startChar);

        if (start >= 0) {
          start += startChar.length;

          var end = msg.lastIndexOf(stopChar);

          if (start < end) {
            response = msg.substring(start, end);
          }
        }
      }

      return response;
    },
    dPress(channel) {
      console.log("D" + channel + " Pressed");
      this.sendMessage("PUSH[" + channel + "]");
    },
    dRelease(channel) {
      console.log("D" + channel + " Released");
      this.sendMessage("RELEASE[" + channel + "]");
    },
    sendLevel(join, value) {
      if (value != null) this.sendMessage("LEVEL[" + join + "," + value + "]");
      console.log(join, value);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

body {
  background-color: #201e1f;
}
</style>
