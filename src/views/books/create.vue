<template>
  <div>
    <router-link to="/books">Bosh sahifaga o`tish</router-link>
    <h1>Mahsulot qo`shish</h1>
    <form>
      <div class="row">
        <div class="col-sm-4">
          <div class="form-group">
            <label for="name1">Nomi</label>
            <input type="text" id="name1" v-model="form.name" class="form-control">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="price1">Narxi</label>
            <input id="price1" type="number" v-model="form.price" class="form-control">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="author1">Muallifi</label>
            <input id="author1" type="text" v-model="form.author" class="form-control">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="created_date1">Yaratilgan sana</label>
            <input id="created_date1" type="date" v-model="form.created_date" class="form-control">
          </div>
        </div>

        <div class="col-sm-4">
          <div class="form-group">
          </div>
        </div>
      </div>
      <button class="btn btn-info" type="primary" @click="save()">Saqlash</button>

    </form>
  </div>
</template>

<script>
import 'vue-loading-overlay/dist/vue-loading.css'

import axios from "axios";

export default {
  name: 'create',
  components: {},
  props: {
    msg: String
  },
  data() {
    return{
      books: [],
      isLoading: true,
      form: {
        name: '',
        author: '',
        price: '',
        created_date: '',
      },
    }
  },
  methods:{
    getItems() {
      axios.get('http://product.local/books', {params: this.filter}).then((res) => {
        this.books = res.data
      }).finally(() => {
        this.isLoading = false
      })
    },
    save() {
      axios.post('http://product.local/books', this.form).then(() => {
        this.getItems()
      }).finally(() => {
        this.isLoading = false
        this.clearForm()
        this.$router.push({ name: 'BookComponent' })
      })
    },
    clearForm() {
      this.form.term = ''
      this.form.created_date = ''
      this.form.name = ''
      this.form.price = ''
    },
  }
}

</script>

<style scoped>

</style>