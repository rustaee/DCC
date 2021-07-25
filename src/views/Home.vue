<template>
  <div class="home">
    <div class="search-button-container">
      <base-button>Find an activity</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default defineComponent({
  name: "Home",
  components: { BaseButton },
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
    color: tint($primary-color, 15);
  }
}
</style>
