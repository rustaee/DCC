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
import Activity from "@/types/activity"; /** Typescript interface */
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseLoading from "@/components/ui/BaseLoading.vue";
import ShowActivity from "@/components/ShowActivity.vue";

export default defineComponent({
  name: "Home",
  components: { BaseButton, BaseLoading, ShowActivity },
  setup() {
    const activity = ref<Activity | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<string | boolean>(false);

    const getActivity = async () => {
      activity.value = null;
      loading.value = true;
      error.value = false;
      await axios
        .get("https://www.boredapi.com/api/activity/")
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
  width: 95%;
  height: 100%;
  @extend %flex-column;
  flex-wrap: nowrap;
}

.search-button-container {
  width: 75%;

  button {
    font-family: $font-righteous;
    font-size: 1.5rem;
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

@media (min-width: 600px) {
  .search-button-container {
    width: 50%;

    button {
      font-size: 1.7rem;
    }
  }
}

@media (min-width: 1024px) {
  .search-button-container {
    width: 30%;

    button {
      font-size: 2rem;
    }
  }
}

@media (min-width: 2000px) {
  .search-button-container {
    width: 20%;

    button {
      font-size: 2.5rem;
    }
  }
}
</style>
