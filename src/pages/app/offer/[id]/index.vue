<template>
  <div>
    <v-row class="product">
      <v-col cols="12" md="6" class="d-flex justify-center">
        <img :src="offer?.product.image" alt="product img" class="product__img" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="d-flex flex-column">
          <div class="d-flex justify-space-between align-center">
            <div>
              <app-text as="strong" size="2xl" class="d-block">{{ offer?.product.name }}</app-text>
              <app-text as="span" size="md">{{ offer?.product.description }}</app-text>
            </div>
            <app-button as="strong">
              <app-text as="strong" color="text-100" class="d-flex align-center">
                <span>-{{ offer?.percentage }} %</span>
                <ph-tag color="white" class="ms-2" weight="bold" />
              </app-text>
            </app-button>
          </div>

          <app-text as="span" class="mt-10">
            <app-text as="strong" size="xl">
              {{ formatNumber.format(offer?.offerPrice ?? 0) }}
            </app-text>
            <app-text size="sm" weight="medium">
              de
              <span class="decoration">{{ formatNumber.format(offer?.product.price ?? 0) }}</span>
            </app-text>
          </app-text>

          <app-button class="mt-10" data-test="add-cart-btn" @click="handleAddToCart">
            <app-text as="strong" color="text-100" class="d-flex align-center" weight="semibold">
              Adicionar ao carrinho
              <ph-shopping-cart class="ms-2" size="25" />
            </app-text>
          </app-button>

          <div class="separator mt-10"></div>

          <div v-if="offer?.product.about?.length">
            <app-text as="strong" class="d-block mt-5 mb-3">Sobre esse item</app-text>
            <ul>
              <li v-for="(description, index) in offer?.product.about" :key="'description' + index">
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
import { PhTag, PhShoppingCart } from '@phosphor-icons/vue'
import AppText from '@/components/ui/AppText.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { OffersService } from '@/services/offers'
import { IOffer } from '@/types/globals/offers'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { formatNumber } from '@/utils/currency/index'
import { useStore } from 'vuex'
import { IProduct } from '../../../../types/globals/products'
import { toast } from 'vue3-toastify'

const offerId = useRoute().params.id as string | number
const offer = ref<IOffer | null>(null)

const store = useStore()

async function getOfferData() {
  try {
    const data = await OffersService.getById(offerId)
    offer.value = data
  } catch (err) {
    console.log(err)
  }
}
const productQuantity = computed(() => {
  const productItem = store?.state?.cart?.items.find(
    (item: IProduct) => item.id == offer.value?.product.id
  )
  if (productItem) {
    return productItem.quantity
  }
  return 0
})

function handleAddToCart() {
  if (productQuantity.value < offer.value!.product.inventory) {
    store.dispatch('cart/addProductToCart', {
      ...offer.value?.product,
      price: offer.value?.offerPrice,
    })

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

getOfferData()
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
