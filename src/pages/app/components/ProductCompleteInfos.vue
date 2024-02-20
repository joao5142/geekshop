<template>
  <div>
    <v-row class="product">
      <v-col cols="12" md="6" class="d-flex justify-center">
        <img :src="product.image ?? ''" alt="product img" class="product__img" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="d-flex flex-column">
          <div class="d-flex justify-space-between align-center">
            <div>
              <app-text as="strong" size="2xl" class="d-block">{{ product.name }}</app-text>
              <app-text as="span" size="md">{{ product.description }}</app-text>
            </div>
            <app-button v-if="isOffer" as="strong">
              <app-text as="strong" color="text-100" class="d-flex align-center">
                <span>-{{ offerData!.percentage }} %</span>
                <ph-tag color="white" class="ms-2" weight="bold" />
              </app-text>
            </app-button>
          </div>

          <app-text v-if="isOffer" as="span" class="mt-10">
            <app-text as="strong" size="xl">
              {{ formatNumber.format(offerData!.offerPrice ?? 0) }}
            </app-text>
            <app-text size="sm" weight="medium">
              de
              <span class="decoration">{{ formatNumber.format(product.price ?? 0) }}</span>
            </app-text>
          </app-text>

          <app-text v-else as="span" class="mt-10">
            <app-text as="strong" size="xl">
              <span>{{ formatNumber.format(product.price ?? 0) }}</span>
            </app-text>
          </app-text>

          <app-button class="mt-10" data-test="add-cart-btn" @click="handleAddToCart">
            <app-text as="strong" color="text-100" class="d-flex align-center" weight="semibold">
              Adicionar ao carrinho
              <ph-shopping-cart class="ms-2" size="25" />
            </app-text>
          </app-button>

          <div class="mt-8">
            <product-quantity-change
              :quantity="productQuantity"
              @increase="handleAddToCart"
              @decrease="handleRemoveFromCart"
            />
          </div>

          <div class="separator mt-10"></div>

          <div v-if="product.about?.length">
            <app-text as="strong" class="d-block mt-5 mb-3">Sobre esse item</app-text>
            <ul class="ms-4">
              <li v-for="(description, index) in product.about" :key="'description' + index">
                {{ description }}
              </li>
            </ul>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import ProductQuantityChange from './ProductQuantityChange.vue'

import { PhTag, PhShoppingCart } from '@phosphor-icons/vue'
import AppText from '@/components/ui/AppText.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { IOffer } from '@/types/globals/offers'
import { defineProps, computed } from 'vue'
import { formatNumber } from '@/utils/currency/index'
import { IProduct } from '@/types/globals/products'
import { toast } from 'vue3-toastify'
import { useStore } from 'vuex'

interface IProps {
  product: IProduct
  isOffer?: boolean
  offerData?: IOffer
}
const store = useStore()
const props = defineProps<IProps>()

const productQuantity = computed(() => {
  const productItem = store?.state?.cart?.items.find(
    (item: IProduct) => item.id == props.product.id
  )
  if (productItem) {
    return productItem.quantity
  }
  return 0
})

function handleAddToCart() {
  if (productQuantity.value < props.product.inventory) {
    if (props.isOffer) {
      store.dispatch('cart/addProductToCart', {
        ...props.product,
        price: props.offerData!.offerPrice,
      })
    } else {
      store.dispatch('cart/addProductToCart', {
        ...props.product,
      })
    }

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
.decoration {
  text-decoration: line-through;
}
.separator {
  border-bottom: 1px solid rgb(var(--v-theme-gray-100));
}
.product {
  img {
    max-width: 500px;
    aspect-ratio: 1/1;
    width: 100%;
    object-fit: contain;
    object-position: center;
  }
}
</style>
