const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withPlugins = require('next-compose-plugins')

const cssConfig = {
  importLoaders: 1,
  localIdentName: '[local]___[hash:base64:5]',
  javascriptEnabled: true
}

const plugins = [
  [withLess, { lessLoaderOptions: cssConfig }],
  [withCSS, { cssLoaderOptions: cssConfig }]
]

module.exports = withPlugins(plugins, {
  webpack: (config, { dev }) => {
    /** things * */
    if (dev) {
      // eslint-disable-next-line no-param-reassign
      config.devtool = 'cheap-module-source-map'
    }
    return config
  }
})
