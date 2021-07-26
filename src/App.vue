<template>
  <div class="wrapper">
    <the-header />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </main>
    <the-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import TheHeader from "@/components/ui/TheHeader.vue";
import TheFooter from "@/components/ui/TheFooter.vue";

export default defineComponent({
  components: { TheHeader, TheFooter },
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch("getFavoriteActivities"));
  },
});
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

button,
input {
  outline: none;
}

a {
  text-decoration: none;
  color: $link-color;

  &:hover {
    color: $secondary-color;
  }
}

ul,
li {
  list-style: none;
}

#app {
  width: 100vw;
  min-height: 100vh;
  font-family: $font-sans;
  font-size: $font-size;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: $primary-color;
  color: $font-color;
  background-image: url("./assets/bg2.jpg");
  background-size: cover;
  background-blend-mode: multiply;
  background-attachment: fixed;
}

.wrapper {
  display: grid;
  width: 100vw;
  min-height: 100vh;
  grid-template: 70px 1fr 50px / 1fr;
  grid-template-areas:
    "header"
    "main"
    "footer";
}

main {
  grid-area: main;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-out;
}
.slide-enter-from {
  opacity: 0;
  transform: translatex(-1000px);
}

.slide-leave-to {
  opacity: 0;
  transform: translatex(1000px);
}
</style>
