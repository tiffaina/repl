
import { test, expect } from "@playwright/test";

test("broadband command call", async ({page,}) => {
    await page.goto("http://localhost:8000");
    
    const mockInput = "broadband California Monterey";
    await page.getByLabel("Command input").fill(mockInput);
    await page.locator("button").click();
    await page.waitForTimeout(5000);
  
    await page.waitForSelector(".repl-history");

    // Make sure error is thrown 
    await expect(page.locator(".repl-history")).toContainText("Broadband success!");
    await expect(page.locator(".repl-history")).toContainText("93.1");

  });

  test("broadband bad call", async ({page,}) => {
    await page.goto("http://localhost:8000");
    
    const mockInput = "broadband bad bad";
    await page.getByLabel("Command input").fill(mockInput);
    await page.locator("button").click();
    await page.waitForTimeout(5000);
  
    await page.waitForSelector(".repl-history");

    // Make sure error is thrown 
    await expect(page.locator(".repl-history")).toContainText("API Request did not go through");

  });