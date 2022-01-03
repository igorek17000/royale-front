<template>
  <div class="main">bonus page here</div>
</template>

<script>
export default {
  name: 'Bonus',
  middleware: 'auth',
  auth: 'guest',
  layout: 'home',
}
</script>

<style>
</style>