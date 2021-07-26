<template>
  <section class="activity">
    <base-card>
      <!-- Title -->
      <div class="activity__title activity__field">{{ activity.activity }}</div>

      <!-- Type -->
      <div class="activity__type activity__field">
        <div class="activity__type__label">Category : &nbsp;</div>
        <div class="activity__type__value">{{ activity.type }}</div>
      </div>

      <!-- Participants -->
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

      <!-- Price -->
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

      <!-- Accessibility -->
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
import { defineComponent, PropType, ref, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import BaseCard from "@/components/ui/BaseCard.vue";
import Activity from "@/types/activity"; /** Typescript interface */

/** To use in convert range function */
interface NumberRange {
  min: number;
  max: number;
}

export default defineComponent({
  name: "Home",
  props: {
    activity: {
      required: true,
      type: Object as PropType<Activity>,
    },
  },
  components: { BaseCard },

  setup(props) {
    const { activity } = toRefs(props);
    const store = useStore();
    const liked = ref<boolean>(false);

    /** Get a number in a range -for example 10 in 0-20  */
    /** The output is the number in new range (0-100) which is 50 */
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
    
    /** To be shown in the range slider */
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

    /** Just show 10 icon for participants. */
    /** More than 10 participant are shown whit >10 */
    const calculateParticipants = (participants: number): number =>
      participants > 10 ? 10 : participants;

    const addToFavorite = (): void => {
      if (!liked.value) {
        store.dispatch("addToFavorite", activity.value);
      } else {
        store.dispatch("removeFromFavorite", activity.value);
      }
      liked.value = !liked.value;
    };

    /** To see if this activity is on the favorite list or not */
    onMounted((): void => {
      const activityKey: Activity = activity.value;
      const activities = store.state.activities;
      const foundActivity = activities.find(
        (element: Record<string, unknown>) => element.key == activityKey.key
      );
      if (foundActivity) liked.value = true;
    });

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
  margin-bottom: 30px;
}

.activity__field {
  margin: 5px 0;
  width: 300px;
  @extend %flex-row;
  justify-content: start;

  & > div:first-child {
    width: 120px;
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
