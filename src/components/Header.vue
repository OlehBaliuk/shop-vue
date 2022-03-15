<template>
  <div>
    <header class="header">
      <router-link to="/catalog">Vue shop</router-link>
      <nav class="link-wrapper">
        <router-link to="/catalog" class="link-wrapper__title">Catalog</router-link>
        <router-link to="/login" class="link-wrapper__title">Login</router-link>
        <router-link to="/cart" class="link-wrapper__title">Cart</router-link>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  font-size: 2rem;
  background-color: rgb(202, 44, 202);
  margin: 0;
  padding: 0.5rem;

  .link-wrapper {
    padding: 0.5rem;

    .link-wrapper__title {
      font-size: 2rem;
      padding: 0.5rem;
    }
  }
}
</style>
