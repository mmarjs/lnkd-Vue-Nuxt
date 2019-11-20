const pkg = require('./package')

module.exports = {
  //debug: true,
  mode: 'universal',
  env: {
    apiUrl: process.env.API_URL || 'http://localhost:1337',
    stripePK: process.env.STRIPE_PK || 'pk_test_t36RV461pPH07yLfHtZeYlJk',

  },
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'LNKD.co',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ],
    script: [
      { src: 'https://wchat.freshchat.com/js/widget.js', defer: true }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { href:"/splashscreens/iphone5_splash.png", media:"(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)", rel:"apple-touch-startup-image" },
      { href:"/splashscreens/iphone6_splash.png", media:"(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)", rel:"apple-touch-startup-image" },
      { href:"/splashscreens/iphoneplus_splash.png", media:"(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)", rel:"apple-touch-startup-image" },
      { href:"/splashscreens/iphonex_splash.png", media:"(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)", rel:"apple-touch-startup-image" },
      { href:"/splashscreens/iphonexr_splash.png", media:"(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)", rel:"apple-touch-startup-image" },
      { href:"/splashscreens/iphonexsmax_splash.png", media:"(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)", rel:"apple-touch-startup-image" },
      { href:"/splashscreens/ipad_splash.png", media:"(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)", rel:"apple-touch-startup-image" },
      { href:"/splashscreens/ipadpro1_splash.png", media:"(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)", rel:"apple-touch-startup-image" },
      { href:"/splashscreens/ipadpro3_splash.png", media:"(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)", rel:"apple-touch-startup-image" },
      { href:"/splashscreens/ipadpro2_splash.png", media:"(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)", rel:"apple-touch-startup-image" },
      { rel: 'preload', as: 'style', onload: "this.onload=null;this.rel='stylesheet'", href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/3.6.95/css/materialdesignicons.min.css' },
    ]
  },
  manifest: {
    theme_color: '#714dd2',
    icons: [{
      src: "/512x512.png",
      sizes: "512x512",
      type: "image/png"
    }]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/upgrade'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    //'nuxt-purgecss',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-validate',
    ['nuxt-buefy', {materialDesignIcons: false}],
    ['@nuxtjs/google-analytics', {
      id: 'UA-137833574-1'
    }],
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  build: {
    //  publicPath: `/${require('./secrets.json').NODE_ENV}/_nuxt/`
    //extractCSS: true,
    extend(config, ctx) {
      
    }
  },
  //srcDir: 'client/',
  performance: {
    gzip: false
  },
  router: {
    base: `/`
  },
  dev: false
}
