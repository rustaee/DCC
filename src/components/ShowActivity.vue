<template>
  <section class="activity">
    <base-card>
      <div class="activity__title activity__field">{{ activity.activity }}</div>
      <div class="activity__type activity__field">
        <div class="activity__type__label">Category : &nbsp;</div>
        <div class="activity__type__value">{{ activity.type }}</div>
      </div>
      <div class="activity__participants activity__field">
        <div class="activity__participants__label">Participants : &nbsp;</div>
        <div class="activity__participants__value">
          <span v-if="activity.participants > 10"> > </span>
          <span
            v-for="n in calculateParticipants(activity.participants)"
            :key="n"
          >
            |
          </span>
        </div>
      </div>
      <div class="activity__price activity__field">
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
      <div class="activity__link activity__field">{{ activity.link }}</div>
      <div class="activity__accessibility activity__field">
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
    </base-card>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseCard from "@/components/ui/BaseCard.vue";

interface NumberRange {
  min: number;
  max: number;
}

export default defineComponent({
  name: "Home",
  props: ["activity"],
  components: { BaseCard },
  setup() {
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
      calculateAccessibilityPercentage,
      calculatePricePercentage,
      calculateParticipants,
    };
  },
});
</script>

<style lang="scss" scoped>
.activity {
  min-width: 30%;
}

.activity__field {
  margin: 5px 0;
  @extend %flex-row;
}

.activity__title {
  font-size: 1.1rem;
}

.activity__type__value {
  background: $secondary-color;
  padding: 2px 5px;
  border-radius: 5px;
}

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
