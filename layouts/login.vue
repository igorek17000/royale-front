<template>
  <div class="dark:bg-primary">
    <div
      class="
        bg-gray-100
        dark:bg-primary dark:text-white
        text-gray-600
        h-full
        md:h-screen
        flex
        md:overflow-hidden
      "
    >
      <div class="flex-grow overflow-hidden h-full flex flex-col">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
