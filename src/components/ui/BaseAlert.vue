<template>
  <div class="alert">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
  width: 100%;

  &.success {
    border: 1px solid shade($success, 40);
    background: rgba($success, 0.1);
    box-shadow: 0 3px 5px rgba($success, 0.5);
    color: rgb(1, 66, 1);
  }

  &.fail {
    border: 1px solid shade($danger, 40);
    background: rgba($danger, 0.7);
    box-shadow: 0 3px 5px rgba($danger, 0.5);
  }
}
</style>
