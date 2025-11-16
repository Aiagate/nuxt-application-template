<script setup lang="ts">
import { VFooter } from 'vuetify/components'

interface AppFooterProps {
  color?: string
  elevation?: number | string
  border?: boolean
  absolute?: boolean
  app?: boolean
}

const props = withDefaults(defineProps<AppFooterProps>(), {
  color: 'primary',
  elevation: undefined,
  border: false,
  absolute: false,
  app: true,
})
</script>

<template>
  <VFooter
    :color="props.color"
    :elevation="props.elevation"
    :border="props.border"
    :absolute="props.absolute"
    :app="props.app"
  >
    <slot />
  </VFooter>
</template>
