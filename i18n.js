module.exports = {
  locales: ['ar','fr'],
  defaultLocale: 'ar',
  localeDetection: false,
  realDefaultLocale: 'ar',
  loader: false, // This deactivate the webpack loader that loads the namespaces
  pages: {
    '*': ['common','footer'],
    '/404': ['error','footer'],
    '/': ['home','topBarLinks','footer','CommanderieCroyants','ressource'],
    '/dashboard': ['home','footer','CommanderieCroyants','ressource'],
    'rgx:^/more-examples': ['more-examples','footer'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./locales/${locale}/${namespace}`).then((m) => m.default),
}
