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
        <li>
          <span class="seperator"> | </span>
        </li>
        <li class="favorite">
          <router-link :to="{ name: 'Favorites' }">
            <font-awesome-icon icon="heart" class="favorite__heart" />
            <span class="favorite__counter">{{
              favoriteActivities.length
            }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
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

  li {
    display: inline-block;
    position: relative;
    margin: 0 5px;
  }
}

.favorite__counter {
  position: relative;
  left: 8px;
  top: 1px;
}

.favorite__heart {
  color: red;
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 1.5rem;
}
</style>
