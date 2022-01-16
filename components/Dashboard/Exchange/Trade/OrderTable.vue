<template>
  <table class="w-full flex flex-row flex-no-wrap overflow-hidden my-2">
    <thead class="text-white hidden md:table-header-group">
      <tr
        class="
          bg-teal-400
          flex flex-col flex-no
          wrap
          sm:table-row sm:rounded-none
          mb-2
          sm:mb-0
        "
      >
        <th class="p-3 text-left">
          {{ $t('dashboard.exchange.trade.footer.order.id') }}
        </th>
        <th class="p-3 text-left">
          {{ $t('dashboard.exchange.trade.footer.order.coin_price') }}
        </th>
        <th class="p-3 text-left">
          {{ $t('dashboard.exchange.trade.footer.order.trade_type') }}
        </th>
        <th class="p-3 text-left">
          {{ $t('dashboard.exchange.trade.footer.order.amount') }}
        </th>
        <th class="p-3 text-left">
          {{ $t('dashboard.exchange.trade.footer.order.proffit') }}
        </th>
        <th class="p-3 text-left">
          {{ $t('dashboard.exchange.trade.footer.order.date') }}
        </th>
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
          <span class="px-2 md:hidden"
            >{{ $t('dashboard.exchange.trade.footer.order.id') }}:</span
          >{{ order.id }}
        </td>
        <td class="uppercase p-3 relative">
          <span class="px-2 md:hidden"
            >{{ $t('dashboard.exchange.trade.footer.order.coin_price') }}:</span
          >{{ order.coin_price }} USD
        </td>
        <td class="p-3 truncate uppercase relative">
          <span class="px-2 md:hidden"
            >{{ $t('dashboard.exchange.trade.footer.order.trade_type') }}:</span
          >
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
          <span class="px-2 md:hidden">
            {{ $t('dashboard.exchange.trade.footer.order.amount') }}:</span
          >
          {{ parseFloat(order.amount).toFixed(2) }}
          USD
        </td>

        <td class="uppercase p-3 cursor-pointer relative">
          <span class="px-2 md:hidden"
            >{{ $t('dashboard.exchange.trade.footer.order.proffit') }}:</span
          >
          {{ parseFloat(order.proffit).toFixed(2) }}
          USD
        </td>
        <td class="uppercase p-3 relative">
          <span class="px-2 md:hidden"
            >{{ $t('dashboard.exchange.trade.footer.order.date') }}:</span
          >
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