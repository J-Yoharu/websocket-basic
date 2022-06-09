const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // css: {
  //   extract: {
  //     ignoreOrder: true
  //   },
  //   loaderOptions: {
  //     sass: {
  //       additionalData: '@import "~/src/scss/variables.scss"',
  //     },
  //     scss: {
  //       additionalData: '@import "~/src/scss/variables.scss"'
  //     }
  //   }
  // },
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
