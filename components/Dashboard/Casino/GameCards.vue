<template>
  <div class="w-full md:w-1/4">
    <nuxt-link :to="localePath({ name: `${url}` })">
      <div class="bg-white rounded-lg shadow-lg">
        <img :src="image" :alt="title" class="rounded-t-lg" />
        <div class="p-2 relative">
          <h2 class="font-bold mb-2 text-2xl text-purple-800">
            {{ title }}
          </h2>
          <p class="text-purple-700 mb-2">
            {{ desc }}
          </p>
          <a
            href="#"
            class="absolute top-1/2 right-4 p-2 rounded-sm text-sm bg-custom-red text-white uppercase"
            >{{ category }}</a
          >
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['category', 'desc', 'title', 'image', 'url'],
}
</script>

<style>
</style>