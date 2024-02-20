<template>
  <div>
    <product-complete-infos v-if="product" :product="product" :is-offer="false" />
  </div>
</template>

<script setup lang="ts">
import ProductCompleteInfos from '../../components/ProductCompleteInfos.vue'

import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ProductService } from '@/services/product'
import { IProduct } from '@/types/globals/products'

const productId = useRoute().params.id as string | number
const product = ref<IProduct | null>(null)

async function getProductData() {
  try {
    const data = await ProductService.getById(productId)

    product.value = data as IProduct
  } catch (err) {
    console.log(err)
  }
}

getProductData()
</script>

<style scoped></style>
