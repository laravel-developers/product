<template>
  <div class="">
<!--    <loading-->
<!--        :active.sync="isLoading"-->
<!--        loader="bars"-->
<!--        :can-cancel="false"-->
<!--        :is-full-page="true"-->
<!--    />-->
    <table class="table table-hover" v-if="!isLoading">
      <thead>
        <tr>
          <th>#</th>
          <th>Nomi</th>
          <th>Narxi</th>
          <th>Yaratilgan sana</th>
          <th>Amal qilish muddati (oy)</th>
          <th>Amallar</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="products.length">
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td><a href="#">{{ product.name }}</a></td>
            <td>{{ product.price }}</td>
            <td>{{ product.created_date }}</td>
            <td>{{ product.term }}</td>
            <td>
              <button class="btn btn-danger" @click="destroy(product.id)">O'chirish</button>
              <a href=""><button class="btn btn-info" @click="update(product.id)">Tahrirlash</button></a>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr><td colspan="5">Ma`lumot yo'q</td></tr>
        </template>
      </tbody>
    </table>
    <h3>Product qo'shish</h3>
    <form class="form container-fluid px-5" action="#">
      <div class="row">
        <div class="col-sm-4">
          <div class="form-group">
            <label for="name">Nomi</label>
            <input type="text" id="name" v-model="form.name" class="form-control">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="price">Narxi</label>
            <input id="price" type="number" v-model="form.price" class="form-control">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="created_date">Yaratilgan sana</label>
            <input id="created_date" type="date" v-model="form.created_date" class="form-control">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="term">Yaroqlilik muddati (oy)</label>
            <input id="term" type="number" v-model="form.term" class="form-control">
          </div>
        </div>
      </div>
      <button class="float-right" @click="save()">Saqlash</button>
    </form>

<!--    modal-->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Launch demo modal
    </button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-loading-overlay/dist/vue-loading.css'

import axios from 'axios'
export default {
  name: 'Products',
  components: {},
  data() {
    return {
      products: [],
      isLoading: true,
      form: {
        name: '',
        price: '',
        created_date: '',
        term: ''
      },
      formEdit: {
        name: '',
        price: '',
        created_date: '',
        term: ''
      }
    }
  },
  props: {
    msg: String
  },
  created() {
    this.getItems()
  },
  methods: {
    update(id){
      axios.post('http://product.local/products/' + id, this.form).then(() => {
        this.getItems()
      }).finally(() => {
        this.isLoading = false
        this.clearForm()
      })
    },
    destroy(id) {
      if(confirm('Haqiqatan ham o\'chirmoqchimisiz')) {
        axios.delete('http://product.local/products/' + id).then(() => {
          this.getItems()
        })
      }
    },
    getItems() {
      axios.get('http://product.local/products').then((res) => {
        this.products = res.data
      }).finally(() => {
        this.isLoading = false
      })
    },
    save() {
      axios.post('http://product.local/products', this.form).then(() => {
        this.getItems()
      }).finally(() => {
        this.isLoading = false
        this.clearForm()
      })
    },
    saveEdit() {
      axios.post('http://product.local/products', this.formEdit).then(() => {
        this.getItems()
      }).finally(() => {
        this.isLoading = false
        this.clearForm()
      })
    },
    clearForm() {
      this.form.term = ''
      this.form.created_date = ''
      this.form.name = ''
      this.form.price = ''
    }
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
