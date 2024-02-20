<template>
  <header class="d-flex align-center justify-space-between">
    <div>
      <app-text as="strong" size="2xl" class="cursor-pointer" @click="handleNavigateToHome">
        GeekShop
      </app-text>
    </div>
    <div class="d-flex">
      <div
        class="me-5 d-flex align-center cursor-pointer"
        data-test="items-cart"
        @click="handleNavigateToCheckout"
      >
        <app-text as="span" color="text-800" class="me-3" weight="medium">
          {{ itemsQuantity }} {{ itemsQuantity == 1 ? 'Item' : 'Items' }}
        </app-text>
        <ph-shopping-cart-simple :size="25" color="black" />
      </div>

      <div>
        <menu-profile />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import MenuProfile from './MenuProfile.vue'
import { PhShoppingCartSimple } from '@phosphor-icons/vue'
import AppText from '@/components/ui/AppText.vue'

import { useStore } from 'vuex'

import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const itemsQuantity = computed(() => {
  return store?.state.cart?.items?.length ?? 0
})

function handleNavigateToHome() {
  router.push({ path: '/app/home' })
}
function handleNavigateToCheckout() {
  router.push({ path: '/app/checkout' })
}
</script>

<style scoped lang="scss">
.logo {
  width: 100px;
  height: 100px;

  cursor: pointer;
}
</style>
