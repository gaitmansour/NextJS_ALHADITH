import { SitemapStream, streamToPromise } from 'sitemap'
import { getMenu } from '../../endpoints'
import FetchAPI from '../../API'
import { getMenuLink, handleMenu } from '../../helpers'
import axios from 'axios'

export default async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    })

    // List of posts

    const url = getMenu()
    const getData = await axios.get(url)
    const gropData = handleMenu(getData.data)
    const mapData = gropData.map((item) =>
      item?.label === 'البرامج الإعلامية' || item?.label === 'التلفزة الرقمية'
        ? null
        : item.items
    )
    const test = [
      { title: 'الدروس-الحديثية', subDomain: 'media' },
      { title: 'الدروس-الحسنية', subDomain: 'media' },
      { title: 'برامج-تلفزية', subDomain: 'media' },
      { title: 'برامج-اذاعية', subDomain: 'media' },
      { title: 'برامج-على-الشبكات-الاجتماعية', subDomain: 'media' },
      { title: 'الدروس-التمهيدية', subDomain: 'media' },
      { title: 'الدروس-البيانية', subDomain: 'media' },
      { title: 'AllMedia', subDomain: '' },
      { title: '', subDomain: '' },
    ]
    const articles = [].concat.apply([], mapData)
    const t = [...test, ...articles]
    // console.log('req.headers.host =====', t)

    // Create each URL row
    /* Looping through the articles array and creating a new variable called test. */
    if (articles.length > 0) {
      t?.map((article) =>
        smStream.write({
          url: article?.subDomain
            ? `/${article.subDomain}/${article?.title}`
            : `/article/${article?.title?.split(' ').join('-') || ''}`,
          changefreq: 'daily',
          priority: 0.9,
        })
      )
    }

    // End sitemap stream
    smStream.end()

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString()

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml',
    })

    // Display output to user
    res.end(sitemapOutput)
  } catch (e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }
}
