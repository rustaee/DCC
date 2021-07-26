<template>
  <header class="header">
    <div class="header__logo">
      <router-link class="header__logo--big" :to="{ name: 'Home' }"
        >DCC</router-link
      >
      <span class="header__logo--small">Never get bored</span>
    </div>
    <nav class="navigation">
      <ul>
        <li>
          <router-link :to="{ name: 'Search' }">
            Help me find an activity
          </router-link>
        </li>
      </ul>
    </nav>
    {{ favoriteActivities }}
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const favoriteActivities = computed(() => store.state.activities);

    return {
      favoriteActivities,
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  grid-area: header;
  background-color: tint($primary-color, 10);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  @extend %flex-row;
  justify-content: space-between;
  padding: 20px;
}

.header__logo {
  @extend %flex-row;
}

.header__logo--big {
  font-family: $font-zenzoo;
  font-size: 2rem;
  border-right: 1px solid $link-color;
  padding-right: 10px;
}

.header__logo--small {
  padding: 0 10px;
  font-size: 1.1rem;
  color: shade($primary-color, 50);
}

.navigation {
  margin-right: 10px;
}
</style>
