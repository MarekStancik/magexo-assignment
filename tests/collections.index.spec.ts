import { test, expect } from "@playwright/test";
import { BASE_URL } from "./constants";

test.describe("Collections Index Page", () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the collections page before each test
    await page.goto(`${BASE_URL}/collections`);
  });

  test("should display collections with titles and products", async ({ page }) => {
    // Check that the Collections title is visible
    await expect(page.locator("h1")).toHaveText("Collections");

    // Check that at least one collection is displayed
    const collections = page.locator("section");
    const collectionCount = await collections.count();
    expect(collectionCount).toBeGreaterThan(0);

    // Check that the first collection has a title and at least one product
    const firstCollection = collections.first();
    await expect(firstCollection.locator("h2")).toBeVisible();

    // Check that the products grid within the first collection is visible
    const productsGrid = firstCollection.locator(".products-grid");
    await expect(productsGrid).toBeVisible();

    // Check that there is at least one product in the grid
    const productCards = productsGrid.locator(".product-card");
    const productCount = await productCards.count();
    expect(productCount).toBeGreaterThan(0);
  });

  test("should navigate to the correct collection page when 'More' is clicked", async ({ page }) => {
    // Click the "More" link of the first collection
    const moreLink = page.getByRole("link", { name: "More →" }).first();

    await expect(moreLink).toBeVisible();
    const expectedHref = await moreLink.getAttribute("href");

    await moreLink.click();

    // Verify that the URL is correct and corresponds to the expected collection handle
    await expect(page).toHaveURL(`${BASE_URL}${expectedHref}`);
  });

  test("should correctly display product cards within each collection", async ({ page }) => {
    const collections = page.locator("section");

    // Iterate over each collection and check the product cards
    const collectionCount = await collections.count();
    expect(collectionCount).toBeGreaterThan(0);  // Ensure there"s at least one collection

    for (let i = 0; i < collectionCount; i++) {
      const collection = collections.nth(i);
      const products = collection.locator(".product-card");

      // Verify that each collection has at least one product card
      const productCount = await products.count();
      expect(productCount).toBeGreaterThan(0);

      // Verify that each product card has a title
      await expect(products.first().locator("h4")).toBeVisible();
    }
  });

});
