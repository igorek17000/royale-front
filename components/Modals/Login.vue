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

              <hr class="my-6 border-gray-300 w-full" />

              <button
                type="button"
                class="
                  w-full
                  block
                  bg-white
                  hover:bg-gray-100
                  focus:bg-gray-100
                  text-gray-900
                  font-semibold
                  rounded-lg
                  px-4
                  py-3
                  border border-gray-300
                "
              >
                <div class="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    class="w-6 h-6"
                    viewBox="0 0 48 48"
                  >
                    <defs>
                      <path
                        id="a"
                        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                      />
                    </defs>
                    <clipPath id="b">
                      <use xlink:href="#a" overflow="visible" />
                    </clipPath>
                    <path
                      clip-path="url(#b)"
                      fill="#FBBC05"
                      d="M0 37V11l17 13z"
                    />
                    <path
                      clip-path="url(#b)"
                      fill="#EA4335"
                      d="M0 11l17 13 7-6.1L48 14V0H0z"
                    />
                    <path
                      clip-path="url(#b)"
                      fill="#34A853"
                      d="M0 37l30-23 7.9 1L48 0v48H0z"
                    />
                    <path
                      clip-path="url(#b)"
                      fill="#4285F4"
                      d="M48 48L17 24l-4-3 35-10z"
                    />
                  </svg>
                  <span class="ml-4"> Log in with Google</span>
                </div>
              </button>
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