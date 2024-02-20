<template>
  <div class="card">
    <v-img :src="product.image" class="card__img"></v-img>
    <div class="card__body">
      <app-text as="strong" size="lg" weight="semibold">{{ product.name }}</app-text>
      <app-text as="p" class="d-block mt-2" size="sm">{{ product.description }}</app-text>

      <div class="d-flex align-center justify-space-between mt-3">
        <app-button background="green-300" size="sm">
          <app-text as="span" color="text-50" class="d-block" size="sm" weight="semibold">
            {{ formatNumber.format(product.price) }}
          </app-text>
        </app-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppText from '@/components/ui/AppText.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { formatNumber } from '@/utils/currency/index'
import { IProduct } from '@/types/globals/products'

interface IProductProps {
  product: IProduct
  offer?: { price: number; id: number }
}

defineProps<IProductProps>()
</script>

<style scoped lang="scss">
@use '@/styles/_variables.scss' as variables;

.card {
  border: 1px solid rgb(var(--v-theme-gray-50));

  border-bottom: 3px solid rgb(var(--v-theme-primary));

  border-radius: variables.$border-radius;

  height: 100%;
  width: 100%;

  display: flex;

  flex-direction: column;

  &__img {
    width: 100%;
    height: 300px;
  }
  &__body {
    flex: 1;
    padding: 1rem;
  }
}
</style>
