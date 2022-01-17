const nextTranslate = require('next-translate')

const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
    nextTranslate,
], {trailingSlash: true,})


