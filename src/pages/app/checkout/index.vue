<template>
  <div>
    <v-row v-if="cartItems.length">
      <v-col cols="12" md="8">
        <checkout-stepper />
      </v-col>
      <v-col cols="12" md="4" class="h-full order d-flex flex-column justify-space-between">
        <div>
          <app-text as="strong" size="xl">Pedido</app-text>
          <div>
            <div class="mt-5 order__container-products">
              <div v-for="(product, index) in cartItems" :key="'product' + index">
                <div class="product mb-4">
                  <img :src="product.image" class="product__img" />

                  <div class="d-flex align-center justify-space-between flex-grow-1">
                    <div class="d-flex flex-column">
                      <app-text as="strong" size="md" class="d-block mb-3">
                        {{ product.name }}
                      </app-text>
                      <app-text as="span" size="md">{{ product.description }}</app-text>

                      <app-text
                        as="span"
                        size="md"
                        weight="semibold"
                        class="text-start d-block mt-3"
                      >
                        {{ formatNumber.format(product.price * product.quantity) }}
                      </app-text>
                    </div>
                    <app-text as="strong" size="md">{{ product.quantity }}x</app-text>
                  </div>
                </div>
                <div class="product__separator my-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="d-flex align-center justify-space-between mt-2">
            <strong>Subtotal:</strong>
            <app-text as="span" size="md" class="text-end d-block" weight="medium">
              {{ formatNumber.format(subtotalPrice) }}
            </app-text>
          </div>
          <div class="d-flex align-center justify-space-between mt-2">
            <app-text as="strong" color="red-500">Desconto:</app-text>
            <app-text color="red-500" as="span" size="md" class="text-end d-block" weight="medium">
              {{ formatNumber.format(totalPrice - subtotalPrice) }}
            </app-text>
          </div>
          <div class="d-flex justify-space-between align-center mt-7">
            <app-text as="span" size="md" class="d-block">
              <strong>Total :</strong>
            </app-text>
            <span>{{ formatNumber.format(totalPrice) }}</span>
          </div>
        </div>
      </v-col>
    </v-row>

    <div v-else class="d-flex flex-column align-center">
      <img :src="CartImage" alt="Cart" class="cart-img" />
      <app-text as="span" size="xl" weight="medium">Você não possui itens do carrinho</app-text>
      <app-button outlined border-color="green-300" class="mt-3" @click="handleNavigateToHome">
        <ph-arrow-left :color="green300" size="18" class="me-2" />
        <app-text as="span" color="green-300">Voltar</app-text>
      </app-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhArrowLeft } from '@phosphor-icons/vue'
import CartImage from '@/assets/cart.jpg'
import AppText from '@/components/ui/AppText.vue'
import AppButton from '@/components/ui/AppButton.vue'

import CheckoutStepper from './components/CheckoutStepper.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'
import { formatNumber } from '../../../utils/currency/index'
const { 'green-300': green300 } = useTheme().current.value.colors

const store = useStore()
const router = useRouter()

const cartItems = computed(() => {
  return store?.state?.cart?.items ?? []
})

const totalPrice = computed(() => {
  return store?.getters?.['cart/cartTotalPrice'] ?? 0
})

const subtotalPrice = computed(() => {
  return store?.getters?.['cart/cartSubtotalPrice'] ?? 0
})
function handleNavigateToHome() {
  router.push({
    path: '/app/home',
  })
}
</script>

<style scoped lang="scss">
@use '@/styles/_mixins.scss' as mixins;

.cart-img {
  max-width: 400px;
}

.order {
  max-height: 550px;

  &__cupom {
    object-fit: contain;
    aspect-ratio: 1/1;
    width: 30px;
  }

  &__container-products {
    max-height: 400px;
    overflow-y: auto;
    padding-right: 1rem;

    @include mixins.setScrollColor(rgb(var(--v-theme-green-300)));
  }
}
.product {
  display: flex;
  align-items: center;
  gap: 1rem;

  &__img {
    object-fit: contain;
    min-width: 70px;
    max-width: 70px;
    height: 100px;
  }
  &__separator {
    border: 1px solid rgb(var(--v-theme-gray-100));
  }
}
</style>
