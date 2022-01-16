<template>
  <div
    class="flex flex-row h-10 w-full relative bg-secondary mb-4 border"
    :class="isbuy ? 'border-greenBorder' : 'border-pinkBorder'"
  >
    <button
      data-action="decrement"
      class="
        bg-primary
        h-full
        w-20
        rounded-l
        cursor-pointer
        outline-none
        focus:outline-none
      "
      @click="decrement"
    >
      <span class="m-auto text-2xl font-thin">−</span>
    </button>
    <input
      type="number"
      class="
        focus:outline-none
        text-center
        w-full
        bg-secondary
        font-semibold
        text-md
        md:text-basecursor-default
        flex
        items-center
        text-white
        outline-none
      "
      name="custom-input-number"
      v-model="nrValue"
      :step="steps"
      min="0"
      :max="maxLot"
    />
    <button
      data-action="increment"
      class="bg-primary h-full w-20 rounded-r cursor-pointer focus:outline-none"
      @click="increment"
    >
      <span class="m-auto text-2xl font-thin">+</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'NumberInput',
  props: ['nrValue', 'isbuy', 'maxLot'],
  data() {
    return {
      steps: 0.01,
    }
  },
  methods: {
    increment() {
      let increase = Number(this.steps) + Number(this.nrValue)
      this.nrValue = parseFloat(increase).toFixed(2)
    },
    decrement() {
      if (this.nrValue === 0) return
      let decrease = Number(this.nrValue) - Number(this.steps)
      this.nrValue = parseFloat(decrease).toFixed(2)
    },
  },
  watch: {
    nrValue: {
      handler: function (val) {
        val = parseFloat(val)

        if (val < 0) {
          this.nrValue = 0
        }
        if (val > this.maxLot) {
          this.nrValue = this.maxLot
        }
        this.$emit('lot-value', val)
      },
      deep: true,
      immediate: true,
    },
    // maxLot: {
    //   handler: function (val) {
    //     console.log('vall', val)
    //     return parseFloat(val).toFixed(2)
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
}
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.custom-number-input input:focus {
  outline: none !important;
}

.custom-number-input button:focus {
  outline: none !important;
}
</style>