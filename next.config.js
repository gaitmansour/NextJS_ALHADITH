const nextTranslate = require('next-translate')

const eslint = {
  ignoreDuringBuilds: true,
}

const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([nextTranslate], { trailingSlash: true })

module.exports = {
  pageExtentions: ['js'],
  i18n: {
    locales: ['ar', 'fr'],
    defaultLocale: 'ar',
  },
  images: {
    domains: ['backend.hadithm6.com'],
  },
  path: '/_next/image',
  loader: 'default',
  experimental: {
    outputStandalone: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
