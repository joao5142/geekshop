<template>
  <v-form v-model="isPaymentDataValid">
    <app-text as="strong" size="lg" class="d-block mb-8 mt-2">
      Selecione uma forma de pagamento
    </app-text>

    <div class="payment">
      <app-button
        v-for="(paymentMethod, index) in paymentMethods"
        :key="'paymentMethod' + index"
        :outlined="selectPayment !== paymentMethod.type"
        border-color="green-300"
        :data-test="`checkout-payment-` + paymentMethod.type + '-field'"
        @click="
          () => {
            selectPayment = paymentMethod.type
            payment.type = paymentMethod.type
          }
        "
      >
        <component
          :is="paymentMethod.icon"
          class="me-3"
          :color="selectPayment !== paymentMethod.type ? green300 : 'white'"
        />
        <app-text
          as="span"
          :color="selectPayment !== paymentMethod.type ? 'green-300' : 'text-100'"
        >
          {{ paymentMethod.label }}
        </app-text>
      </app-button>
    </div>
    <div>
      <label for="cpf" class="d-block mt-4">
        <app-text as="span" color="text-500" weight="medium" size="md">Cpf</app-text>
      </label>

      <v-text-field
        id="cpf"
        v-model="cpf"
        v-maska:[cpfMask]
        data-test="checkout-cpf-field"
        :rules="[emptyValue]"
        class="mt-2"
        placeholder="Informe seu cpf"
      ></v-text-field>

      <div v-if="selectPayment == 'CREDIT'">
        <div class="separator my-3 mb-9"></div>
        <app-text as="strong" size="lg" class="d-block mb-8">Dados do cartão</app-text>
        <v-row>
          <v-col cols="12" class="py-0">
            <label for="card_user" class="d-block mt-1">
              <app-text as="span" color="text-500" weight="medium" size="md">
                Nome do titular
              </app-text>
            </label>

            <v-text-field
              id="card_user"
              v-model="payment.card.user"
              data-test="checkout-card-user-field"
              :rules="[emptyValue]"
              class="mt-2"
              placeholder="Nome do titular"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="9" class="py-0">
            <label for="card_number" class="d-block mt-1">
              <app-text as="span" color="text-500" weight="medium" size="md">
                Numero do cartão
              </app-text>
            </label>

            <v-text-field
              id="card_number"
              v-model="payment.card.number"
              v-maska:[cardMask]
              data-test="checkout-card-number-field"
              :rules="[emptyValue]"
              class="mt-2"
              placeholder="Número do cartão"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="py-0">
            <label for="card_code" class="d-block mt-1">
              <app-text as="span" color="text-500" weight="medium" size="md">CVV</app-text>
            </label>

            <v-text-field
              id="card_code"
              v-model="payment.card.cvv"
              v-maska:[cvvMask]
              data-test="checkout-card-cvv-field"
              :rules="[emptyValue]"
              class="mt-2"
              placeholder="Numero do cartão"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="pt-0">
            <label for="card_date" class="d-block mt-1">
              <app-text as="span" color="text-500" weight="medium" size="md">
                Data de vencimento
              </app-text>
            </label>

            <v-text-field
              id="card_date"
              v-model="payment.card.date"
              v-maska:[cardDateMask]
              data-test="checkout-card-date-field"
              :rules="[emptyValue]"
              class="mt-2"
              placeholder="Vencimento"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { PhCreditCard, PhCurrencyDollarSimple, PhMoney } from '@phosphor-icons/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppText from '@/components/ui/AppText.vue'
import { ref, defineModel } from 'vue'
import { useTheme } from 'vuetify'
import { cpfMask, cardMask, cardDateMask, cvvMask } from '@/utils/fieldMask'

import { vMaska } from 'maska'

import { emptyValue } from '@/utils/fieldRules'
import { IPaymentData, PaymentTypes } from '@/types/globals/checkout'

const selectPayment = ref<PaymentTypes>('CREDIT')

const { 'green-300': green300 } = useTheme().current.value.colors

const isPaymentDataValid = defineModel<boolean>()

interface IPaymentMethod {
  type: PaymentTypes
  label: string
  icon: any
}

const paymentMethods: IPaymentMethod[] = [
  {
    type: 'PIX',
    label: 'Pix',
    icon: PhCurrencyDollarSimple,
  },
  {
    type: 'BILLET',
    label: 'Boleto',
    icon: PhMoney,
  },

  {
    type: 'CREDIT',
    label: 'Crédito',
    icon: PhCreditCard,
  },
]

const payment = defineModel<IPaymentData>('payment', { required: true })
const cpf = defineModel<string>('cpf', { required: true })
</script>

<style scoped lang="scss">
.payment {
  display: flex;
  gap: 1rem;
}

.separator {
  border: 0.6px solid rgb(var(--v-theme-gray-50));
}
</style>
