<template>
  <component :is="'img'" id="barcodegen" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import JsBarcode, { Options } from 'jsbarcode'

interface IProps {
  value: string
}
const props = defineProps<IProps>()

onMounted(() => {
  generateBarcode()
})

function generateBarcode() {
  const settings: Options = {
    height: 50,
  }

  JsBarcode('#barcodegen', props.value, settings)
}
</script>
