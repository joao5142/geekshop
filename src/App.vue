<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
const store = useStore()

store.dispatch('products/getAllProducts')
</script>
