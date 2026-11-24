import { expect, Page, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Seed Math.random so the eye colours are the same on every run
  await page.addInitScript(() => {
    let seed = 1
    Math.random = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }
  })
})

const settle = async (page: Page) => {
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
  // react-spring animations run in JS, which animations: 'disabled' can't freeze
  await page.waitForTimeout(1500)
}

test('home', async ({ page }) => {
  await page.goto('/')
  await settle(page)
  await expect(page).toHaveScreenshot('home.png')
})

test('menu open', async ({ page }) => {
  await page.goto('/')
  await settle(page)
  await page.getByRole('button', { name: 'Menu' }).click()
  await settle(page)
  await expect(page).toHaveScreenshot('menu.png')
})

test('project page', async ({ page }) => {
  await page.goto('/projects/alexa-lamp')
  await settle(page)
  await expect(page).toHaveScreenshot('project.png')
})

test('not found', async ({ page }) => {
  // Wandering eyes never hold still, so capture the reduced-motion version
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/this-page-does-not-exist')
  await settle(page)
  await expect(page).toHaveScreenshot('not-found.png')
})

// Blocking project images keeps the gallery spinner and tile skeletons on screen
const blockImages = (page: Page) =>
  page.route('https://firebasestorage.googleapis.com/**', route => route.abort())

test('project loading', async ({ page }) => {
  await blockImages(page)
  await page.goto('/projects/alexa-lamp')
  await settle(page)
  await expect(page).toHaveScreenshot('project-loading.png')
})

test('menu loading', async ({ page }) => {
  await blockImages(page)
  await page.goto('/')
  await settle(page)
  await page.getByRole('button', { name: 'Menu' }).click()
  await settle(page)
  await expect(page).toHaveScreenshot('menu-loading.png')
})
