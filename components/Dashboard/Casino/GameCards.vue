<template>
  <div class="rounded-lg shadow-lg mx-3 cursor-pointer" @click="openLink(url)">
    <div class="h-48 w-full">
      <img
        :src="image"
        :alt="title"
        class="rounded-t-lg h-full w-full object-cover"
      />
    </div>
    <div class="py-4 px-2 relative bg-secondary bg-opacity-50 rounded-b-lg">
      <h2 class="font-bold mb-2 text-xl text-white">
        {{ title }}
      </h2>
      <p class="text-white mb-2">
        {{ desc }}
      </p>
      <a
        href="#"
        class="absolute top-4 right-4 px-2 py-1 rounded-sm text-xs bg-custom-red text-white uppercase"
        >{{ category }}</a
      >
      <hr class="bg-gray-400 bg-opacity-50" />
      <div class="flex justify-between mt-2">
        <div
          class="px-2 py-1 rounded-sm text-sm font-bold bg-yellow-500 text-white w-12"
        >
          $ {{ min_bet }}
        </div>
        <div
          class="px-2 py-1 rounded-sm text-sm font-bold bg-green-600 text-white w-12"
        >
          $ {{ max_bet }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openLink(url) {
      this.$router.push(this.localePath({ name: `${url}` }))
    },
  },
  props: ['category', 'desc', 'title', 'image', 'url', 'min_bet', 'max_bet'],
}
</script>

<style>
</style>