const puppeteer = require('puppeteer')
const Crawler = require('crawler')

const crawledUrls = new Set()

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const crawler = new Crawler({
    rateLimit: 100, // Adjust this value to control the crawling speed
    maxConnections: 10, // Adjust this value to control the number of concurrent requests
    jQuery: true, // Inject jQuery for better DOM traversal
    callback: async function (error, res, done) {
      if (error) {
        console.error(error)
      } else {
        const url = res.options.uri
        crawledUrls.add(url)

        // Wait for the page to fully render
        await page.goto(url, { waitUntil: 'networkidle0' })

        // Extract all links from the rendered page
        const links = await page.$$eval('a', (anchors) =>
          anchors.map((a) => a.href)
        )

        // Queue the extracted links for crawling
        links.forEach((link) => {
          if (!crawledUrls.has(link)) {
            crawler.queue(link)
          }
        })
      }
      done()
    }
  })

  // Start the crawling process
  crawler.queue('https://localhost:3001/canary-checker')
})()
