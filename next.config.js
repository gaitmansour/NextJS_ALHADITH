const nextTranslate = require('next-translate')

/*module.exports = nextTranslate()
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
    cssLoaderOptions: {
        url: false
    }
});*/
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
    nextTranslate
], {trailingSlash: true,})
