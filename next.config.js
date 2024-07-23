const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx'
})

next_config = {
  // faster (experimental) minifier!
  swcMinify: true
}

module.exports = withNextra(next_config)