// // import getRoutes from '@/router/index'
// const getRoutes = require('./router/index')

// export default {
//   router: {
//     extendRoutes: (routes, resolve) => {
//       // 清空Nuxt.js自动生成的路由
//       routes.splice(0);
//       // 重新将自定义路由配置设置进去
//       routes.push(...getRoutes(resolve));
//     }
//   },
// }



module.exports = {
  /*
  ** Headers of the page
  */

  plugins: [
    { src: '~/plugins/nuxt-swiper-plugin.js', ssr: false }
  ],
  css: [
    'swiper/dist/css/swiper.css'
  ],

  head: {
    title: '卷心菜在线学习平台 - 哈尔滨师范大学计算机科学与信息工程学院线上教育平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '卷心菜,哈尔滨师范大学,线上学习,SimRobot' },
      { hid: 'description', name: 'description', content: '卷心菜线上学习平台是哈尔滨师范大学SimRobot实验室开发的计算机科学与信息工程学院使用的线上学习平台' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/bitbug_favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/chapter/:id',
        name: 'chapter',
        component: resolve(__dirname, 'components/addChapter.vue')
      }),
      routes.push({
        path: '/notice',
        name: 'notice',
        component: resolve(__dirname, 'pages/notice.vue')
      });
    }
  },



}

