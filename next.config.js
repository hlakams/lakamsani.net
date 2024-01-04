// const withNextra = require('nextra')
nextra_reqs = require('nextra')({
    theme:'nextra-theme-blog',
    themeConfig:'./theme.config.js',
    latex:true
})

next_config = {
  images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: 'i.ibb.co',
      },
      {
          protocol: 'https',
          hostname: 'www.gravatar.com' 
      }
    ]
  },
}

module.exports = nextra_reqs(next_config)