<template>
  <table
    class="
      w-full
      flex flex-row flex-no-wrap
      sm:bg-primary
      rounded-lg
      overflow-hidden
      sm:shadow-lg
      my-2
    "
  >
    <thead class="text-white hidden md:table-header-group">
      <tr
        class="
          bg-teal-400
          flex flex-col flex-no
          wrap
          sm:table-row
          rounded-l-lg
          sm:rounded-none
          mb-2
          sm:mb-0
        "
      >
        <th class="p-3 text-left">Order ID</th>
        <th class="p-3 text-left">Coin Price</th>
        <th class="p-3 text-left">Trade Type</th>
        <th class="p-3 text-left">Amount</th>
        <th class="p-3 text-left">Proffit</th>
        <th class="p-3 text-left">Date</th>
      </tr>
    </thead>
    <tbody class="flex-1 sm:flex-none">
      <tr
        class="
          flex flex-col flex-no
          wrap
          sm:table-row
          mb-2
          sm:mb-0
          border
          md:border-none
        "
        v-for="order in orders"
        :key="order.id"
      >
        <td class="uppercase p-3 relative">
          <span class="px-2 md:hidden">Order ID:</span>{{ order.id }}
        </td>
        <td class="uppercase p-3 relative">
          <span class="px-2 md:hidden">Coin Price:</span
          >{{ order.coin_price }} USD
        </td>
        <td class="p-3 truncate uppercase relative">
          <span class="px-2 md:hidden">Trade Type:</span>
          <span
            :class="[
              order.trade_type === 'sell'
                ? 'text-pinkMoney'
                : 'text-greenMoney',
            ]"
          >
            {{ order.trade_type }}
          </span>
        </td>
        <td class="uppercase p-3 cursor-pointer relative">
          <span class="px-2 md:hidden">Amount:</span>
          {{ parseFloat(order.amount).toFixed(2) }}
          USD
        </td>

        <td class="uppercase p-3 cursor-pointer relative">
          <span class="px-2 md:hidden">Proffit:</span>
          {{ parseFloat(order.proffit).toFixed(2) }}
          USD
        </td>
        <td class="uppercase p-3 relative">
          <span class="px-2 md:hidden">Date:</span>
          {{ formatTime(order.created_at) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'OrderTable',
  props: ['orders'],
  methods: {
    formatTime(val) {
      return this.$dayjs(val).format('DD/MM/YYYY - HH:mm')
    },
  },
}
</script>

<style>
</style>