<template>
  <img
    class="w-10 h-10 mr-2 rounded-full object-cover border-2 border-custom-red"
    :src="`https://avatars.dicebear.com/api/pixel-art/${username}.svg`"
    alt="username"
  />
</template>

<script>
export default {
  props: ['username'],
  name: 'Avatar',
}
</script>

<style>
</style>