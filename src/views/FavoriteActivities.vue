<template>
  <section class="favorites">
    <h2 v-if="activities.length == 0">You have no favorite activitiy yet.</h2>
    <div
      class="favorite__activity"
      v-for="activity in activities"
      :key="activity.key"
    >
      <transition name="fade">
        <show-activity :activity="activity"></show-activity>
      </transition>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import ShowActivity from "@/components/ShowActivity.vue";
import Activity from "@/types/activity";

export default defineComponent({
  components: { ShowActivity },

  setup() {
    const store = useStore();
    const activities = computed(
      /** Favorite activities saved in localStorage */
      (): Activity[] => store.state.activities
    );

    return {
      activities,
    };
  },
});
</script>

<style lang="scss" scoped>
.favorites {
  width: 90%;
  @extend %flex-row;
  justify-content: space-around;
  padding: 20px 0;
}

.favorite__activity {
  width: 90%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 600px) {
  .favorites {
    justify-content: space-around;
  }

  .favorite__activity {
    width: 45%;
  }
}

@media (min-width: 1024px) {
  .favorite__activity {
    width: 30%;
  }
}

@media (min-width: 1400px) {
  .favorites {
    width: 1400px;
  }

  .favorite__activity {
    width: 23%;
  }
}

@media (min-width: 2000px) {
  .favorites {
    width: 2000px;
  }

  .favorite__activity {
    width: 18%;
  }
}
</style>
