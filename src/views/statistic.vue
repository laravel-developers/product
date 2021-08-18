<template>
  <div>
    <h1>Total count: {{ count }}</h1>
    <h1>Total sum: {{ sum }}</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "statistic",
  computed: {
      // count() {
      //   return this.$store.getters.getCount
      // },
      // sum() {
      //   return this.$store.getters.getSum
      // },
    ...mapGetters({ count: 'getCount', sum: 'getSum' })
  },
  created() {
    this.getProductStatistic()
  },
  methods: {
    // getProductStatistic() {
    //   this.$store.dispatch('getProducts')
    // }

    ...mapActions({ getProductStatistic: 'getProducts' })
  }
}
</script>

<style scoped>

</style>