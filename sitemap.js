const Prismic = require('prismic-javascript')
const fs = require('fs')
const { createSitemap } = require('sitemap')

console.log('building sitemap...')

async function getContextUids() {
  const api = await Prismic.api('https://thisstaging.prismic.io/api/v2')
  const contextUids = await api
    .getByUID('context', 'home')
    .then(doc => doc)
    .then(res => res.data.case_study_list.map(cs => cs.case_study_item.uid))
  return contextUids
}

async function buildSitemap() {
  const UIDS = await getContextUids()
  const sitemap = createSitemap({
    hostname: 'https://this.design',
    urls: [
      { url: '/' },
      { url: '/work' },
      { url: '/about' },
      ...UIDS.map(uid => ({ url: `/${uid}` })),
    ],
  })
  const xml = sitemap.toXML()
  fs.writeFileSync('public/sitemap.xml', xml)
  console.log('sitemap built...')
}

buildSitemap()
