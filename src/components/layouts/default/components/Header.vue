<template>
  <header class="d-flex align-center justify-space-between">
    <div><v-img @click="handleNavigateToHome" :src="Logo" class="logo"></v-img></div>
    <div class="d-flex">
      <div class="me-5 d-flex align-center cursor-pointer">
        <app-text as="span" color="text-800" class="me-3" weight="medium">2 Items</app-text>
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
import Logo from '@/assets/logo.png'
import AppText from '@/components/ui/AppText.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleNavigateToHome() {
  router.push({ path: '/app/home' })
}
</script>

<style scoped lang="scss">
.logo {
  width: 100px;
  height: 100px;

  cursor: pointer;
}
</style>
