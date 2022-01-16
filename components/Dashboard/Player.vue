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
        <div
          class="
            text-gray-900 text-lg
            dark:text-white
            font-roboto
            flex
            items-center
          "
        >
          <vue-numeric
            v-if="current_balance"
            currency="$"
            separator=","
            read-only
            read-only-class=" flex
        items-center pr-3
          w-full"
            :value="current_balance"
            :precision="2"
            class=""
          ></vue-numeric>
          💰
        </div>
      </div>
      <div class="text-right pr-5" v-if="proffit">
        <div class="text-xs text-gray-400 dark:text-gray-400">Proffit:</div>
        <div class="text-lg font-roboto" :class="[profitClass]">
          <vue-numeric
            currency="$"
            separator=","
            read-only
            read-only-class=" flex
        items-center
          w-full"
            :value="proffit"
            :precision="2"
            class=""
          ></vue-numeric>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '~/components/Dashboard/Avatar.vue'
import VueNumeric from 'vue-numeric'
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
  components: { Avatar, VueNumeric },
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
        this.profitClass = 'text-custom-red'
      } else {
        this.profitClass = 'text-money'
      }
      return proffit
    },
  },
}
</script>

<style>
</style>