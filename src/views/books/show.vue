<template>
  <div>
    <router-link to="/books">Bosh sahifaga o`tish</router-link>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <table class="table table-bordered">
          <tr>
            <td>Kitob nomi</td>
            <td>{{ book.name }}</td>
          </tr>
          <tr>
            <td>Narxi</td>
            <td>{{ book.price }}</td>
          </tr>
          <tr>
            <td>Kitob muallifi</td>
            <td>{{ book.author }}</td>
          </tr>
          <tr>
            <td>Kitob nashr qilingan sana</td>
            <td>{{ book.created_date }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from "axios";

export default {
  name: "show",
  components: {},
  data() {
    return {
      books: [],
      isLoading: true,
      book: null
    }
  },
  created() {
    this.show()
  },
  methods: {
    show() {
      axios.get('http://product.local/books/' + this.$route.params.id).then((res) => {
        this.book = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>