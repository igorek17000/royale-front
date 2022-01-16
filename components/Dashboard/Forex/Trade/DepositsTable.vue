<template>
  <table class="table-fixed w-full my-2 p-2">
    <thead>
      <tr class="text-left text-base pb-4">
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody class="">
      <tr v-for="deposit in deposits" :key="deposit.id">
        <td class="text-money text-base">+{{ deposit.amount }}</td>
        <td>{{ formatTime(deposit.created_at) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'DepositsTable',
  props: ['deposits'],
  methods: {
    formatTime(val) {
      return this.$dayjs(val).format('DD/MM/YYYY - HH:mm')
    },
  },
}
</script>

<style>
</style>