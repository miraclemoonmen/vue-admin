const { defineConfig } = require('@vue/cli-service')
const development = process.env.NODE_ENV === 'development'
const cdn = [
  'https://unpkg.com/vue@3.2.13/dist/vue.runtime.global.prod.js',
  'https://unpkg.com/vue-router@4.0.3/dist/vue-router.global.prod.js',
  'https://unpkg.com/vuex@4.0.0/dist/vuex.global.prod.js',
  'https://unpkg.com/element-plus@2.1.10/dist/index.full.min.js',
  'https://cdn.jsdelivr.net/npm/echarts@5.3.1/dist/echarts.min.js',
  'https://cdn.jsdelivr.net/npm/@wangeditor/editor@latest/dist/index.min.js',
  'https://unpkg.com/lottie-web@5.9.1/build/player/lottie.js'
]
module.exports = defineConfig({
  // lintOnSave: true,
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://shibe.online/',
        ws: true,
        changeOrigin: true
        // cookieDomainRewrite
        // '*': 'localhost'
      },
      '/jsonServer': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/jsonServer': '/'
        }
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@use "~@/style/base.scss" as *;'
      }
    }
  },
  configureWebpack: config => {
    if (!development) {
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        'element-plus': 'ElementPlus',
        echarts: 'echarts',
        '@wangeditor/editor': 'wangEditor',
        'lottie-web': 'lottie'
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        if (!development) {
          args[0].cdn = cdn
        }
        args[0].title = 'Admin'
        return args
      })
  }
})
