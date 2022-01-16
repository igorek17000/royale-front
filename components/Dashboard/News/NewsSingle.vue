<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <article>
        <div>
          <header>
            <div
              class="
                pb-10
                space-y-1
                text-center
                border-b border-gray-200
                dark:border-gray-700
              "
            >
              <dl>
                <div>
                  <dt class="sr-only">Published on</dt>
                  <dd
                    class="
                      text-base
                      font-medium
                      leading-6
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    {{ formatDate(blog.created_at) }}
                  </dd>
                </div>
              </dl>
              <div>
                <h1
                  class="
                    text-3xl
                    font-extrabold
                    leading-9
                    tracking-tight
                    text-gray-900
                    dark:text-gray-100
                    sm:text-4xl sm:leading-10
                    md:text-5xl md:leading-14
                  "
                >
                  {{ blog.title }}
                </h1>
              </div>
            </div>
          </header>
          <div
            class="
              pb-8
              divide-y divide-gray-200
              xl:divide-y-0
              dark:divide-gray-700
            "
            style="grid-template-rows: auto 1fr"
          >
            <img
              class="mx-auto py-10"
              v-if="blog.image"
              :src="`${$config.baseURL}${blog.image.formats.large.url}`"
              :alt="blog.title"
            />
            <div
              class="
                divide-y divide-gray-200
                dark:divide-gray-700
                xl:pb-0 xl:col-span-3 xl:row-span-2
              "
            >
              <div
                class="
                  pt-10
                  pb-8
                  prose
                  dark:prose-dark
                  max-w-none
                  text-gray-100 text-base
                "
                v-html="blog.desc"
              ></div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NewsSingle',
  data() {
    return {
      blog: {},
    }
  },
  mounted() {
    let id = this.$route.params.id
    this.getNews(id)
  },
  methods: {
    async getNews(id) {
      this.$axios
        .get(`/blogs/${id}`)
        .then((res) => {
          this.blog = res.data
          console.log('🚀 ~ .then ~ this.blog', this.blog)
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    formatDate(val) {
      return this.$dayjs(val).format('DD/MM/YYYY - HH:mm')
    },
  },
}
</script>

<style>
</style>