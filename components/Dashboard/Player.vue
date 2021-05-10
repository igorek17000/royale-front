<template>
  <div class="flex w-full items-center mb-4">
    <div
      class="flex items-center text-3xl text-gray-900 dark:text-white capitalize"
    >
      <img
        :src="userImage"
        class="w-12 mr-4 rounded-full h-12 object-cover"
        alt="profile"
      />
      {{ this.$auth.user.username }}
    </div>
    <div class="ml-auto sm:flex hidden items-center justify-end">
      <div class="text-right">
        <div class="text-xs text-gray-400 dark:text-gray-400">
          Account balance:
        </div>
        <div class="text-gray-900 text-lg dark:text-white">
          ${{ this.$auth.user.balance }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userImage:
        `${this.$config.baseURL}${this.$auth.user.avatar.formats.thumbnail.url}` ||
        '../../avatar.png',
    }
  },
}
</script>

<style>
</style>