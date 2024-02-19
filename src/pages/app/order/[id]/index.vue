<template>
  <div class="order">
    <app-text as="strong" size="xl" class="d-block mb-5">Pedido Confirmado !</app-text>

    <v-row>
      <v-col cols="12" md="6">
        <div>
          <div class="order__box">
            <app-text as="span" size="md">
              <strong>Cod :</strong>
              {{ order.id }}
            </app-text>
          </div>
          <div class="order__box">
            <app-text as="span" size="md">
              <strong>Endreço:</strong>
              {{ order.address.street }}, {{ order.address.streetNumber }} ,{{
                order.address.uf
              }}-{{ order.address.cep }}
            </app-text>
          </div>
          <div class="order__box">
            <app-text as="strong" size="md">Produtos</app-text>

            <div class="mt-5">
              <div
                v-for="(product, index) in order.products"
                :key="'product' + index"
                class="order__product mb-4"
              >
                <img :src="product.image" class="order__product-img" />

                <div class="d-flex align-center justify-space-between flex-grow-1">
                  <div class="d-flex flex-column">
                    <app-text as="strong" size="md" class="d-block mb-3">
                      {{ product.name }}
                    </app-text>
                    <app-text as="span" size="md">{{ product.description }}</app-text>
                  </div>
                  <app-text as="strong" size="md">{{ product.quantity }}x</app-text>
                </div>
                <div class="order__product-separator mt-2"></div>
              </div>
            </div>
          </div>
          <div class="order__box">
            <app-text as="span" size="md" class="text-end d-block">
              <strong>Total :</strong>
              {{ order.total }}
            </app-text>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div v-if="order.payment.type !== 'CREDIT'">
          <div class="order__payment-pending mb-4">Pagamento (Pendente)</div>

          <qrcode-vue
            v-if="order.payment.type == 'PIX'"
            :value="452127878545546456123123123"
            :level="level"
            :render-as="renderAs"
          />
          <barcode v-else-if="order.payment.type == 'BILLET'" value="123" />
        </div>

        <div v-else class="order__payment-success">Pagamento confirmado com sucesso!</div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import ImgOrder from '@/assets/order.jpg'
import { useStore } from 'vuex'
import { computed } from 'vue'
import AppText from '@/components/ui/AppText.vue'
import QrcodeVue from 'qrcode.vue'
import Barcode from '@/components/partials/Barcode.vue'

const store = useStore()

const order = computed(() => {
  return store.state.cart.order
})
</script>

<style scoped lang="scss">
@use '@/styles/_variables.scss' as variables;

.order {
  &__box {
    padding: 1rem;

    border: 1px solid rgb(var(--v-theme-text-100));

    &:first-of-type {
      border-top-left-radius: variables.$border-radius;
      border-top-right-radius: variables.$border-radius;
    }
    &:last-of-type {
      border-bottom-left-radius: variables.$border-radius;
      border-bottom-right-radius: variables.$border-radius;
    }
  }
  &__payment-pending,
  &__payment-success {
    padding: 1rem;

    font-size: 1rem;
    border-radius: variables.$border-radius;
    font-weight: 600;
  }
  &__payment-success {
    background: rgb(var(--v-theme-green-50));
    border: 1px solid rgb(var(--v-theme-green-100));

    color: rgb(var(--v-theme-green-400));
  }
  &__payment-pending {
    background: rgb(var(--v-theme-red-50));
    border: 1px solid rgb(var(--v-theme-red-100));
    color: rgb(var(--v-theme-red-400));
  }

  &__img {
    max-width: 100%;
    aspect-ratio: 1/1;
  }
  &__product {
    display: flex;
    align-items: center;
    gap: 1rem;

    &-img {
      height: 100px;
    }
    &-separator {
      border: 1px solid rgb(var(--v-theme-gray-100));
    }
  }
}
</style>
