<template>
  <v-layout>
    <v-app-bar elevation="0" class="header">
      <v-container> <HeaderComponent /></v-container>
    </v-app-bar>
    <v-main class="mt-15">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import HeaderComponent from './components/Header.vue'
</script>

<style scoped lang="scss">
.header {
  padding-block: 0.6rem;

  border-bottom: 1px solid rgb(var(--v-theme-gray-200));
}
</style>
