
const nextTranslate = require('next-translate')

const eslint={
    ignoreDuringBuilds: true,
};

const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
    nextTranslate,
], {trailingSlash: true,})

module.exports = {
  experimental: {
    outputStandalone: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
}
