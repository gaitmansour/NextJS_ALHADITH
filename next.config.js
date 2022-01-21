const nextTranslate = require('next-translate')

/*module.exports = nextTranslate()
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
    cssLoaderOptions: {
        url: false
    }
});*/
const eslint={
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
};
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
    nextTranslate,
], {trailingSlash: true,})
module.exports = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    experimental: {
    outputStandalone: true,
  },
}
