<template>
  <div class="card">
    <v-img :src="product.image" class="card__img"></v-img>
    <div class="card__body">
      <app-text as="strong" size="lg" weight="semibold">{{ product.name }}</app-text>
      <app-text as="p" class="d-block mt-2" size="sm">{{ product.description }}</app-text>

      <div class="d-flex align-center justify-space-between mt-3">
        <div>
          <product-quantity-change
            :quantity="productQuantity"
            @increase="handleAddToCart"
            @decrease="handleRemoveFromCart"
          />
        </div>
        <app-button background="green-300" size="sm">
          <app-text as="span" color="text-50" class="d-block" size="sm" weight="semibold">
            {{ formatNumber.format(product.price) }}
          </app-text>
        </app-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify'

import { computed } from 'vue'
import AppText from '@/components/ui/AppText.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ProductQuantityChange from './ProductQuantityChange.vue'
import { useStore } from 'vuex'
import { formatNumber } from '@/utils/currency/index'
import { Product } from '@/store/modules/productsStore'

interface IProduct {
  product: {
    id: number
    name: string
    description: string
    price: number
    image: string
    inventory: number
  }
}
const store = useStore()
const props = defineProps<IProduct>()

const productQuantity = computed(() => {
  const productItem = store?.state?.cart?.items.find((item: Product) => item.id == props.product.id)
  if (productItem) {
    return productItem.quantity
  }
  return 0
})

function handleAddToCart() {
  if (productQuantity.value < props.product.inventory) {
    store.dispatch('cart/addProductToCart', props.product)

    toast('Produto Adicionado ao carrinho!', {
      autoClose: 2000,
      type: 'success',
    })
  } else {
    toast('Estoque máximo atingido!', {
      autoClose: 2000,
      type: 'error',
    })
  }
}
function handleRemoveFromCart() {
  if (productQuantity.value >= 1) {
    store.dispatch('cart/decreaseProductFromCart', props.product)

    toast('Quantidade decrementada do carrinho!', {
      autoClose: 2000,
      type: 'success',
    })
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/_variables.scss' as variables;

.card {
  border: 1px solid rgb(var(--v-theme-gray-50));

  border-bottom: 3px solid rgb(var(--v-theme-primary));

  border-radius: variables.$border-radius;

  height: 100%;

  display: flex;

  flex-direction: column;

  &__img {
    width: 100%;
    height: 300px;
  }
  &__body {
    flex: 1;
    padding: 1rem;
  }
}
</style>
