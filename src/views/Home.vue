<template>
  <div class="home">
    <!--Search Button -->
    <div class="search-button-container">
      <base-button @click="getActivity()">{{ buttonCaption }}</base-button>
    </div>

    <!-- Loading -->
    <BaseLoading v-if="loading" />

    <!-- Search Result -->
    <transition name="fade">
      <show-activity v-if="activity" :activity="activity" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import axios from "axios";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseLoading from "@/components/ui/BaseLoading.vue";
import ShowActivity from "@/components/ShowActivity.vue";

export default defineComponent({
  name: "Home",
  components: { BaseButton, BaseLoading, ShowActivity },
  setup() {
    const activity = ref(null);
    const loading = ref<boolean>(false);
    const error = ref<string | boolean>(false);

    const getActivity = () => {
      activity.value = null;
      loading.value = true;
      error.value = false;
      axios
        .get("http://www.boredapi.com/api/activity/")
        .then((response) => {
          loading.value = false;
          if (response.data.error) error.value = true;
          else {
            activity.value = response.data;
            error.value = false;
          }
        })
        .catch((error) => {
          error.value = error;
        });
    };
    const buttonCaption = computed(() =>
      activity.value ? "Not interested ? " : "Find an activity"
    );

    return {
      getActivity,
      activity,
      buttonCaption,
      loading,
      error,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  @extend %flex-column;
  flex-wrap: nowrap;
}

.search-button-container {
  width: 30%;

  button {
    font-family: $font-righteous;
    font-size: 2rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
