<template>
  <div class="wrapper">
    <the-header />
    <main><router-view /></main>
    <the-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "@/components/ui/TheHeader.vue";
import TheFooter from "@/components/ui/TheFooter.vue";

export default defineComponent({
  components: { TheHeader, TheFooter },
  // setup() {},
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

#app {
  width: 100vw;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: $primary-color;
  color: $font-color;
  background-image: url("./assets/bg2.jpg");
  background-size: cover;
  background-blend-mode: multiply;
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
</style>
