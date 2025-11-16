<script setup lang="ts">
import { VAppBar } from 'vuetify/components'
import AppButton from '~/components/shared/atoms/AppButton.vue'
import AppSpacer from '~/components/shared/atoms/AppSpacer.vue'
import AppToolbarTitle from '~/components/shared/atoms/AppToolbarTitle.vue'

interface AppHeaderProps {
  title?: string
  color?: string
  prominent?: boolean
  elevation?: number | string
  showMenuButton?: boolean
}

const props = withDefaults(defineProps<AppHeaderProps>(), {
  title: 'Nuxt SPA Template',
  color: 'primary',
  prominent: false,
  elevation: undefined,
  showMenuButton: false,
})

const emit = defineEmits<{
  menuClick: []
  titleClick: []
}>()

const handleMenuClick = () => {
  emit('menuClick')
}

const handleTitleClick = () => {
  emit('titleClick')
}
</script>

<template>
  <div>
    <VAppBar
      :color="props.color"
      :prominent="props.prominent"
      :elevation="props.elevation"
    >
      <template
        v-if="props.showMenuButton"
        #prepend
      >
        <AppButton
          icon="mdi-menu"
          @click="handleMenuClick"
        />
      </template>

      <AppToolbarTitle
        @click="handleTitleClick"
      >
        {{ props.title }}
      </AppToolbarTitle>

      <AppSpacer />

      <slot name="actions" />
    </VAppBar>
  </div>
</template>
