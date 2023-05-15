const withNextra = require('nextra')('nextra-theme-blog', './theme.config.js')
module.exports = withNextra({
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'i.ibb.co',
            port: '',
        },
        {
            protocol: 'https',
            hostname: 'gravatar.com',
            port: '',
        },
        ],
    },
})
