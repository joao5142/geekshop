<template>
  <div>
    home

    {{ products }}
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const products = computed(() => {
  return store.state.products.list
})
</script>

<style scoped></style>
