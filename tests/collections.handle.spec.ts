import { test, expect } from "@playwright/test";
import { BASE_URL, COLLECTION_HANDLE } from "./constants";

test.describe("Collection Handle Page", () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to a specific collection page before each test
        await page.goto(`${BASE_URL}/collections/${COLLECTION_HANDLE}`);
    });

    test("should display the collection title and breadcrumb navigation", async ({ page }) => {
        // Check that the breadcrumb navigation is visible
        await expect(page.getByRole("link", { name: "Collections" })).toBeVisible();

        // Check that the collection title is visible and not empty
        const collectionTitle = page.locator(".collection-title");
        await expect(collectionTitle).toBeVisible();
        await expect(collectionTitle).not.toBeEmpty();
    });

    test("should navigate back to the collections page when 'Collections' is clicked", async ({ page }) => {
        // Click the "Collections" link in the breadcrumb navigation
        const collectionsLink = page.getByRole("link", { name: "Collections" });
        await collectionsLink.click();

        // Verify that the URL is correct
        await expect(page).toHaveURL(`${BASE_URL}/collections`);
    });

    test("should display products within the collection", async ({ page }) => {
        // Check that the products grid is visible
        const productsGrid = page.locator(".products-grid");
        await expect(productsGrid).toBeVisible();

        // Verify that at least one product is displayed
        const productCards = productsGrid.locator(".product-card");
        const productCount = await productCards.count();
        expect(productCount).toBeGreaterThan(0);

        // Check that the first product card is visible and contains valid content
        const firstProduct = productCards.first();
        await expect(firstProduct.locator("h4")).toBeVisible();  // Assuming product title is in an h4
    });

    test("should paginate products correctly", async ({ page }) => {

        // Navigate to the first page and capture product titles
        const initialProductsGrid = page.locator(".products-grid");
        const initialProductTitles = await initialProductsGrid.locator(".product-card h4").allTextContents();

        // Navigate to next page
        const nextPageLink = page.locator("a:has-text('Next Page →')");
        await expect(nextPageLink).toBeVisible();
        await nextPageLink.click();

        // Ensure the page URL has changed
        await expect(page).toHaveURL(/.*\?.*cursor=.*/);

        // Re-locate the products grid and capture product titles on the next page
        const newProductsGrid = page.locator(".products-grid");
        const newProductTitles = await newProductsGrid.locator(".product-card h4").allTextContents();
        const newProductCount = newProductTitles.length;
        expect(newProductCount).toBeGreaterThan(0);

        // Ensure that the product titles have changed between pages
        expect(newProductTitles).not.toEqual(initialProductTitles);

        // Navigate to previous page
        const previousPageLink = page.locator("a:has-text('← Previous Page')");
        await expect(previousPageLink).toBeVisible();
        await previousPageLink.click();

        // Ensure the page URL has changed to reflect the previous page
        await expect(page).toHaveURL(/.*\?.*direction=previous.*/);

        // Re-locate the products grid and capture product titles on the previous page
        const prevProductsGrid = page.locator(".products-grid");
        const prevProductTitles = await prevProductsGrid.locator(".product-card h4").allTextContents();
        const prevProductCount = prevProductTitles.length;
        expect(prevProductCount).toBeGreaterThan(0);

        // Ensure that the product titles on the previous page match the initial titles
        expect(prevProductTitles).toEqual(initialProductTitles);
    });

});
