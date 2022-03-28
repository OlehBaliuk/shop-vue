<template>
  <button class="btn" type="submit" @click="handleClick">{{ title }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: {
      type: String,
    },
    handleClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  padding: 0.3rem 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
  border-radius: 0.5rem;
  border: none;
  margin: 0.3rem 0.5rem;
  color: #fff;
  background: linear-gradient(180deg, #369e9e 0%, #369e9e 100%);
  background-origin: border-box;
  box-shadow: 0px 0.5px 1.5px rgba(45, 223, 113, 0.25), inset 0px 0.8px 0px -0.25px rgba(45, 223, 113, 0.25);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-size: 1rem;
}

.btn:hover {
  box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(54, 122, 246, 0.25),
    0px 0px 0px 3.5px rgba(45, 223, 113, 0.25);
  outline: 0;
}
</style>
