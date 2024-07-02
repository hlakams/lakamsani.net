const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx'
})

next_config = {
  output: 'export',
  swcMinify: true,
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
    // unoptimized: true,
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

export const runtime="edge"
module.exports = withNextra(next_config)