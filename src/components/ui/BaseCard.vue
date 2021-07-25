<template>
  <section class="card">
    <div class="card__content">
      <slot></slot>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.card {
  width: 100%;
  @extend %flex-column;
  min-height: 100px;
  background: rgba($primary-color, 0.7);
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  position: relative;
}

.card__content {
  margin-top: 10px;
  padding: 10px;
}
</style>
