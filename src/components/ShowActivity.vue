<template>
  <div class="activity">
    gtrtfh
    <div v-if="activity">
      <div class="activity__title">{{ activity.activity }}</div>
      <div class="activity__type">{{ activity.type }}</div>
      <div class="activity__participants">
        <span v-if="activity.participants > 10"> > </span>
        <span
          v-for="n in calculateParticipants(activity.participants)"
          :key="n"
        >
          |
        </span>
      </div>
      <div class="activity__price">
        <div class="activity__accessibility--rate">
          <div
            class="percent"
            :style="{
              width: calculatePricePercentage(activity.price),
            }"
          ></div>
        </div>
        {{ activity.price }}
      </div>
      <div class="activity__link">{{ activity.link }}</div>
      <div class="activity__accessibility">
        {{ activity.accessibility }}
        <div class="activity__accessibility--rate">
          <div
            class="percent"
            :style="{
              width: calculateAccessibilityPercentage(activity.accessibility),
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

interface NumberRange {
  min: number;
  max: number;
}

export default defineComponent({
  name: "Home",
  props: ["activity"],
  setup() {
    const store = useStore();

    const getActivity = () => store.dispatch("getRandomActivity");
    const activity = computed(() => store.state.activity);

    const convertRange = (
      value: number,
      oldRange: NumberRange,
      newRange: NumberRange
    ): number => {
      return (
        ((value - oldRange.min) * (newRange.max - newRange.min)) /
          (oldRange.max - oldRange.min) +
        newRange.min
      );
    };

    const calculateAccessibilityPercentage = (value: number): string => {
      return (
        convertRange(value, { min: 1, max: 0 }, { min: 0, max: 100 }) + "%"
      );
    };
    const calculatePricePercentage = (value: number): string => {
      return (
        convertRange(value, { min: 0, max: 1 }, { min: 0, max: 100 }) + "%"
      );
    };

    const calculateParticipants = (participants: number) =>
      participants > 10 ? 10 : participants;

    return {
      getActivity,
      calculateAccessibilityPercentage,
      calculatePricePercentage,
      calculateParticipants,
    };
  },
});
</script>

<style lang="scss" scoped>
.activity__accessibility--rate {
  background: red;
  width: 100%;
  height: 10px;
  position: relative;

  .percent {
    height: 100%;
    background: green;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
