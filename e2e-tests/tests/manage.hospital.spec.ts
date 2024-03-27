import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[name=email]").fill("2@2.com");
    await page.locator("[name=password]").fill("password123");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Sign in Successful!")).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
});

test("should allow user to add hospital", async ({ page }) => {
    await page.goto(`${UI_URL}add-hospital`);
    
    await page.locator('[name= "name"]').fill("Test Hospital");
    await page.locator('[name= "city"]').fill("Test City");
    await page.locator('[name= "country"]').fill("Test Country");
    await page.locator('[name= "description"]').fill("This is a description for the test hotel");
    await page.locator('[name= "pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");
    await page.getByText("Specialty Hospital").click();
    await page.getByLabel("Operating Rooms").check();
    await page.getByLabel("Cafeteria").check();
    await page.locator('[name="adultCount"]').fill("1");
    await page.locator('[name="childCount"]').fill("2");
    await page.setInputFiles('[name = "imageFiles"]', [
        path.join(__dirname, "files", "hos3.jpeg"),
        path.join(__dirname, "files", "hos4.jpeg"),
    ])

    await page.getByRole('button', { name: "Save" }).click();
    await expect(page.getByText("Hospital Saved")).toBeVisible();

});