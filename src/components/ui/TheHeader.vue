<template>
  <header>
    <router-link :to="{ name: 'Search' }">Help me find an activity</router-link>
  </header>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
header {
  grid-area: header;
  background-color: rgba($primary-color, 0.7);
}
</style>
