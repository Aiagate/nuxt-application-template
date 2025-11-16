<script lang="ts" setup>
const route = useRoute()
const userId = route.params.id as string
</script>

<template>
  <div>
    <p>This is the User page for user with ID: <b>{{ userId }}</b></p>
    <nuxt-link to="/">Go to Home Page</nuxt-link>
  </div>
</template>
