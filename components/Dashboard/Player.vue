<template>
  <div class="flex w-full items-center mb-4">
    <div
      class="flex items-center text-3xl text-gray-900 dark:text-white capitalize"
    >
      <img
        src="https://assets.codepen.io/344846/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1582611188&width=512"
        class="w-12 mr-4 rounded-full"
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
export default {}
</script>

<style>
</style>