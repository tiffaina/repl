import { test, expect } from "@playwright/test";

/**
 * test attempting to view without loading first in brief mode
 */
test("view only (without load), brief mode", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: CSV file could not be viewed. Load correct filepath first."
  );
});

/**
 * test attempting to view without loading first in verbose mode
 */
test("mode then view (without load), verbose mode", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText("view");
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: CSV file could not be viewed. Load correct filepath first."
  );
});

/**
 * Nice test where everything goes smoothly, load loads a valid file without headers by default
 */
test("mode, load, and view success, verbose mode", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/filepath1");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/filepath1"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandString2")).toHaveText("view");
  await expect(page.getByLabel("commandMessage2")).toHaveText("View success!");
  /** check that the data table was loaded */
  await expect(page.getByLabel("data2", { exact: true })).toBeVisible();
  await expect(page.getByLabel("data2cell0,0")).toHaveText("1");
  await expect(page.getByLabel("data2cell0,1")).toHaveText("2");
  await expect(page.getByLabel("data2cell0,2")).toHaveText("3");
  await expect(page.getByLabel("data2cell0,3")).toHaveText("4");
  await expect(page.getByLabel("data2cell0,4")).toHaveText("5");
  await expect(page.getByLabel("data2cell1,0")).toHaveText("The");
  await expect(page.getByLabel("data2cell1,1")).toHaveText("song");
  await expect(page.getByLabel("data2cell1,2")).toHaveText("remains");
  await expect(page.getByLabel("data2cell1,3")).toHaveText("the");
  await expect(page.getByLabel("data2cell1,4")).toHaveText("same.");
  await expect(page.getByLabel("data2", { exact: true })).toHaveText(
    "12345Thesongremainsthesame."
  );
});

/**
 * Nice test where everything goes smoothly, load loads a valid file with headers
 */
test("mode, load, and view success, verbose mode, with headers", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/filepath1 true");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/filepath1 true"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandString2")).toHaveText("view");
  await expect(page.getByLabel("commandMessage2")).toHaveText("View success!");
  /** check that the data table was loaded */
  /* Note that it is displayed the same, with or without headers */
  await expect(page.getByRole("table", { name: "data2" })).toBeVisible();
  await expect(page.getByLabel("data2cell0,0")).toHaveText("1");
  await expect(page.getByLabel("data2cell0,1")).toHaveText("2");
  await expect(page.getByLabel("data2cell0,2")).toHaveText("3");
  await expect(page.getByLabel("data2cell0,3")).toHaveText("4");
  await expect(page.getByLabel("data2cell0,4")).toHaveText("5");
  await expect(page.getByLabel("data2cell1,0")).toHaveText("The");
  await expect(page.getByLabel("data2cell1,1")).toHaveText("song");
  await expect(page.getByLabel("data2cell1,2")).toHaveText("remains");
  await expect(page.getByLabel("data2cell1,3")).toHaveText("the");
  await expect(page.getByLabel("data2cell1,4")).toHaveText("same.");
  await expect(page.getByLabel("data2", { exact: true })).toHaveText(
    "12345Thesongremainsthesame."
  );
});

/**
 * try to load an invalid file, then view
 */
test("mode, load invalid file, and view, verbose mode", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file outside-of-data-directory.csv");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file outside-of-data-directory.csv"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: filepath outside-of-data-directory.csv located in an unaccessible directory."
  );

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandString2")).toHaveText("view");
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Error: CSV file could not be viewed. Load correct filepath first."
  );
});

/**
 * try to load a valid file, then an invalid file, then view
 */
test("mode, load valid file, load invalid file and view, verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/filepath1");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/filepath1"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file outside-of-data-directory.csv");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandString2")).toHaveText(
    "load_file outside-of-data-directory.csv"
  );
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Error: filepath outside-of-data-directory.csv located in an unaccessible directory."
  );

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(page.getByLabel("commandString3")).toHaveText("view");
  await expect(page.getByLabel("commandMessage3")).toHaveText(
    "Error: CSV file could not be viewed. Load correct filepath first."
  );
});
