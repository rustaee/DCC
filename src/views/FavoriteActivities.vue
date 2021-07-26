<template>
  <section class="favorites">
    <div class="activity" v-for="activity in activities" :key="activity.key">
      <show-activity :activity="activity"></show-activity>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import ShowActivity from "@/components/ShowActivity.vue";

export default defineComponent({
  components: { ShowActivity },

  setup() {
    const store = useStore();
    const activities = computed(() => store.state.activities);

    return {
      activities,
    };
  },
});
</script>

<style lang="scss" scoped>
.favorites {
  @extend %flex-row;
  justify-content: space-around;
  padding: 20px 0;
}
.activity {
  width: 90%;
}
</style>
