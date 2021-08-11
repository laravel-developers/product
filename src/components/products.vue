<template>
  <div class="">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Nomi</th>
          <th>Narxi</th>
          <th>Yaratilgan sana</th>
          <th>Amal qilish muddati (oy)</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="products.length">
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.created_date }}</td>
            <td>{{ product.term }}</td>
          </tr>
        </template>
        <template v-else>
          <tr><td colspan="5">Malumot yo'q</td></tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data() {
    return {
      products: []
    }
  },
  props: {
    msg: String
  },
  created() {
    axios.get('http://product.local/products').then((res) => {
      this.products = res.data
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
