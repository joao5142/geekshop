<template>
  <v-layout class="d-flex flex-column">
    <slot></slot>
    <loading-component />
  </v-layout>
</template>

<script setup lang="ts">
import LoadingComponent from '../components/Loading.vue'
</script>

<style scoped lang="scss">
.header {
  padding-block: 0.6rem;

  border-bottom: 1px solid rgb(var(--v-theme-gray-200));
}
</style>
