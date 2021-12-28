<template>
  <div class="flex justify-center align-middle items-center h-screen">
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
                      text-primary
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
                      text-primary
                      border
                      focus:border-blue-500 focus:bg-white focus:outline-none
                    "
                    required
                  />
                </div>

                <div class="text-right mt-2">
                  <a
                    href="#"
                    class="
                      text-sm
                      font-semibold
                      text-gray-200
                      hover:text-custom-red
                      focus:text-custom-red
                    "
                    >Forgot Password?</a
                  >
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
  layout: 'login',
  middleware: 'auth',
  auth: 'guest',
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

        this.$router.push('/casino')
      } catch (err) {
        this.error_server = true
      }
    },
  },
}
</script>

<style>
</style>