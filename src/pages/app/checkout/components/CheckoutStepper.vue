<template>
  <div class="checkout">
    <div class="d-flex flex-column">
      <div class="flex-grow-1">
        <header class="checkout__header mb-10">
          <div v-for="(step, index) in steppers" :key="'step' + index" class="checkout__step">
            <component :is="step.icon" :color="currentStep >= index ? green300 : 'black'" />
            <app-text :color="currentStep >= index ? 'green-300' : 'text-900'" weight="medium">
              {{ step.label }}
            </app-text>
          </div>
        </header>

        <app-button
          v-if="currentStep >= 1"
          class="d-flex align-center mb-5"
          outlined
          border-color="green-300"
          is-fab
          @click="handlePrevStep"
        >
          <ph-caret-left :color="green300" />
        </app-button>
        <v-window v-model="currentStep">
          <v-window-item>
            <step1 v-model="isUserDataFormValid" v-model:userInfo="checkout.userInfo" />
          </v-window-item>
          <v-window-item>
            <step2 v-model="isSendDataFormValid" v-model:address="checkout.address" />
          </v-window-item>
          <v-window-item>
            <step3
              v-model="isPaymentDataValid"
              v-model:payment="checkout.payment"
              v-model:cpf="checkout.userInfo.cpf"
            />
          </v-window-item>
        </v-window>
      </div>
      <div class="checkout__separator my-7"></div>
      <div class="d-flex align-center justify-end">
        <!-- <app-button outlined border-color="red-400" class="px-10 ms-auto">
          <app-text as="span" color="red-400">Cancelar Pedido</app-text>
        </app-button> -->

        <app-button
          v-if="currentStep !== steppers.length - 1"
          class="px-15 ms-6"
          :disabled="!isContinueButtonEnable"
          data-test="checkout-continue-btn"
          @click="handleNextStep"
        >
          <app-text as="span" color="text-100">Continuar</app-text>
        </app-button>

        <app-button
          v-else
          class="px-15 ms-6"
          :disabled="!isPaymentDataValid"
          data-test="checkout-confirm-btn"
          @click="handleConfirmOrder"
        >
          <app-text as="span" color="text-100">Finalizar Pedido</app-text>
        </app-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Step1 from './steps/Step1.vue'
import Step2 from './steps/Step2.vue'
import Step3 from './steps/Step3.vue'
import AppText from '@/components/ui/AppText.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { PhUser, PhCube, PhCreditCard, PhCaretLeft } from '@phosphor-icons/vue'
import { useTheme } from 'vuetify'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { CheckoutService } from '@/services/checkout'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { ICheckoutData } from '@/types/globals/checkout'
import { AppError } from '@/utils/erros/AppError'

const router = useRouter()
const store = useStore()

const currentStep = ref<number>(0)
const { 'green-300': green300 } = useTheme().current.value.colors

const isUserDataFormValid = ref<boolean>(false)
const isSendDataFormValid = ref<boolean>(false)
const isPaymentDataValid = ref<boolean>(false)

const checkout = ref<ICheckoutData>({
  userInfo: { name: '', cpf: '', email: '', phone: '' },
  payment: {
    card: {
      cvv: '',
      date: '',
      number: '',
      user: '',
    },
    type: 'CREDIT',
  },
  address: {
    cep: '',
    city: '',
    street: '',
    streetNumber: '',
    uf: '',
  },
})

const products = computed(() => {
  return store.state.cart.items
})

const steppers = [
  {
    label: 'Dados',
    icon: PhUser,
  },
  {
    label: 'Envio',
    icon: PhCube,
  },

  {
    label: 'Pagamento',
    icon: PhCreditCard,
  },
]

const apliedCupons = computed(() => {
  return store.state.cupons.activateCupons || []
})

const isContinueButtonEnable = computed(() => {
  if (currentStep.value == 0) {
    return isUserDataFormValid.value
  } else if (currentStep.value == 1) {
    return isSendDataFormValid.value
  }
  return false
})

function handleNextStep() {
  if (currentStep.value < steppers.length) {
    currentStep.value++
  }
}

function handlePrevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

async function handleConfirmOrder() {
  try {
    const data = await CheckoutService.saveOrder({
      ...checkout.value,
      products: products.value,
      cupons: apliedCupons.value,
    })
    console.log(data.orderId)

    store.dispatch('cart/setCartOrderData', {
      ...checkout.value,
      orderId: data.orderId,
      products: products.value,
      total: data.total,
      subtotal: data.subtotal,
    })
    store.dispatch('cupons/clearActivatedCupons')
    store.dispatch('cart/clearCartItems')

    router.push({ path: '/app/order/' + data.orderId })
  } catch (err) {
    console.error(err)

    if (err instanceof AppError) {
      toast(err.message, {
        autoClose: 5000,
        type: 'error',
      })
    } else {
      toast('Ocorreu um problema ao salvar seu pedido!', {
        autoClose: 5000,
        type: 'error',
      })
    }
  }
}
</script>

<style scoped lang="scss">
.checkout {
  &__header {
    display: flex;
    gap: 3rem;
  }
  &__step {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__separator {
    border: 0.6px solid rgb(var(--v-theme-gray-50));
  }
}
</style>
