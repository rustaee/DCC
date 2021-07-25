<template>
  <footer>
    <p>Copyright <span>&copy;</span> 2019-2021 All rights reserved DCC</p>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  grid-area: footer;
  width: 100%;
  height: 100%;
  background-color: rgba($primary-color, 0.3);
  @extend %flex-column;

  span {
    color: $secondary-color;
  }
}
</style>
