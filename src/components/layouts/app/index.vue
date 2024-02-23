<template>
  <v-layout class="d-flex flex-column">
    <v-app-bar elevation="0" class="header">
      <v-container><header-component /></v-container>
    </v-app-bar>

    <v-main class="mt-15">
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>

    <v-footer v-if="$route.meta.showFooter" class="pa-0">
      <footer-component />
    </v-footer>

    <loading-component />
  </v-layout>
</template>

<script setup lang="ts">
import HeaderComponent from '../components/Header.vue'
import LoadingComponent from '../components/Loading.vue'
import FooterComponent from '../components/Footer.vue'
</script>

<style scoped lang="scss">
.header {
  padding-block: 0.6rem;

  border-bottom: 1px solid rgb(var(--v-theme-gray-200));
}
</style>
