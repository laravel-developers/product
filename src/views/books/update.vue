<template>
  <div>
    <router-link to="/books">Bosh sahifaga o`tish</router-link>
    <h1>Mahsulotni tahrirlash</h1>
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
      <button class="btn btn-info" type="primary" @click="update(form.id)">Saqlash</button>
    </form>
  </div>
</template>

<script>
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from "axios";

export default {
  name: 'update',
  data() {
    return{
      book: '',
      isLoading: true,
      form: {
        id: '',
        name: '',
        price: '',
        author: '',
        created_date: '',
      },
    }
  },
  created() {
    this.edit1()
  },
  methods:{
    edit1() {
      axios.get('http://product.local/books/' + this.$route.params.id).then((res) => {
        this.form.id = res.data.id
        this.form.name = res.data.name
        this.form.author = res.data.author
        this.form.price = res.data.price
        this.form.created_date = res.data.created_date
      })
    },
    update() {
      axios.put('http://product.local/books/' + this.form.id, this.form).then(() => {
        this.$router.push({ name: 'BookComponent' })
      }).finally(() => {
        this.isLoading = false
      })
    },
  }
}

</script>

<style scoped>

</style>