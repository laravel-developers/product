<template>
  <div>
    <router-link to="/products">Back</router-link>
    <br>
    <router-link :to="{ name: 'Statistic' }">Statistic</router-link>
    <h1>This is Books component!</h1>
    <router-link class="btn btn-info float-right" to="/books/create">Mahsulot qo`shish</router-link>
    <table class="table table-hover" v-if="!isLoading">
      <thead>
      <tr>
        <th>#</th>
        <th>Nomi</th>
        <th>Muallifi</th>
        <th>Narxi</th>
        <th>Yaratilgan sana</th>
        <th>Amallar</th>
      </tr>
      <tr>
        <th>
        </th>
        <th>
          <input type="text" class="form-control" v-model="filter.name" @keyup.enter="getItems" placeholder="nomi">
        </th>
        <th>
          <input type="text" class="form-control" v-model="filter.author" @keyup.enter="getItems" placeholder="muallifi">
        </th>
        <th>
          <input type="text" class="form-control" v-model="filter.price" @keyup.enter="getItems" placeholder="narxi">
        </th>
        <th>
          <input type="date" class="form-control" v-model="filter.term" @keyup.enter="getItems" placeholder="yaratilgan vaqti">
        </th>
        <th>
          <button type="submit" class="btn btn-primary  active " @click="getItems"> Qidirish</button>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-if="books.length">
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.id }}</td>
          <td>
            <router-link class="" :to="{name: 'ShowBookComponent', params: {id: book.id}}">{{ book.name }}</router-link>
          </td>
          <td>{{ book.author }}</td>
          <td>{{ format_num(book.price) }}</td>
          <td>{{ format_date(book.created_date) }}</td>
          <td>
            <button class="btn btn-danger mr-2" @click="destroy(book.id)" >O'chirish</button>
            <router-link class="btn btn-info" :to="{name: 'EditBookComponent', params: {id: book.id}}">Tahrirlash</router-link>
<!--            <router-link :to="{ name: 'EditBookComponent', params: { id: 123 }}">Tahrirlash</router-link>-->
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="5">Ma`lumot yo'q</td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>


<script>
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import moment from "moment";

export default {
  name: "book",
  components: {},
  data() {
    return {
      books: [],
      isLoading: true,
      filter: {
        name: '',
        price: '',
        author: '',
        created_date: '',
      },
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    getItems() {
      axios.get('http://product.local/books', {params: this.filter}).then((res) => {
        this.books = res.data
      }).finally(() => {
        this.isLoading = false
      })
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format('DD.MM.YYYY')
      }
      return value
    },
    format_num(number) {
      let number1 = number;
      return (new Intl.NumberFormat().format(number1))
    },
    destroy(id) {
      if (confirm('Haqiqatdan ham o\'chirmoqchimisiz')) {
        axios.delete('http://product.local/books/' + id).then(() => {
          this.getItems()
        })
      }
    },
  }
}
</script>

<style scoped>

</style>