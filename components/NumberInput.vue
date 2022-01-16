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
      v-model="newVal"
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
      newVal: 0,
    }
  },
  methods: {
    increment() {
      let increase = Number(this.steps) + Number(this.newVal)
      this.newVal = parseFloat(increase).toFixed(2)
    },
    decrement() {
      if (this.newVal === 0) return
      let decrease = Number(this.newVal) - Number(this.steps)
      this.newVal = parseFloat(decrease).toFixed(2)
    },
  },
  watch: {
    nrValue: {
      handler: function (val) {
        val = parseFloat(val)
        this.newVal = val
      },
      deep: true,
      immediate: true,
    },
    newVal: {
      handler: function (val) {
        val = parseFloat(val)

        if (val < 0) {
          this.newVal = 0
        }
        if (val > this.maxLot) {
          this.newVal = this.maxLot
        }
        this.newVal = val
        this.$emit('lot-value', this.newVal)
      },
      deep: true,
      immediate: true,
    },
    maxLot: {
      handler: function (val) {
        console.log('vall', val)
        this.maxLot = val
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
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