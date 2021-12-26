<template>
  <div
    class="rounded-lg shadow-lg mx-3 cursor-pointer"
    @click="openLink(game.url)"
  >
    <div class="h-48 w-full">
      <img
        v-if="game.image.formats.small.url"
        :src="baseURL + game.image.formats.small.url"
        :alt="game.title"
        class="rounded-t-lg h-full w-full object-cover"
      />
    </div>
    <div class="py-4 px-2 relative bg-secondary bg-opacity-50 rounded-b-lg">
      <h2 class="font-bold mb-2 text-xl text-white">
        {{ game.title }}
      </h2>
      <p class="text-white mb-2">
        {{ game.desc }}
      </p>
      <a
        href="#"
        class="
          absolute
          top-4
          right-4
          px-2
          py-1
          rounded-sm
          text-xs
          bg-custom-red
          text-white
          uppercase
        "
        >{{ game.category }}</a
      >
      <hr class="bg-gray-400 bg-opacity-50" />
      <div class="flex justify-between mt-2">
        <div
          class="
            px-2
            py-1
            rounded-sm
            text-sm
            font-bold
            bg-yellow-500
            text-white
            w-auto
          "
        >
          $ {{ game.min_bet }}
        </div>
        <div
          class="
            px-2
            py-1
            rounded-sm
            text-sm
            font-bold
            bg-green-600
            text-white
            w-auto
          "
        >
          $ {{ game.max_bet }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseURL: this.$config.baseURL,
    }
  },
  methods: {
    openLink(url) {
      this.$router.push(this.localePath({ name: `${url}` }))
    },
  },
  props: ['game'],
}
</script>

<style>
</style>