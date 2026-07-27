// Renders the three flyer HTML files to US Letter PDFs with Playwright.
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const flyers = ['flyer-a', 'flyer-b', 'flyer-c']
const browser = await chromium.launch()
const page = await browser.newPage()

for (const name of flyers) {
  const htmlPath = fileURLToPath(new URL(`../flyers/${name}.html`, import.meta.url))
  const pdfPath = fileURLToPath(new URL(`../flyers/out/${name}.pdf`, import.meta.url))
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' })
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  })
  console.log('Rendered', pdfPath)
}

await browser.close()
