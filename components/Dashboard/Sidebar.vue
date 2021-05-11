<template>
  <div
    class="bg-white dark:bg-secondary dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex"
  >
    <div
      class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4 sidebar-icons"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ['menu'],
}
</script>

<style>
</style>