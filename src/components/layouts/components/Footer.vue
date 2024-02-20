<template>
  <footer class="footer">
    <app-text as="span" class="text-center d-block" weight="medium" size="4xl">GeekShop</app-text>
    <app-text as="span" class="text-center d-block" weight="medium" size="lg">
      Todos os direitos reservados &copy;
    </app-text>
    <app-text as="span" class="text-center d-block mt-6" size="sm">
      Formas de pagamento aceitas: cartões de crédito (Visa, MasterCard, Elo e American Express),
      cartões de débito (Visa e Elo), Boleto e Pix.
    </app-text>
  </footer>
</template>

<script setup lang="ts">
import AppText from '@/components/ui/AppText.vue'
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;

  color: rgb(var(--v-theme-text-100));
  margin-top: 5rem;
  width: 100vw;
  padding: 2rem;
  background: rgb(var(--v-theme-green-300));
}
</style>
