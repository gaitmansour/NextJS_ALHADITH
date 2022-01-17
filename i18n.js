module.exports = {
  locales: ['ar','fr'],
  defaultLocale: 'ar',
  localeDetection: false,
  realDefaultLocale: 'ar',
  loader: false, // This deactivate the webpack loader that loads the namespaces
  pages: {
    '*': ['common','footer','topBarLinks','OurPartners','CommanderieCroyants','ressource','PrayTimes','OurPartners','Videos'],
    '/404': ['error','footer','topBarLinks','CommanderieCroyants','ressource','PrayTimes','OurPartners','Videos'],
    '/': ['home','topBarLinks','footer','CommanderieCroyants','ressource','PrayTimes','OurPartners','Videos'],
    '/search': ['topBarLinks','footer','CommanderieCroyants','ressource','PrayTimes','OurPartners','Videos'],
    '/dashboard': ['home','footer','CommanderieCroyants','ressource','topBarLinks','PrayTimes','Videos'],
    'rgx:^/more-examples': ['more-examples','footer','topBarLinks','CommanderieCroyants'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./locales/${locale}/${namespace}`).then((m) => m.default),
}
