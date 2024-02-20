<template>
  <div class="d-flex align-center">
    <ph-caret-down class="cursor-pointer" @click="$emit('decrease')" />
    <app-text as="span" class="d-block mx-3" size="lg" weight="medium">{{ quantity }}</app-text>
    <ph-caret-up data-test="product-add-btn" class="cursor-pointer" @click="$emit('increase')" />
  </div>
</template>

<script setup lang="ts">
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'
import AppText from '@/components/ui/AppText.vue'

interface IProps {
  quantity: number
}
defineProps<IProps>()
</script>

<style scoped></style>
