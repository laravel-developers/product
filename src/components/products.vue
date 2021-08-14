<template>
  <div class="">
<!--    <loading-->
<!--        :active.sync="isLoading"-->
<!--        loader="bars"-->
<!--        :can-cancel="false"-->
<!--        :is-full-page="true"-->
<!--    />-->
    <button class="btn btn-info float-right" @click="">Mahsulot qo`shish</button>

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
          <td><button class="btn"  @click="show(product.id)">{{ product.name }}</button></td>
          <td>{{ format_num(product.price) }}</td>
          <td>{{ format_date(product.created_date) }}</td>
          <td>{{ product.term }}</td>
          <td>
            <button class="btn btn-danger mr-2" @click="destroy(product.id)">O'chirish</button>
            <button class="btn btn-info" @click="edit1(product.id)">Tahrirlash</button>
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

  <el-dialog
        title="Tips"
        :visible.sync="dialogVisible"
        width="30%"
    >
      <h3>Mahsulotni tahrirlash</h3>
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="name1">Nomi</label>
              <input type="text" id="name1" v-model="formEdit.name" class="form-control">
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <label for="price1">Narxi</label>
              <input id="price1" type="number" v-model="formEdit.price" class="form-control">
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <label for="created_date1">Yaratilgan sana</label>
              <input id="created_date1" type="date" v-model="formEdit.created_date" class="form-control">
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <label for="term1">Yaroqlilik muddati (oy)</label>
              <input id="term1" type="number" v-model="formEdit.term" class="form-control">
            </div>
          </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="update(formEdit.id); dialogVisible = false">Confirm</el-button>
      </span>
  </el-dialog>

  </div>
</template>

<script>
import 'vue-loading-overlay/dist/vue-loading.css'
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'Products',
  components: {},
  data() {
    return {
      products: [],
      isLoading: true,
      dialogVisible: false,
      form: {
        name: '',
        price: '',
        created_date: '',
        term: ''
      },
      formEdit: {
        id: '',
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
    edit1(id) {
      axios.get('http://product.local/products/' + id).then((res) => {
        this.formEdit.id = id
        this.formEdit.name = res.data.name
        this.formEdit.price = res.data.price
        this.formEdit.term = res.data.term
        this.formEdit.created_date = res.data.created_date
        this.dialogVisible = true
      })
      console.log(id)
    },
    show(){

    },
    update(){
      axios.put('http://product.local/products/' + this.formEdit.id, this.formEdit).then(() => {
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
    },
    format_date(value){
      if (value) {
        return moment(String(value)).format('DD.MM.YYYY')
      }
      return value
    },
    format_num(number) {
      let number1 = number;
      return (new Intl.NumberFormat().format(number1))
    },
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
