<template>
  <div>
    <v-row>
      <v-col
        v-for="(product, index) in products"
        :key="'product' + index"
        cols="12"
        md="6"
        lg="3"
        xl="3"
      >
        <product-card :product="product" />
      </v-col>
    </v-row>

    <v-pagination :length="1" class="mt-5"></v-pagination>
  </div>
</template>

<script setup lang="ts">
import ProductCard from './components/ProductCard.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const products = computed(() => {
  return store.state.products.list
})
</script>

<style scoped></style>
