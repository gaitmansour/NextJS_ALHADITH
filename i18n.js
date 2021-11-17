module.exports = {
  locales: ['ar','fr'],
  defaultLocale: 'ar',
  localeDetection: false,
  realDefaultLocale: 'ar',
  loader: false, // This deactivate the webpack loader that loads the namespaces
  pages: {
    '*': ['common','footer','topBarLinks'],
    '/404': ['error','footer','topBarLinks'],
    '/': ['home','topBarLinks','footer','CommanderieCroyants','ressource'],
    '/search': ['topBarLinks','footer'],
    '/dashboard': ['home','footer','CommanderieCroyants','ressource','topBarLinks'],
    'rgx:^/more-examples': ['more-examples','footer','topBarLinks'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./locales/${locale}/${namespace}`).then((m) => m.default),
}
