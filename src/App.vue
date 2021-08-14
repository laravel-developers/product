<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h3>{{ name }}</h3>
    <products :msg="msg" />
  </div>
</template>

<script>
import Products from './components/products.vue'

export default {
  name: 'App',
  data() {
    return {
      msg: 'Zohid',
      name: 'Product project'
    }
  },
  components: {
    Products
  },
  created() {
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
