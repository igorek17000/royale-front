<template>
  <div
    v-if="notification"
    class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-greenMoney"
  >
    <span class="text-xl inline-block mr-5 align-middle">
      <i class="fas fa-bell"></i>
    </span>
    <span class="inline-block align-middle mr-8">
      Order placed succesfully!
    </span>
    <button
      class="
        absolute
        bg-transparent
        text-2xl
        font-semibold
        leading-none
        right-0
        top-0
        mt-4
        mr-6
        outline-none
        focus:outline-none
      "
      v-on:click="closeAlert()"
    >
      <span>×</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Notification',

  props: ['open'],
  methods: {
    callFunction() {
      setTimeout(() => {
        console.log('Hi Bro, SetTimeout is working fine.')
      }, 1000)
    },
    closeAlert() {
      console.log('closeee')
      this.$store.commit('OPEN_NOTIFICATION', false)
    },
  },
  computed: {
    notification() {
      return this.$store.state.notification
    },
  },

  mounted() {
    setTimeout(this.closeAlert(), 3000)
    this.callFunction()
  },
}
</script>