import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { locale })
import VueRouter from 'vue-router'



import Book from '@/views/books/index'
import Products from '@/components/products'
import CreateBook from '@/views/books/create'
import UpdateBook from '@/views/books/update'
import ShowBook from '@/views/books/show'
import Statistic from './views/statistic';

const routes = [
  { name: 'BookComponent', path: '/books', component: Book },
  { name: 'ProductComponent', path: '/products', component: Products },
  { name: 'AddBookComponent', path: '/books/create', component: CreateBook },
  { name: 'EditBookComponent', path: '/books/update/:id(\\d+)', component: UpdateBook },
  { name: 'ShowBookComponent', path: '/books/show/:id(\\d+)', component: ShowBook },
  { name: 'Statistic', path: '/statistic', component: Statistic },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})
import store from './store'
Vue.use(VueRouter)



Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
