<template>
  <div>
    <section>
      <cupom-component class="my-6 mb-15" data-test="drawer-image" />
    </section>

    <section>
      <div class="d-flex align-center mb-6">
        <app-text as="strong" size="xl" class="d-block">Mais Avaliados</app-text>
        <ph-heart size="25" class="ms-2" />
      </div>
      <v-row>
        <v-col
          v-for="(product, index) in products"
          :key="'product' + index"
          cols="12"
          md="6"
          lg="4"
          xl="4"
        >
          <product-card
            class="cursor-pointer"
            :data-test="'product-item' + (index + 1)"
            :product="product"
            @click.stop="handleNavigateToProduct(product.id)"
          />
        </v-col>
      </v-row>
    </section>

    <section>
      <div class="d-flex align-center my-6">
        <app-text as="strong" size="xl" class="d-block">Em oferta</app-text>
        <ph-tag class="ms-2" size="25" />
      </div>
      <v-row>
        <v-col
          v-for="(offer, index) in offers"
          :key="'product' + index"
          cols="12"
          md="6"
          lg="4"
          xl="4"
        >
          <product-card
            :data-test="'product-offer-item' + (index + 1)"
            class="cursor-pointer"
            :product="{ ...offer.product, price: offer.offerPrice }"
            :offer="{ price: offer.offerPrice, id: offer.id }"
            @click="handleNavigateToOffer(offer.id)"
          />
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script setup lang="ts">
import { PhTag, PhHeart } from '@phosphor-icons/vue'
import AppText from '@/components/ui/AppText.vue'
import CupomComponent from './components/Cupom.vue'
import ProductCard from './components/ProductCard.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const store = useStore()

const products = computed(() => {
  return store.state.products.list
})
const offers = computed(() => {
  return store.state.products.offers
})

function handleNavigateToOffer(offerId: number) {
  router.push({ path: '/app/offer/' + offerId })
}
function handleNavigateToProduct(productId: number) {
  router.push({ path: '/app/product/' + productId })
}
</script>
