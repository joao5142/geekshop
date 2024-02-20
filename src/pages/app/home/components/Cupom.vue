<template>
  <div class="cupom">
    <img :src="CuponsImg" alt="" @click="isNavigationOpen = !isNavigationOpen" />

    <teleport to="body">
      <v-navigation-drawer
        ref="targetEl"
        v-model="isNavigationOpen"
        temporary
        :mobile-breakpoint="0"
        location="left"
        width="300"
        class="cupom__drawer"
      >
        <app-text as="strong" size="lg" class="d-flex align-center mb-10">
          <span>Cupons disponiveis</span>

          <ph-tag class="ms-2" />
        </app-text>
        <div
          v-for="(cupom, index) in cupons"
          :key="'cupom' + index"
          class="mb-5 d-flex align-center justify-space-between"
        >
          <div class="d-flex align-center">
            <img :src="cupom.image" alt="cupom" class="cupom__img" />
            <app-text as="strong" size="sm">{{ cupom.description }}</app-text>
          </div>
          <app-button
            :disabled="cupom.isActive"
            outlined
            border-color="green-300"
            size="xs"
            class="px-3 ms-2"
            @click="handleActiveCupom(cupom)"
          >
            {{ cupom.isActive ? 'Ativo' : 'Ativar' }}
          </app-button>
        </div>
      </v-navigation-drawer>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { PhTag } from '@phosphor-icons/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppText from '@/components/ui/AppText.vue'
import CuponsImg from '@/assets/cupons.png'

import { ref, computed } from 'vue'
import { ICupom } from '@/types/globals/cupons'
import { useStore } from 'vuex'

const targetEl = ref(null)

const isNavigationOpen = ref<boolean>(false)

const store = useStore()

const cupons = computed(() => {
  return store.state.cupons.list || []
})
function handleActiveCupom(cupom: ICupom) {
  store.dispatch('cupons/activateCupom', cupom)
}
</script>

<style scoped lang="scss">
.cupom {
  text-align: center;
  img {
    cursor: pointer;
    max-width: 600px;
    max-height: 150px;
    min-height: 100px;
    width: 100%;
    aspect-ratio: 1/-1;
  }

  &__img {
    object-fit: contain;
    height: 70px;
    aspect-ratio: 1/1;
  }
  /* !important to override vuetify properties */
  &__drawer {
    position: fixed !important;
    top: 0px !important;
    height: 100vh !important;

    padding: 1rem;
  }
}
</style>
