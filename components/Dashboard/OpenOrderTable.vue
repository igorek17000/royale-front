<template>
  <div class="w-full flex flex-col my-2 relative">
    <div
      class="text-white hidden md:flex w-100 justify-start items-center sticky top-0"
    >
      <div class="px-3 py-1 text-left w-1/6">
        {{ $t('dashboard.exchange.trade.footer.order.id') }}
      </div>
      <div class="px-3 py-1 text-left w-1/6">
        {{ $t('dashboard.exchange.trade.footer.order.stock') }}
      </div>
      <div class="px-3 py-1 text-left w-1/6">
        {{ $t('dashboard.exchange.trade.footer.order.coin_price') }}
      </div>
      <div class="px-3 py-1 text-left w-1/6">
        {{ $t('dashboard.exchange.trade.footer.order.trade_type') }}
      </div>
      <div class="px-3 py-1 text-left w-1/6">
        {{ $t('dashboard.exchange.trade.footer.order.amount') }}
      </div>
      <div class="px-3 py-1 text-left w-1/6">
        {{ $t('dashboard.exchange.trade.footer.order.margin') }}
      </div>
      <div class="px-3 py-1 text-left w-1/6">
        {{ $t('dashboard.exchange.trade.footer.order.date') }}
      </div>
      <div class="px-3 py-1 text-left w-1/6">
        {{ $t('dashboard.exchange.trade.footer.order.proffit') }}
      </div>
      <div class="px-3 py-1 text-left w-1/6">Action</div>
    </div>
    <div class="flex-1 sm:flex-none h-auto md:h-52 overflow-y-auto">
      <div
        class="flex flex-row items-center mb-2 w-full"
        v-for="order in orders"
        :key="order.id"
      >
        <open-order-table-row
          :order="order"
          @reload-footer="$emit('reload-footer')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OpenOrderTableRow from './OpenOrderTableRow.vue'
export default {
  name: 'OpenOrderTable',
  props: ['orders'],
  components: { OpenOrderTableRow },
  computed: {},
}
</script>

<style></style>
