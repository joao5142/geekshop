<template>
  <v-form v-model="isUserDataFormValid">
    <label for="name" class="d-block">
      <app-text as="span" color="text-500" weight="medium" size="md">Nome Completo</app-text>
    </label>

    <v-text-field
      id="name"
      v-model="userInfo.name"
      :rules="[emptyValue]"
      class="mt-2"
      placeholder="Informe seu nome completo"
    ></v-text-field>

    <label for="email" class="d-block mt-2">
      <app-text as="span" color="text-500" weight="medium" size="md">E-mail</app-text>
    </label>

    <v-text-field
      id="email"
      v-model="userInfo.email"
      :rules="[emptyValue, isEmail]"
      class="mt-2"
      placeholder="Informe seu nome completo"
    ></v-text-field>

    <label for="phone" class="d-block mt-2">
      <app-text as="span" color="text-500" weight="medium" size="md">Telefone</app-text>
    </label>

    <v-text-field
      id="phone"
      v-model="userInfo.phone"
      v-maska:[phoneMask]
      :rules="[emptyValue, isPhoneNumber]"
      class="mt-2"
      placeholder="Informe seu telefone"
    ></v-text-field>
  </v-form>
</template>

<script setup lang="ts">
import AppText from '@/components/ui/AppText.vue'

import { phoneMask } from '@/utils/fieldMask'

import { vMaska } from 'maska'

import { emptyValue, isEmail, isPhoneNumber } from '@/utils/fieldRules'
import { defineModel } from 'vue'
import { UserData } from '@/store/modules/cartStore'

const isUserDataFormValid = defineModel<boolean>()

const userInfo = defineModel<UserData>('userInfo', { required: true })
</script>

<style scoped></style>
