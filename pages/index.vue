<template>
  <div>
    <hero-section
      @open-login="$nuxt.$emit('open-login')"
      @open-register="$nuxt.$emit('open-register')"
    />
    <hero-section-numbers />
    <promo-section />
    <why-us-section @open-register="$nuxt.$emit('open-register')" />
    <support-section />
    <review-section />
    <faq-section />
    <footer-action />
  </div>
</template>

<script>
import HeroSection from '@/components/HeroSection.vue'
import HeroSectionNumbers from '@/components/HeroSectionNumbers.vue'
import PromoSection from '@/components/PromoSection.vue'
import WhyUsSection from '@/components/WhyUsSection.vue'
import ReviewSection from '@/components/ReviewSection.vue'
import SupportSection from '@/components/SupportSection.vue'
import FaqSection from '@/components/FaqSection.vue'
import FooterAction from '@/components/FooterAction.vue'
export default {
  name: 'home',
  middleware: 'guest',
  layout: 'home',
  components: {
    HeroSection,
    HeroSectionNumbers,
    PromoSection,
    WhyUsSection,
    ReviewSection,
    SupportSection,
    FaqSection,
    FooterAction,
  },
  data() {
    return {}
  },
}
</script>

<style>
</style>