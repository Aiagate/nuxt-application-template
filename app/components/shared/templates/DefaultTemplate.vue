<script setup lang="ts">
import { VMain, VContainer } from 'vuetify/components'
import AppHeader from '~/components/shared/organisms/AppHeader.vue'
import AppFooter from '~/components/shared/organisms/AppFooter.vue'

interface Props {
  /** ヘッダーに表示するタイトル */
  title?: string
  /** ヘッダーを目立たせるか */
  prominent?: boolean
  /** フッターを表示するか */
  showFooter?: boolean
  /** フッターの色 */
  footerColor?: string
}

interface Emits {
  /** タイトルがクリックされた時のイベント */
  (e: 'title-click'): void
}

withDefaults(defineProps<Props>(), {
  title: 'Nuxt SPA Template',
  prominent: true,
  showFooter: true,
  footerColor: 'primary',
})

const emit = defineEmits<Emits>()

const handleTitleClick = () => {
  emit('title-click')
}
</script>

<template>
  <div>
    <AppHeader
      :title="title"
      :prominent="prominent"
      @title-click="handleTitleClick"
    >
      <template #actions>
        <slot name="header-actions" />
      </template>
    </AppHeader>

    <VMain>
      <VContainer>
        <slot />
      </VContainer>
    </VMain>

    <AppFooter
      v-if="showFooter"
      :color="footerColor"
    >
      <slot name="footer-content" />
    </AppFooter>
  </div>
</template>
