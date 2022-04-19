<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col">
        <div class="h-1 bg-gray-200 rounded overflow-hidden"></div>
        <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
          <h1
            class="sm:w-2/5 text-white font-medium title-font text-2xl mb-2 sm:mb-0"
          >
            Latest news..
          </h1>
          <p
            class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0 text-gray-300"
          >
            Check out the latest news regarding on crypto / exchange and dont
            hesitate to contact us about anything!
          </p>
        </div>
      </div>
      <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
        <div
          v-for="blog in blogs"
          :key="blog.id"
          class="p-4 md:w-1/3 sm:mb-0 mb-6 cursor-pointer"
          @click="openblog(blog.id)"
        >
          <div class="rounded-lg h-64 overflow-hidden">
            <img
              :alt="blog.title"
              class="object-cover object-center h-full w-full"
              :src="`${$config.baseURL}${blog.image.formats.small.url}`"
            />
          </div>
          <h2 class="text-xl font-medium title-font text-white mt-5">
            {{ blog.title }}
          </h2>
          <p class="text-base leading-relaxed mt-2 text-gray-300">
            {{ blog.small_desc }}
          </p>
          <button class="text-money inline-flex items-center mt-3">
            Learn More
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NewsSection',
  data() {
    return {
      blogs: [],
    }
  },
  mounted() {
    this.getNews()
  },
  methods: {
    async getNews() {
      this.$axios
        .get('/blogs')
        .then((res) => {
          this.blogs = res.data
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    openblog(id) {
      this.$router.push(this.localePath({ path: `news/${id}` }))
    },
  },
}
</script>

<style></style>
