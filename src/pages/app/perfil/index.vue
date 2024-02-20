<template>
  <div>
    <app-text as="strong" size="lg">Detalhes da conta</app-text>

    <v-row>
      <v-col cols="12" md="8">
        <v-form class="mt-8">
          <label for="name">
            <app-text as="span" color="text-500" weight="medium" size="sm">Nome</app-text>
          </label>

          <v-text-field id="name" class="field" placeholder="Informe seu nome"></v-text-field>

          <label for="email">
            <app-text as="span" size="sm" color="text-500" weight="medium">Email</app-text>
          </label>

          <v-text-field id="email" class="field" placeholder="Informe seu e-mail"></v-text-field>

          <label for="password">
            <app-text as="span" size="sm" color="text-500" weight="medium">Senha</app-text>
          </label>

          <v-text-field id="password" class="field" placeholder="Informe  sua senha"></v-text-field>

          <app-button class="mt-2">
            <app-text as="span" color="text-50">Confirmar Alterações</app-text>
          </app-button>
        </v-form>
      </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex flex-column align-center">
          <label for="input" class="cursor-pointer">
            <v-avatar image="https://cdn.vuetifyjs.com/images/john.jpg" size="200"></v-avatar>
          </label>
          <app-text as="strong" size="lg" class="d-block mt-3">John Doe</app-text>
          <app-text as="span" size="sm" class="d-block mt-1">jonhn@gmail.com.br</app-text>

          <v-file-input id="input" hidden label="File input" class="hidden"></v-file-input>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import AppText from '@/components/ui/AppText.vue'
import AppButton from '@/components/ui/AppButton.vue'
</script>

<style scoped lang="scss">
.field {
  max-width: 600px;
  width: 100%;

  margin-top: 1rem;
}
.hidden {
  display: none;
}
</style>
