<template>
  <div
    class="bg-gray-100 dark:bg-primary dark:text-white text-gray-600 h-full md:h-screen flex overflow-hidden text-sm mb-20 md:mb-0"
  >
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <div class="flex-grow flex overflow-x-hidden">
        <div class="container mx-auto py-8">
          <news-section />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsSection from '~/components/Dashboard/News/NewsSection.vue'
export default {
  name: 'News',
  components: {
    NewsSection,
  },
}
</script>
