<template>
  <div
    class="
      overflow-x-hidden overflow-y-auto
      fixed
      inset-0
      z-50
      outline-none
      focus:outline-none
      justify-center
      items-center
      flex
    "
  >
    <div class="relative w-11/12 md:my-6 mx-auto md:max-w-4xl md:w-1/4">
      <!--content-->
      <div
        class="
          border-0
          rounded-lg
          shadow-lg
          relative
          flex flex-col
          w-full
          bg-primary
          outline-none
          focus:outline-none
        "
      >
        <!--header-->
        <div
          class="
            flex
            items-start
            justify-between
            p-5
            border-b border-solid border-blueGray-200
            rounded-t
          "
        >
          <h3 class="text-xl md:text-3xl font-semibold text-white">Login</h3>
          <button
            class="
              p-1
              ml-auto
              bg-transparent
              border-0
              text-black
              float-right
              text-xl
              md:text-3xl
              leading-none
              font-semibold
              outline-none
              focus:outline-none
            "
            @click="closeModal()"
          >
            <span
              class="
                bg-transparent
                text-custom-red
                h-6
                w-6
                text-2xl
                block
                outline-none
                focus:outline-none
              "
            >
              ×
            </span>
          </button>
        </div>
        <!--body-->
        <div class="relative py-6 md:py-12 flex-auto">
          <div
            class="
              bg-primary
              w-full
              md:mx-0
              px-6
              lg:px-16
              xl:px-12
              flex
              items-center
              justify-center
            "
          >
            <div class="w-full h-100">
              <div class="error-server" v-if="error_server">
                Credentials dont match!
              </div>
              <form @submit="onSubmit">
                <div>
                  <label class="block text-gray-200">Email Address</label>
                  <input
                    type="email"
                    v-model="user.identifier"
                    placeholder="Enter Email Address"
                    class="
                      w-full
                      px-4
                      py-3
                      rounded-lg
                      bg-gray-200
                      mt-2
                      border
                      focus:border-blue-500 focus:bg-white focus:outline-none
                    "
                    autofocus
                    autocomplete
                    required
                  />
                </div>

                <div class="mt-4">
                  <label class="block text-gray-200">Password</label>
                  <input
                    type="password"
                    v-model="user.password"
                    placeholder="Enter Password"
                    minlength="6"
                    class="
                      w-full
                      px-4
                      py-3
                      rounded-lg
                      bg-gray-200
                      mt-2
                      border
                      focus:border-blue-500 focus:bg-white focus:outline-none
                    "
                    required
                  />
                </div>

                <button
                  type="submit"
                  class="
                    w-full
                    block
                    bg-custom-red
                    hover:bg-custom-redh
                    focus:bg-custom-redh
                    text-white
                    font-semibold
                    rounded-lg
                    px-4
                    py-3
                    mt-6
                  "
                >
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        identifier: '',
        password: '',
      },
      error_server: false,
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault()
      try {
        await this.$auth.loginWith('local', {
          data: this.user,
        })

        this.$router.push('/forex')
      } catch (err) {
        this.error_server = true
      }
    },
    closeModal() {
      this.$emit('close-login')
    },
  },
}
</script>

<style>
</style>