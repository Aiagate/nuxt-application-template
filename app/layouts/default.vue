<script setup lang="ts">
import DefaultTemplate from '~/components/shared/templates/DefaultTemplate.vue'
import { VApp, VResponsive } from 'vuetify/components'

const handleTitleClick = () => {
  // タイトルクリック時の処理（例: ホームへ遷移）w
  console.log('Title clicked')
}
</script>

<template>
  <VResponsive>
    <VApp>
      <DefaultTemplate
        title="Nuxt SPA Template"
        prominent
        @title-click="handleTitleClick"
      >
        <template #header-actions>
          <!-- ここにヘッダーアクション（ボタンなど）を追加可能 -->
        </template>

        <slot />

        <template #footer-content>
          <div class="text-center w-100 pa-4">
            <p class="mb-0">
              © {{ new Date().getFullYear() }} Nuxt SPA Template
            </p>
          </div>
        </template>
      </DefaultTemplate>
    </VApp>
  </VResponsive>
</template>
