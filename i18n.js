module.exports = {
  locales: ['ar','fr'],
  defaultLocale: 'ar',
  localeDetection: false,
  realDefaultLocale: 'ar',
  loader: false, // This deactivate the webpack loader that loads the namespaces
  pages: {
    '*': ['common','footer'],
    '/404': ['error'],
    '/': ['home','topBarLinks','footer'],
    '/dashboard': ['home'],
    'rgx:^/more-examples': ['more-examples'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./locales/${locale}/${namespace}`).then((m) => m.default),
}
