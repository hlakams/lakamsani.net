const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx'
})

next_config = {
  webpack: (config) => {
    // need topLevelAwait for middleware + layers for manipulating calls
    config.experiments = {
      topLevelAwait: true,
      layers: true
    };
    return config;
  },
  // allow CORS for photo embeds
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
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

module.exports = withNextra(next_config)