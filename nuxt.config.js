export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ace Trading Platform | All-in-One Trade Platform',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/custom.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/trading-vue.client.js', mode: 'client' },
    { src: '~/plugins/vue-numeric.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dayjs',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'it',
            name: 'It',
            file: 'it.json',
          },
          // {
          //   code: 'sq',
          //   name: 'Sq',
          //   file: 'sq.json',
          // },
          {
            code: 'en',
            name: 'En',
            file: 'en.json',
          },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'en',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          alwaysRedirect: true,
          fallbackLocale: 'en',
        },
        vuex: {
          moduleName: 'i18n',
          syncLocale: true,
          syncMessages: true,
          syncRouteParams: true,
        },
        strategy: 'no_prefix',
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'https://api.acetrader.co.uk',
    baseURL: 'http://localhost:1337',
  },
  dayjs: {
    defaultLocale: 'en',
    plugins: [
      // 'relativeTime', // import 'dayjs/plugin/relativeTime'
    ],
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Ace Trader',
      short_name: 'Ace',
      description: 'Real-time Trading and Exchange Platform',
      lang: 'en',
    },
  },
  googleFonts: {
    families: {
      Inter: true,
    },
  },
  tailwindcss: {
    jit: true,
  },
  loading: {
    color: '#D91139',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'jwt',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: '',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/auth/local', method: 'post' },
          logout: false,
          user: { url: '/users/me', method: 'get' },
        },
        redirect: {
          login: '/',
          logout: '/logout',
          callback: '/',
          home: '/casino',
        },
        watchLoggedIn: true,
      },
    },
  },
  publicRuntimeConfig: {
    // baseURL: 'https://api.acetrader.co.uk',
    baseURL: 'http://localhost:1337',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
