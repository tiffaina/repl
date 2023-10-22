import { test, expect } from "@playwright/test";

/**
 * This test asserts that the title of the page is visible and correct.
 */
test("on page load, the title is mock", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("title")).toBeVisible();
  await expect(page.getByLabel("title")).toHaveText("Mock");
});

/**
 * This test asserts that there is an input bar, which begins empty.
 */
test("on page load, i see an input bar", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Command input")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeEmpty();
});

/**
 * This test asserts that there is a legend for the input bar, with proper info.
 */
test("on page load, i see an legend for the input bar", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("legend")).toBeVisible();
  await expect(page.getByLabel("legend")).toHaveText(
    "Enter a command: mode, load_file <csv-file-path>, view, or search <column> <value>"
  );
});

/**
 * This test asserts that the when the user puts text into the text box,
 * the new text in the box represents the user's input.
 */
test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

/**
 * This test asserts that the submit button is visible and properly labelled.
 */
test("on page load, i see a button", async ({ page }) => {
  // Button is visible
  await page.goto("http://localhost:8000/");
  await expect(page.getByRole("button")).toBeVisible();
  await expect(page.getByRole("button")).toHaveText("Submitted 0 times");
});

/**
 * This test asserts that when the user presses the submit button, its
 * label increments by one.
 */
test("after I click the button, its label increments", async ({ page }) => {
  // Button counter functionality!
  await page.goto("http://localhost:8000/");
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(
    page.getByRole("button", { name: "Submitted 4 times" })
  ).toBeVisible();
});

/**
 * This test asserts that after the submit button is pressed, there is a
 * command message visible in the repl history window.
 */
test("after I click the button, my command gets pushed", async ({ page }) => {
  // Enter an un-recognized command
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByLabel("commandMessage0").isVisible();
});

/**
 * This test asserts that after two commands are sent via the submit button,
 * that both command messages are visible in the repl hsitory window.
 */
test("after I push a second command, I can still see my first command's output too", async ({
  page,
}) => {
  // Enter an un-recognized command
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByLabel("commandMessage0").isVisible();
  // Another command
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Another awesome command");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  // Make sure that both commands' outputs are visible
  await page.getByLabel("commandMessage0").isVisible();
  await page.getByLabel("commandMessage1").isVisible();
});
