import { test, expect } from "@playwright/test";
import { BASE_URL, PRODUCT_HANDLE } from "./constants";

test.describe("Product Handle Page", () => {
    test("should display product details correctly", async ({ page }) => {
        // Navigate to the product page
        await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`); // Replace with an actual product handle

        // Verify that the "Products" link is visible
        const productsLink = page.locator("a:has-text('Products')");
        await expect(productsLink).toBeVisible();
        await expect(productsLink).toHaveAttribute("href", "/collections");

        // Verify that the product title is displayed correctly
        const productTitle = page.locator(".products-grid h1");
        await expect(productTitle).toBeVisible();
        const productTitleText = await productTitle.textContent();
        expect(productTitleText?.trim().length).toBeGreaterThan(0);

        // Verify that the product price is displayed correctly
        const productPrice = page.locator(".products-grid .product-price");
        await expect(productPrice).toBeVisible();
        const productPriceText = await productPrice.textContent();
        expect(productPriceText?.trim().length).toBeGreaterThan(0);

        // Verify that the product image is visible
        const productImage = page.locator(".products-grid img");
        await expect(productImage).toBeVisible();

        // Validate the presence of a comparison price if it exists
        const compareAtPrice = page.locator(".products-grid .compare-at-price");
        if ((await compareAtPrice.count()) > 0) {
            const compareAtPriceText = await compareAtPrice.textContent();
            expect(compareAtPriceText?.trim().length).toBeGreaterThan(0);
        }
    });
});
