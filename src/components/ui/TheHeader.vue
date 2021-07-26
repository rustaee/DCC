<template>
  <header class="header">
    <div class="header__container">
      <!-- logo -->
      <div class="header__logo">
        <router-link class="header__logo--big" :to="{ name: 'Home' }"
          >DCC</router-link
        >
        <span class="header__logo--small">Never get bored</span>
      </div>

      <!-- Menu -->
      <nav class="navigation">
        <ul>
          <li>
            <router-link :to="{ name: 'Search' }">
              Help me find an activity
            </router-link>
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
    </div>
  </header>
</template>

<script lang="ts">
import Activity from "@/types/activity";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const favoriteActivities = computed(
      (): Activity[] => store.state.activities
    );

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
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.header__container {
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  @extend %flex-column;
  align-items: flex-start;
  position: relative;
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
  position: absolute;
  bottom: -25px;
  width: 90%;

  ul {
    @extend %flex-row;
    justify-content: space-between;
  }

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

@media (min-width: 600px) {
  .header__container {
    flex-direction: row;
    justify-content: space-between;
  }
  .navigation {
    position: relative;
    width: auto;
    top: 10px;
  }
}

@media (min-width: 1400px) {
  .header__container {
    width: 1400px;
  }
}

@media (min-width: 2000px) {
  .header__container {
    width: 2000px;
  }

  .header__logo--big {
    font-size: 3rem;
  }

  .header__logo--small {
    font-size: 1.8rem;
  }

  .navigation li {
    font-size: $font-size + 6px;
  }

  .favorite__heart {
    font-size: 2.3rem;
  }

  .favorite__counter {
    left: 12px;
    top: 3px;
  }
}
</style>
