<template>
  <div class="d-flex align-center">
    <app-text as="strong">Qtd :</app-text>
    <div class="d-flex align-center">
      <app-button
        is-fab
        outlined
        size="sm"
        class="ms-3"
        border-color="gray-300"
        @click="$emit('decrease')"
      >
        <ph-minus class="cursor-pointer" weight="bold" />
      </app-button>
      <app-text as="strong" class="mx-3 d-inline-block">{{ quantity }}</app-text>
      <app-button is-fab outlined size="sm" border-color="gray-300" @click="$emit('increase')">
        <ph-plus data-test="product-add-btn" class="cursor-pointer" weight="bold" />
      </app-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { PhPlus, PhMinus } from '@phosphor-icons/vue'
import AppText from '@/components/ui/AppText.vue'

interface IProps {
  quantity: number
}
defineProps<IProps>()

type EmitTypes = {
  increase: []
  decrease: []
}
defineEmits<EmitTypes>()
</script>

<style scoped></style>
