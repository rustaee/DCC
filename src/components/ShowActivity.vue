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
            <font-awesome-icon icon="male" />
          </span>
        </div>
      </div>

      <div class="activity__price activity__field">
        <div class="activity__price__label">Price : &nbsp;</div>
        <div class="activity__price__value">
          <div
            class="activity__rating__circle"
            v-for="n in 10"
            :class="
              n <= calculatePricePercentage(activity.price) ? 'active' : ''
            "
            :key="n"
          ></div>
        </div>
      </div>

      <div class="activity__accessibility activity__field">
        <div class="activity__accessibility__label">Accessibility : &nbsp;</div>
        <div class="activity__accessibility__value">
          <div
            class="activity__rating__circle"
            v-for="n in 10"
            :class="
              n <= calculateAccessibilityPercentage(activity.accessibility) ||
              n == 1
                ? 'active'
                : ''
            "
            :key="n"
          ></div>
        </div>
      </div>

      <!-- Add to my favorite -->
      <span
        class="add-to-favorite"
        :class="{ liked: liked }"
        @click="addToFavorite()"
      >
        <font-awesome-icon icon="heart" />
      </span>
    </base-card>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import { useStore } from "vuex";
import BaseCard from "@/components/ui/BaseCard.vue";

interface NumberRange {
  min: number;
  max: number;
}

export default defineComponent({
  name: "Home",
  props: ["activity"],
  components: { BaseCard },

  setup(props) {
    const { activity } = toRefs(props);
    const store = useStore();
    const liked = ref(false);
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

    const calculateAccessibilityPercentage = (value: number): number => {
      return Math.round(
        convertRange(value, { min: 1, max: 0 }, { min: 0, max: 10 })
      );
    };
    const calculatePricePercentage = (value: number): number => {
      return Math.round(
        convertRange(value, { min: 0, max: 1 }, { min: 0, max: 10 })
      );
    };

    const calculateParticipants = (participants: number) =>
      participants > 10 ? 10 : participants;

    const addToFavorite = () => {
      if (!liked.value) {
        store.dispatch("addToFavorite", activity.value);
      } else {
        console.log("hech");
      }
      liked.value = !liked.value;
    };

    return {
      calculateAccessibilityPercentage,
      calculatePricePercentage,
      calculateParticipants,
      addToFavorite,
      liked,
    };
  },
});
</script>

<style lang="scss" scoped>
.activity {
  min-width: 30%;
  margin-bottom: 30px;
}

.activity__field {
  margin: 5px 0;
  width: 300px;
  @extend %flex-row;
  justify-content: start;

  & > div:first-child {
    width: 100px;
    text-align: start;
  }
}

.activity__title {
  font-size: 1.1rem;
  margin-bottom: 15px;
  width: 100%;
  padding-right: 30px;
}

.activity__type__value {
  background: $secondary-color;
  padding: 2px 5px;
  border-radius: 5px;
}

.activity__participants__value svg {
  margin-right: 2px;
}

.activity__price__value,
.activity__accessibility__value {
  @extend %flex-row;
}

.activity__rating__circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(15, 15, 15, 0.377);
  margin-right: 2px;

  &.active {
    background: rgb(62, 224, 62);
  }
}

.add-to-favorite {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: all 0.3s;

  &.liked {
    color: red;
  }
}
</style>
