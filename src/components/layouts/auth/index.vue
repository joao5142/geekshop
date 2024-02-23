<template>
  <v-layout>
    <v-main>
      <slot></slot>
    </v-main>
    <loading-component />
  </v-layout>
</template>

<script setup lang="ts">
import LoadingComponent from '../components/Loading.vue'
</script>

<style scoped lang="scss"></style>
