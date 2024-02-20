<template>
  <v-app>
    <component :is="$route.meta.layoutComponent">
      <router-view />
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
