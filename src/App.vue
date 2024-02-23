<template>
  <v-app>
    <component :is="$route.meta.layoutComponent">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
const store = useStore()

store.dispatch('products/getAllProducts')
store.dispatch('products/getAllOffers')
store.dispatch('cupons/getAllCupons')
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transform: translateX(100vw);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
