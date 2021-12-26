<template>
  <div class="flex w-full items-center mb-4">
    <div
      class="
        flex
        items-center
        text-3xl text-gray-900
        dark:text-white
        capitalize
      "
    >
      <!-- <img
        :src="userImage"
        class="w-12 mr-4 rounded-full h-12 object-cover"
        alt="profile"
      /> -->
      <avatar :username="$auth.user.username" />
      {{ $auth.user.username }}
    </div>
    <div class="ml-auto flex items-center justify-end">
      <div class="text-right pr-5 hidden md:block">
        <div class="text-xs text-gray-400 dark:text-gray-400">
          {{ $t('account.balance') }}:
        </div>
        <div class="text-gray-900 text-lg dark:text-white">
          ${{ parseFloat(current_balance).toFixed(2) }} 💰
        </div>
      </div>
      <div class="text-right pr-5">
        <div class="text-xs text-gray-400 dark:text-gray-400">Proffit:</div>
        <div class="text-lg" :class="[profitClass]">{{ proffit }}$</div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '~/components/Dashboard/Avatar.vue'
export default {
  data() {
    return {
      // userImage:
      //   `${this.$config.baseURL}${this.$auth.user.avatar.formats.thumbnail.url}` ||
      //   '../../avatar.png',
      profitClass: 'text-white',
    }
  },
  props: ['balance'],
  components: { Avatar },
  computed: {
    current_balance() {
      return this.balance.actual_balance
    },
    started_balance() {
      return this.balance.started_balance
    },
    proffit() {
      let proffit = this.current_balance - this.started_balance
      if (proffit < 0) {
        proffit = `${parseFloat(proffit).toFixed(2)}`
        this.profitClass = 'text-custom-red'
      } else {
        proffit = `+${parseFloat(proffit).toFixed(2)}`
        this.profitClass = 'text-money'
      }
      return proffit
    },
  },
}
</script>

<style>
</style>