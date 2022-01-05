<template>
  <div
    class="
      w-full
      flex flex-col flex-no-wrap
      sm:bg-primary
      rounded-lg
      overflow-hidden
      sm:shadow-lg
      my-2
    "
  >
    <div
      class="
        text-white
        hidden
        md:flex
        w-100
        justify-start
        items-center
        sticky
        top-0
      "
    >
      <div class="p-3 text-left w-1/6">Order Id</div>
      <div class="p-3 text-left w-1/6">Coin Price</div>
      <div class="p-3 text-left w-1/6">Trade Type</div>
      <div class="p-3 text-left w-1/6">Amount</div>
      <div class="p-3 text-left w-1/6">Date</div>
      <div class="p-3 text-left w-1/6">Proffit</div>
      <div class="p-3 text-left w-1/6">Action</div>
    </div>
    <div class="flex-1 sm:flex-none">
      <div
        class="
          flex flex-row
          items-center
          mb-2
          sm:mb-0
          border
          md:border-none
          w-100
        "
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

<style>
</style>