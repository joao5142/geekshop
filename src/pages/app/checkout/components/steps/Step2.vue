<template>
  <v-form ref="form" v-model="isSendDataValid">
    <label for="cep" class="d-block">
      <app-text as="span" color="text-500" weight="medium" size="md">Cep</app-text>
    </label>

    <v-text-field
      id="cep"
      v-model="address.cep"
      v-maska:[cepMask]
      data-test="checkout-cep-field"
      :rules="[isCep]"
      class="mt-2"
      placeholder="Cep"
      @blur="handleGetInfosByCep"
    ></v-text-field>

    <label for="city" class="d-block mt-2">
      <app-text as="span" color="text-500" weight="medium" size="md">Cidade</app-text>
    </label>

    <v-text-field
      id="city"
      v-model="address.city"
      data-test="checkout-city-field"
      :rules="[emptyValue]"
      class="mt-2"
      placeholder="Informe sua cidade"
    ></v-text-field>

    <label for="city" class="d-block mt-2">
      <app-text as="span" color="text-500" weight="medium" size="md">Estado</app-text>
    </label>

    <v-select
      v-model="address.uf"
      data-test="checkout-uf-field"
      item-title="nome"
      item-value="sigla"
      class="mt-2"
      placeholder="Selecione seu estado"
      :items="brazilStates"
    ></v-select>

    <v-row>
      <v-col cols="12" md="9">
        <label for="street" class="d-block mt-2">
          <app-text as="span" color="text-500" weight="medium" size="md">Rua,Bairro</app-text>
        </label>

        <v-text-field
          id="street"
          v-model="address.street"
          data-test="checkout-street-field"
          :rules="[emptyValue]"
          class="mt-2"
          placeholder="Informe sua rua"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <label for="street_number" class="d-block mt-2">
          <app-text as="span" color="text-500" weight="medium" size="md">Número</app-text>
        </label>

        <v-text-field
          id="street_number"
          v-model="address.streetNumber"
          data-test="checkout-street-number-field"
          :rules="[isANumber, emptyValue]"
          class="mt-2"
          placeholder="Número"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import AppText from '@/components/ui/AppText.vue'
import { cepMask } from '@/utils/fieldMask'

import { vMaska } from 'maska'

import { emptyValue, isCep, isANumber } from '@/utils/fieldRules'
import { ref, defineModel } from 'vue'
import { AddressService } from '@/services/address'
import { IState, IFieldData } from '@/types/globals/address'
import { IAddressData } from '@/types/globals/checkout'

const form = ref()

const isSendDataValid = defineModel<boolean>()

const brazilStates = ref<IState[] | []>([])

const address = defineModel<IAddressData>('address', { required: true })

async function getAllStates() {
  try {
    brazilStates.value = await AddressService.getStates()
  } catch (err) {
    console.error(err)
  }
}
function validateForm() {
  form.value.validate()
}

async function handleGetInfosByCep() {
  try {
    const data = await AddressService.getInfosByCep(address.value.cep)
    populateFieldByCep(data)
    validateForm()
  } catch (err) {
    console.error(err)
  }
}

function populateFieldByCep(data: IFieldData) {
  if (data.localidade) {
    address.value.city = data.localidade
  }

  if (data.logradouro && data.bairro) {
    address.value.street = `${data.logradouro} ${data.bairro}`
  }

  if (data.uf) {
    address.value.uf = data.uf
  }
}

getAllStates()
</script>

<style scoped></style>
