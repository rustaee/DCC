<template>
  <header>
    <router-link :to="{ name: 'Search' }">Help me find an activity</router-link>
  </header>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
header {
  grid-area: header;
  background-color: tint($primary-color, 10);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}
</style>
