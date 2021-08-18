<template>
  <div class="">
    <!--    <loading-->
    <!--        :active.sync="isLoading"-->
    <!--        loader="bars"-->
    <!--        :can-cancel="false"-->
    <!--        :is-full-page="true"-->
    <!--    />-->
    <router-link :to="{ name: 'BookComponent' }">Books page ga o'tish</router-link>
    <button class="btn btn-info float-right" @click="create()">Mahsulot qo`shish</button>

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
      <tr>
<!--        <form >-->
          <th>
<!--            <input type="text" name="id" class="form-control" id="id" placeholder="id" v-model="search">-->
          </th>
          <th>
            <input type="text" class="form-control" v-model="filter.name" @keyup.enter="getItems" placeholder="nomi" >
          </th>
          <th>
            <input type="text" name="price" class="form-control" id="email" placeholder="narxi" >
          </th>
          <th>
            <input type="text" name="created_date" class="form-control" id="address" placeholder="yaratilgan vaqti" >
          </th>
          <th>
            <input type="text" name="term" class="form-control" id="address" placeholder="Amal qilish muddati" >
          </th>
          <th>
            <button type="submit" class="btn btn-primary  active " @click="getItems"> Qidirish </button>
          </th>
<!--        </form>-->
      </tr>
      </thead>
      <tbody>
      <template v-if="products.length">
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>
            <button class="btn" @click="show(product.id)">{{ product.name }}</button>
          </td>
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
        <tr>
          <td colspan="5">Ma`lumot yo'q</td>
        </tr>
      </template>
      </tbody>
    </table>

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
        <el-button v-show="createVisible" type="primary" @click="save(); dialogVisible = false">Add</el-button>
        <el-button v-show="!createVisible" type="primary" @click="update(formEdit.id); dialogVisible = false">Confirm</el-button>
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
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      isLoading: true,
      dialogVisible: false,
      createVisible: false,
      // sort_direction: 'desc',
      // sort_field: 'created_date',
      filter: {
        name: '',
        price: '',
        created_date: '',
        term: ''
      },
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
  watch: {
    'filter.name'(newValue, oldValue) {
      console.log('eski qiymat: ' , oldValue)
      console.log('yangi qiymat: ' , newValue)
      this.getItems()
    }
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
        this.createVisible = false
      })
      console.log(id)
    },
    create() {
      this.form.id = ''
      this.form.name = ''
      this.form.price = ''
      this.form.term = ''
      this.form.created_date = ''
      this.createVisible = true
      this.formEdit = this.form
      this.dialogVisible = true
    },
    show() {

    },
    update() {
      axios.put('https://7b05d55f38ed.ngrok.io/products/' + this.formEdit.id, this.formEdit).then(() => {
        this.getItems()
      }).finally(() => {
        this.isLoading = false
        this.clearForm()
      })
    },
    destroy(id) {
      if (confirm('Haqiqatan ham o\'chirmoqchimisiz')) {
        axios.delete('https://7b05d55f38ed.ngrok.io/products/' + id).then(() => {
          this.getItems()
        })
      }
    },
    getItems() {
      axios.get('http://product.local/products/', { params: this.filter } ).then((res) => {
        this.products = res.data
      }).finally(() => {
        this.isLoading = false
      })
    },
    save() {
      this.form = this.formEdit
      axios.post('http://product.local/products/', this.form).then(() => {
        this.getItems()
      }).finally(() => {
        this.isLoading = false
        this.clearForm()
      })
    },
    saveEdit() {
      axios.post('https://7b05d55f38ed.ngrok.io/products/', this.formEdit).then(() => {
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
    format_date(value) {
      if (value) {
        return moment(String(value)).format('DD.MM.YYYY')
      }
      return value
    },
    format_num(number) {
      let number1 = number;
      return (new Intl.NumberFormat().format(number1))
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