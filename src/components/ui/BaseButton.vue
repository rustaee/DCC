<template>
  <button>
    <span><slot /></span>
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: 20px 50px;
  width: 100%;
  margin: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background-color: transparent;
  color: $font-color;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  background: $secondary-color;

  span {
    position: relative;
    z-index: 1;
  }

  &:focus,
  &:active {
    outline: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: $primary-color;
    top: 0;
    left: 0;
    z-index: 0;
    transform: rotate(90deg);
    transform-origin: right bottom;
    transition: transform 0.3s ease;
  }

  &:hover {
    &::after {
      transform: rotate(0);
    }
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
