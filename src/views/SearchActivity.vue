<template>
  <div class="search-container">
    <form class="search-form" @submit.prevent="findActivity()">
      <div class="controll accessibility">
        <label>Accessibility</label>
        <input type="range" v-model="accessibility" />
      </div>
      <div class="controll type">
        <div v-for="(value, index) in types" :key="index">
          <label>{{ value }}</label>
          <input type="checkbox" v-model="type" :value="value" />
        </div>
      </div>
      <div class="controll participants">
        <label>Participants</label>
        <select name="participants" v-model="participants">
          <option v-for="n in 10" :value="n" :key="n">{{ n }}</option>
        </select>
      </div>
      <div class="controll price">
        <label>Price</label>
        <input type="range" v-model="price" />
      </div>
      <div class="controll submit">
        <button>Search</button>
      </div>
    </form>

    <show-activity :activity="activity" />
  </div>
</template>

<script lang="ts" scoped>
import axios from "axios";
import ShowActivity from "@/components/ShowActivity.vue";
export default {
  components: { ShowActivity },
  data() {
    return {
      activity: null,
      accessibility: 1,
      type: [],
      types: [
        "education",
        "recreational",
        "social",
        "diy",
        "charity",
        "cooking",
        "relaxation",
        "music",
        "busywork",
      ],
      participants: 1,
      price: 0,
    };
  },
  methods: {
    findActivity() {
      let randomType;

      if (this.type.length > 0) {
        randomType = this.type[Math.trunc(Math.random() * this.type.length)];
      } else {
        randomType = this.types[Math.trunc(Math.random() * this.types.length)];
      }

      axios
        .get(
          `http://www.boredapi.com/api/activity?minaccessibility=0&maxaccessibility=${this.accessibility}&participants=${this.participants}&min-price=0&max-price=${this.price}`
        )
        .then((response) => {
          this.activity = response.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped></style>
