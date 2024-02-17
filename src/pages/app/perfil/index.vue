<template>
  <div>
    <app-text as="strong" size="lg">Detalhes da conta</app-text>

    <v-form class="mt-8">
      <label for="name">
        <app-text as="span" color="text-500" weight="medium" size="sm">Nome</app-text>
      </label>

      <v-text-field class="field" id="name" placeholder="Informe seu nome"></v-text-field>

      <label for="email">
        <app-text as="span" size="sm" color="text-500" weight="medium">Email</app-text>
      </label>

      <v-text-field class="field" id="email" placeholder="Informe seu e-mail"></v-text-field>

      <label for="password">
        <app-text as="span" size="sm" color="text-500" weight="medium">Senha</app-text>
      </label>

      <v-text-field class="field" id="password" placeholder="Informe  sua senha"></v-text-field>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import AppText from '@/components/ui/AppText.vue'
</script>

<style scoped lang="scss">
.field {
  max-width: 600px;
  width: 100%;
}
</style>
