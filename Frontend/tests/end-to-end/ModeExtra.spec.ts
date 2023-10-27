import { test, expect } from "@playwright/test";

/**
 * This test calls mode once, and makes sure that the call was successful.
 */
test("call mode", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
});

/**
 * This test calls mode three times, and makes sure that after each call, the
 * proper commands / output are visible, for every command in the backlog.
 */
test("call mode, then call mode again, then call mode again!", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  // Set into brief mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  // Make sure that we can't see any of the commands while we're in brief
  await expect(page.getByLabel("commandString0")).toBeHidden();
  await expect(page.getByLabel("commandString1")).toBeHidden();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Mode success!");
  // Set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  // Make sure that we can see all of the commands now that we're in verbose
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandString1")).toHaveText("mode");
  await expect(page.getByLabel("commandString2")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage2")).toHaveText("Mode success!");
});

/**
 * This test calls an unrecognized command, then calls mode, then calls an
 * unrecognized command, so this test makes sure that the proper commands / outputs
 * are visible at the proper times.
 */
test("gibberish command, call mode, then another gibberish command", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Gibberish command
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("hello");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  // Make sure that the commandString is hidden while in brief mode
  await expect(page.getByLabel("commandString0")).toBeHidden();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: Please provide a valid command. Valid commands: mode, load_file <csv-file-path>, view, or search <column> <value>"
  );
  // Set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage1")).toHaveText("Mode success!");
  // Another gibberish command, this time verbose!
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("hello again");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandString2")).toHaveText("hello again");
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Error: Please provide a valid command. Valid commands: mode, load_file <csv-file-path>, view, or search <column> <value>"
  );
  // Also check that we can now see commandString0!
  await expect(page.getByLabel("commandString0")).toHaveText("hello");
});
