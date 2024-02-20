<template>
  <div>
    <product-complete-infos
      v-if="offer"
      :product="offer.product"
      :is-offer="true"
      :offer-data="offer"
    />
  </div>
</template>

<script setup lang="ts">
import ProductCompleteInfos from '../../components/ProductCompleteInfos.vue'
import { OffersService } from '@/services/offers'
import { IOffer } from '@/types/globals/offers'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const offerId = useRoute().params.id as string | number
const offer = ref<IOffer | null>(null)

async function getOfferData() {
  try {
    const data = await OffersService.getById(offerId)
    offer.value = data
  } catch (err) {
    console.log(err)
  }
}

getOfferData()
</script>

<style scoped lang="scss"></style>
