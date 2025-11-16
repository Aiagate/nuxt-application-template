<script setup lang="ts">
import { VToolbarTitle } from 'vuetify/components'

const props = defineProps({
  text: {
    type: String,
    default: undefined,
  },
})
</script>

<template>
  <VToolbarTitle :text="props.text">
    <slot />
  </VToolbarTitle>
</template>
