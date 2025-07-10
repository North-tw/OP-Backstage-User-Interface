const { DefinePlugin } = require('webpack')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  devServer: {
    https: false,
    port: 80,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://north-op-dev.theiehicppgcs.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '/api' }
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  css: {
    // to use variable global
    loaderOptions: {
      sass: {
        additionalData:
          `@import "~@/assets/styles/variables";
          @import "~bootstrap/scss/functions";
          @import "~bootstrap/scss/variables";
          @import "~bootstrap/scss/mixins";
          @import "~bootstrap/scss/maps";
          @import "~bootstrap/scss/root";
          `,
        sassOptions: {
          quietDeps: true
        }            
      }    
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        swiper: path.resolve(__dirname, 'node_modules/swiper')
      }
    },
    plugins: [
      new DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
      })
    ]
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'OP Backstage'
        return args
      })

    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        disable: process.env.NODE_ENV !== 'production',
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false }
      })
      .end()

    // 移除預設的svg處理規則
    config.module
      .rule('svg')
      .exclude
      .add(resolve('src/assets/icons'))
      .end()

    // 移除預設的圖片處理規則
    config.module
      .rule('images')
      .exclude
      .add(resolve('src/assets/icons'))
      .end()

    // 新增一個svg處理規則
    config.module
      .rule('svg-sprite-loader') // 新增的處理規則
      .test(/\.svg$/)
      .include // 加入
      .add(resolve('src/assets/icons')) // path
      .end()
      .use('svg-sprite-loader') // 使用svg-sprite-loader
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
