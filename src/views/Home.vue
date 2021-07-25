<template>
  <div class="home">
    <div class="search-button-container">
      <base-button @click="getActivity()">{{ buttonCaption }}</base-button>
    </div>
    <show-activity v-if="activity" :activity="activity" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useStore } from "vuex";
import ShowActivity from "@/components/ShowActivity.vue";

export default defineComponent({
  name: "Home",
  components: { BaseButton, ShowActivity },
  setup() {
    const store = useStore();

    const getActivity = () => store.dispatch("getRandomActivity");
    const activity = computed(() => store.state.activity);
    const buttonCaption = computed(() =>
      activity.value ? "Not interested ? " : "Find an activity"
    );

    return {
      getActivity,
      activity,
      buttonCaption,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  @extend %flex-column;
}

.search-button-container {
  width: 30%;

  button {
    font-family: $font-righteous;
    font-size: 2rem;
  }
}
</style>
