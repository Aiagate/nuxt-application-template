<script setup lang="ts">
import { VBtn } from 'vuetify/components'

interface AppButtonProps {
  variant?: 'elevated' | 'flat' | 'outlined' | 'plain' | 'text' | 'tonal'
  color?: string
  size?: string | number
  icon?: string
  disabled?: boolean
  loading?: boolean
  block?: boolean
  rounded?: string | number | boolean
}

const props = withDefaults(defineProps<AppButtonProps>(), {
  variant: undefined,
  color: undefined,
  size: undefined,
  icon: undefined,
  disabled: false,
  loading: false,
  block: false,
  rounded: undefined,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <VBtn
    :variant="props.variant"
    :color="props.color"
    :size="props.size"
    :icon="props.icon"
    :disabled="props.disabled"
    :loading="props.loading"
    :block="props.block"
    :rounded="props.rounded"
    @click="handleClick"
  >
    <slot />
  </VBtn>
</template>
