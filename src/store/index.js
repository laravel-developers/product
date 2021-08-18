import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        statistic: {
            count: 0,
            sum_amount: 0
        }
    },
    getters: {
        getCount(state) {
            return state.statistic.count
        },
        getSum(state) {
            return state.statistic.sum_amount
        }
    },
    mutations: {
        setProducts(state, data) {
            data.forEach(item => {
                state.statistic.count += 1
                state.statistic.sum_amount += parseFloat(item.price)
            })
        }
    },
    actions: {
        getProducts({ commit }) {
            axios.get('http://product.local/products').then((res) => {
                commit('setProducts', res.data)
            })
        }
    }
})

export default store